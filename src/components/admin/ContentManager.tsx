import { useState, useEffect, useCallback } from 'react';
import { useSupabase } from './SupabaseContext';
import { z } from 'zod';
import { 
  CloudArrowUpIcon,
  DocumentIcon,
  TrashIcon,
  PhotoIcon,
  EyeIcon,
  ExclamationTriangleIcon,
  FolderIcon,
  PencilIcon,
  XMarkIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { showSuccess, showError, showLoading, dismissToast } from '../../lib/notifications';
import { captureError } from '../../lib/sentry';

// Validation Schemas
const insightSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters'),
  description: z.string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 1000 characters'),
  display_order: z.number()
    .int('Display order must be a whole number')
    .min(0, 'Display order must be positive'),
  is_active: z.boolean(),
});

const fileUploadSchema = z.object({
  name: z.string().min(1, 'Filename is required'),
  size: z.number()
    .max(10 * 1024 * 1024, 'File must be smaller than 10MB'),
  type: z.string().refine(
    (type) => [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
      'text/csv',
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif'
    ].includes(type),
    'Invalid file type'
  )
});

// Utility Functions
const sanitizeFileName = (fileName: string): string => {
  return fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/\.+/g, '.')
    .replace(/^\.+|\.+$/g, '')
    .substring(0, 100);
};

const sanitizeText = (text: string): string => {
  return text
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, ''); // Remove iframes
};

const validateFile = async (file: File): Promise<string | null> => {
  try {
    // Basic validation
    fileUploadSchema.parse({
      name: file.name,
      size: file.size,
      type: file.type
    });

    return null; // No errors
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0].message;
    }
    return 'File validation failed';
  }
};

const validateAndSanitizeInsight = (data: unknown) => {
  const parsed = insightSchema.parse(data);
  return {
    ...parsed,
    title: sanitizeText(parsed.title),
    description: sanitizeText(parsed.description)
  };
};

interface DocumentFile {
  name: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
  last_accessed_at?: string;
  metadata?: {
    eTag?: string;
    size?: number;
    mimetype?: string;
    cacheControl?: string;
    lastModified?: string;
    contentLength?: number;
    httpStatusCode?: number;
  };
}

interface Insight {
  id: string;
  title: string;
  description: string;
  image_url: string;
  document_filename: string;
  document_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface DocumentWithInsight extends DocumentFile {
  insight?: Insight;
  status: 'available' | 'used_in_insight';
}

interface InsightFormData {
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
}

interface ValidationError {
  field: string;
  message: string;
}

const ContentManager = () => {
  const { supabase } = useSupabase();
  const [documents, setDocuments] = useState<DocumentWithInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingInsight, setEditingInsight] = useState<Insight | null>(null);
  const [creatingFromDoc, setCreatingFromDoc] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [formData, setFormData] = useState<InsightFormData>({
    title: '',
    description: '',
    display_order: 0,
    is_active: true
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const loadDocumentsAndInsights = useCallback(async () => {
    try {
      setLoading(true);
      
      // Load documents from storage
      const { data: docsData, error: docsError } = await supabase.storage
        .from('site-documents')
        .list('');

      if (docsError) throw docsError;

      // Load insights
      const { data: insightsData, error: insightsError } = await supabase
        .from('insights')
        .select('*');

      if (insightsError) throw insightsError;

      // Filter out .emptyFolderPlaceholder and combine with insights
      const filteredDocs = (docsData || []).filter((file: DocumentFile) => 
        file.name !== '.emptyFolderPlaceholder'
      );

      const documentsWithInsights: DocumentWithInsight[] = filteredDocs.map((doc: DocumentFile) => {
        const insight = (insightsData || []).find((ins: Insight) => ins.document_filename === doc.name);
        return {
          ...doc,
          insight,
          status: insight ? 'used_in_insight' : 'available'
        };
      });

      setDocuments(documentsWithInsights);
    } catch (err) {
      const error = err as Error;
      showError('Failed to load content: ' + error.message);
      captureError(error, { context: 'ContentManager.loadDocumentsAndInsights' });
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    loadDocumentsAndInsights();
  }, [loadDocumentsAndInsights]);

  const uploadFile = async (file: File) => {
    let loadingToast: string | undefined;

    try {
      setUploading(true);

      // Validate file
      const validationError = await validateFile(file);
      if (validationError) {
        throw new Error(validationError);
      }

      loadingToast = showLoading('Uploading file...');

      // Sanitize filename
      const fileExt = file.name.split('.').pop();
      const baseName = file.name.replace(`.${fileExt}`, '');
      const sanitizedBaseName = sanitizeFileName(baseName);
      const fileName = `${Date.now()}-${sanitizedBaseName}.${fileExt}`;

      const { error } = await supabase.storage
        .from('site-documents')
        .upload(fileName, file);

      if (error) throw error;

      if (loadingToast) dismissToast(loadingToast);
      showSuccess('Document uploaded successfully! You can now create an insight from it.');
      
      // Reload documents
      await loadDocumentsAndInsights();
    } catch (err) {
      if (loadingToast) dismissToast(loadingToast);
      const error = err as Error;
      showError(error.message);
      captureError(error, { 
        context: 'ContentManager.uploadFile',
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type 
      });
    } finally {
      setUploading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `insights/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error } = await supabase.storage
      .from('site-documents')
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from('site-documents')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showError('Please select an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        showError('Image size must be less than 5MB');
        return;
      }

      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPublicUrl = (fileName: string): string => {
    const { data } = supabase.storage
      .from('site-documents')
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleCreateInsight = (documentName: string) => {
    setCreatingFromDoc(documentName);
    setFormData({
      title: '',
      description: '',
      display_order: documents.length + 1,
      is_active: true
    });
    setImagePreview('');
    setSelectedImage(null);
    setEditingInsight(null);
    setValidationErrors([]);
    setShowForm(true);
  };

  const handleEditInsight = (insight: Insight) => {
    setEditingInsight(insight);
    setCreatingFromDoc(null);
    setFormData({
      title: insight.title,
      description: insight.description,
      display_order: insight.display_order,
      is_active: insight.is_active
    });
    setImagePreview(insight.image_url);
    setValidationErrors([]);
    setShowForm(true);
  };

  const validateFormData = (data: InsightFormData): ValidationError[] => {
    try {
      validateAndSanitizeInsight(data);
      return [];
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
      }
      return [{ field: 'general', message: 'Validation failed' }];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let loadingToast: string | undefined;

    try {
      setSaving(true);
      setValidationErrors([]);

      // Validate form data
      const errors = validateFormData(formData);
      if (errors.length > 0) {
        setValidationErrors(errors);
        showError('Please fix validation errors before saving');
        return;
      }

      const validatedData = validateAndSanitizeInsight(formData);

      loadingToast = showLoading(editingInsight ? 'Updating insight...' : 'Creating insight...');

      let imageUrl = editingInsight?.image_url || '';

      // Upload new image if selected
      if (selectedImage) {
        const imageValidationError = await validateFile(selectedImage);
        if (imageValidationError) {
          throw new Error(`Image validation failed: ${imageValidationError}`);
        }

        setUploadingImage(true);
        imageUrl = await uploadImage(selectedImage);
        setUploadingImage(false);
      }

      const documentFilename = editingInsight?.document_filename || creatingFromDoc || '';
      const documentUrl = getPublicUrl(documentFilename);

      const insightData = {
        ...validatedData,
        image_url: imageUrl,
        document_filename: documentFilename,
        document_url: documentUrl,
        display_order: validatedData.display_order || documents.length + 1
      };

      if (editingInsight) {
        // Update existing insight
        const { error } = await supabase
          .from('insights')
          .update(insightData)
          .eq('id', editingInsight.id);

        if (error) throw error;
        if (loadingToast) dismissToast(loadingToast);
        showSuccess('Insight updated successfully!');
      } else {
        // Create new insight
        const { error } = await supabase
          .from('insights')
          .insert(insightData);

        if (error) throw error;
        if (loadingToast) dismissToast(loadingToast);
        showSuccess('Insight created successfully!');
      }

      resetForm();
      await loadDocumentsAndInsights();
    } catch (err) {
      if (loadingToast) dismissToast(loadingToast);
      const error = err as Error;
      showError(error.message);
      captureError(error, { 
        context: 'ContentManager.handleSubmit',
        isEditing: !!editingInsight,
        formData 
      });
    } finally {
      setSaving(false);
      setUploadingImage(false);
    }
  };

  const handleDeleteDocument = async (fileName: string, hasInsight: boolean) => {
    try {
      // let loadingToast: string | undefined;
      const loadingToast = showLoading('Deleting...');
      
      // If document has an insight, delete the insight first
      if (hasInsight) {
        const { error: insightError } = await supabase
          .from('insights')
          .delete()
          .eq('document_filename', fileName);

        if (insightError) throw insightError;
      }

      // Delete the document file
      const { error } = await supabase.storage
        .from('site-documents')
        .remove([fileName]);

      if (error) throw error;

      if (loadingToast) dismissToast(loadingToast);
      showSuccess('Document and associated insight deleted successfully!');
      setDeleteConfirm(null);
      
      await loadDocumentsAndInsights();
    } catch (err) {
      const error = err as Error;
      showError('Failed to delete: ' + error.message);
      captureError(error, { 
        context: 'ContentManager.handleDeleteDocument',
        fileName,
        hasInsight 
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      display_order: 0,
      is_active: true
    });
    setSelectedImage(null);
    setImagePreview('');
    setEditingInsight(null);
    setCreatingFromDoc(null);
    setValidationErrors([]);
    setShowForm(false);
  };

  const getFileIcon = (fileName: string, metadata?: DocumentFile['metadata']) => { // Fixed: Proper typing instead of 'any'
    const extension = fileName.split('.').pop()?.toLowerCase();
    const mimeType = metadata?.mimetype || '';
  
    if (mimeType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) {
      return <PhotoIcon className="h-8 w-8 text-green-500" />;
    } else if (extension === 'pdf') {
      return <DocumentIcon className="h-8 w-8 text-red-500" />;
    } else if (['doc', 'docx'].includes(extension || '')) {
      return <DocumentIcon className="h-8 w-8 text-blue-500" />;
    } else if (['xls', 'xlsx'].includes(extension || '')) {
      return <DocumentIcon className="h-8 w-8 text-green-600" />;
    } else if (['ppt', 'pptx'].includes(extension || '')) {
      return <DocumentIcon className="h-8 w-8 text-orange-500" />;
    } else {
      return <DocumentIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
    event.target.value = '';
  };

  const handleFormChange = (field: keyof InsightFormData, value: string | number | boolean) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Clear validation errors for this field
    setValidationErrors(prev => prev.filter(error => error.field !== field));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="lg:hidden">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Content Manager
        </h1>
      </div>

      {/* Validation Errors Display */}
      {validationErrors.length > 0 && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Please fix the following errors:</h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc list-inside space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error.message}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Step 1: Upload Document</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Drop documents here or click to upload
                </span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileSelect}
                  disabled={uploading}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                />
              </label>
              <p className="mt-1 text-xs text-gray-500">
                PDFs and Office documents up to 10MB
              </p>
            </div>
            {uploading && (
              <div className="mt-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Uploading...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Documents and Insights List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Step 2: Manage Content</h3>
            <div className="text-sm text-gray-500">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                Published as Insight
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
                Available for Insight
              </span>
            </div>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-12">
              <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
              <p className="mt-1 text-sm text-gray-500">Upload your first document to get started.</p>
            </div>
          ) : (
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {documents.map((doc: DocumentWithInsight) => (
                  <li key={doc.name} className="py-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getFileIcon(doc.name, doc.metadata)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {doc.insight?.title || doc.name}
                          </p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            doc.status === 'used_in_insight' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {doc.status === 'used_in_insight' ? 'Published' : 'Available'}
                          </span>
                        </div>
                        {doc.insight ? (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {doc.insight.description}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500 italic mt-1">
                            Document ready for insight creation
                          </p>
                        )}
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          <span>{formatFileSize(doc.metadata?.size || 0)}</span>
                          <span>•</span>
                          <span>{formatDate(doc.updated_at || doc.created_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => window.open(getPublicUrl(doc.name), '_blank')}
                          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <EyeIcon className="h-3 w-3 mr-1" />
                          View
                        </button>
                        
                        {doc.status === 'available' ? (
                          <button
                            type="button"
                            onClick={() => handleCreateInsight(doc.name)}
                            className="inline-flex items-center px-2.5 py-1.5 border border-indigo-300 shadow-sm text-xs font-medium rounded text-indigo-700 bg-white hover:bg-indigo-50"
                          >
                            <DocumentTextIcon className="h-3 w-3 mr-1" />
                            Create Insight
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleEditInsight(doc.insight!)}
                            className="inline-flex items-center px-2.5 py-1.5 border border-green-300 shadow-sm text-xs font-medium rounded text-green-700 bg-white hover:bg-green-50"
                          >
                            <PencilIcon className="h-3 w-3 mr-1" />
                            Edit Insight
                          </button>
                        )}
                        
                        <button
                          type="button"
                          onClick={() => setDeleteConfirm(doc.name)}
                          className="inline-flex items-center px-2.5 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-white hover:bg-red-50"
                        >
                          <TrashIcon className="h-3 w-3 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Form Modal for Creating/Editing Insights */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                {editingInsight ? 'Edit Insight' : 'Create Insight'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    validationErrors.some(e => e.field === 'title') ? 'border-red-300' : ''
                  }`}
                  placeholder="Enter insight title..."
                  required
                />
                <p className="mt-1 text-xs text-gray-500">{formData.title.length}/200 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description *</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    validationErrors.some(e => e.field === 'description') ? 'border-red-300' : ''
                  }`}
                  placeholder="Enter insight description..."
                  required
                />
                <p className="mt-1 text-xs text-gray-500">{formData.description.length}/1000 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Featured Image</label>
                <div className="mt-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-2 h-32 w-48 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Display Order</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => handleFormChange('display_order', parseInt(e.target.value) || 0)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => handleFormChange('is_active', e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Publish as Active Insight</label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage || validationErrors.length > 0}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                >
                  {saving || uploadingImage ? (
                    <>
                      <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full inline-block"></div>
                      {uploadingImage ? 'Uploading...' : 'Saving...'}
                    </>
                  ) : (
                    editingInsight ? 'Update Insight' : 'Create Insight'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Delete Content</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Are you sure you want to delete this document and its associated insight? This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="mt-6 flex space-x-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const doc = documents.find(d => d.name === deleteConfirm);
                  handleDeleteDocument(deleteConfirm, !!doc?.insight);
                }}
                className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Content Management Workflow</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ol className="list-decimal list-inside space-y-1">
                <li><strong>Upload Document:</strong> Upload PDFs or Office documents that contain your insights</li>
                <li><strong>Create Insight:</strong> Add title, description, and featured image to published documents as insights</li>
                <li><strong>Manage:</strong> Edit insights, reorder them, or delete documents and their associated insights</li>
                <li><strong>Publish:</strong> Toggle insights active/inactive to control what appears on your website</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Validation Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Security & Validation</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                All content is automatically validated and sanitized to prevent security issues. 
                Script tags, JavaScript URLs, and other potentially harmful content will be removed.
                File uploads are validated for type and size before processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentManager;