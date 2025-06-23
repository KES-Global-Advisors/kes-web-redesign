import { useState, useEffect } from 'react';
import { useSupabase } from './SupabaseContext';
import { z } from 'zod';
import { 
  CheckIcon, 
  ExclamationTriangleIcon,
  DocumentTextIcon,
  PencilIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { showSuccess, showError } from '../../lib/notifications';
import { captureError } from '../../lib/sentry';

// Validation Schema
const contentItemSchema = z.object({
  section: z.string()
    .min(1, 'Section is required')
    .max(50, 'Section must be less than 50 characters')
    .regex(/^[a-zA-Z_]+$/, 'Section must contain only letters and underscores'),
  text: z.string()
    .min(1, 'Content is required')
    .max(5000, 'Content must be less than 5000 characters'),
});

// Sanitization function
const sanitizeText = (text: string): string => {
  return text
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+="[^"]*"/gi, '') // Remove event handlers
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframes
};

// Types
interface ContentItem {
  id?: string | null;
  section: string;
  label: string;
  description: string;
  placeholder: string;
  text: string;
  updated_at?: string | null;
}

interface DefaultSection {
  section: string;
  label: string;
  description: string;
  placeholder: string;
}

interface DatabaseContentItem {
  id: string;
  section: string;
  text: string;
  created_at?: string;
  updated_at?: string;
}

interface ValidationError {
  field: string;
  message: string;
}

interface FormErrors {
  [section: string]: ValidationError[];
}

const ContentEditor = () => {
  const { supabase } = useSupabase();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<Record<string, boolean>>({});

  // Default content sections that should exist
  const defaultSections: DefaultSection[] = [
    {
      section: 'hero_title',
      label: 'Hero Title',
      description: 'Main title on the homepage',
      placeholder: 'Enter the main hero title...'
    },
    {
      section: 'hero_subtitle',
      label: 'Hero Subtitle',
      description: 'Subtitle text below the main title',
      placeholder: 'Enter the hero subtitle...'
    },
    {
      section: 'about_title',
      label: 'About Section Title',
      description: 'Title for the about section',
      placeholder: 'Enter about section title...'
    },
    {
      section: 'about_description',
      label: 'About Description',
      description: 'Main description text for the about section',
      placeholder: 'Enter about description...'
    },
    {
      section: 'mission_text',
      label: 'Mission Statement',
      description: 'Company mission statement',
      placeholder: 'Enter mission statement...'
    },
    {
      section: 'commitment_text',
      label: 'Commitment Statement',
      description: 'Company commitment statement',
      placeholder: 'Enter commitment statement...'
    },
    {
      section: 'approach_title',
      label: 'Approach Section Title',
      description: 'Title for the approach section',
      placeholder: 'Enter approach title...'
    },
    {
      section: 'approach_description',
      label: 'Approach Description',
      description: 'Description of company approach',
      placeholder: 'Enter approach description...'
    },
    {
      section: 'services_title',
      label: 'Services Section Title',
      description: 'Title for the services section',
      placeholder: 'Enter services title...'
    },
    {
      section: 'insights_title',
      label: 'Insights Section Title',
      description: 'Title for the insights section',
      placeholder: 'Enter insights title...'
    },
    {
      section: 'insights_description',
      label: 'Insights Description',
      description: 'Description for the insights section',
      placeholder: 'Enter insights description...'
    },
    {
      section: 'contact_title',
      label: 'Contact Section Title',
      description: 'Title for the contact section',
      placeholder: 'Enter contact title...'
    }
  ];

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('site_content')
        .select('*');

      if (error) throw error;

      // Create a map of existing content
      const existingContent = (data as DatabaseContentItem[]).reduce((acc: Record<string, DatabaseContentItem>, item: DatabaseContentItem) => {
        acc[item.section] = item;
        return acc;
      }, {});

      // Merge with default sections to ensure all sections exist
      const mergedContent: ContentItem[] = defaultSections.map((defaultSection: DefaultSection) => {
        const existing = existingContent[defaultSection.section];
        return {
          ...defaultSection,
          id: existing?.id || null,
          text: existing?.text || '',
          updated_at: existing?.updated_at || null
        };
      });

      setContent(mergedContent);
    } catch (err) {
      const error = err as Error;
      showError('Failed to load content: ' + error.message);
      captureError(error, { context: 'ContentEditor.loadContent' });
    } finally {
      setLoading(false);
    }
  };

  const validateContentInput = (section: string, text: string): ValidationError[] => {
    try {
      contentItemSchema.parse({ section, text });
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

  const validateAndSanitizeContent = (section: string, text: string) => {
    const sanitizedText = sanitizeText(text);
    const validationErrors = validateContentInput(section, sanitizedText);
    
    if (validationErrors.length > 0) {
      throw new Error(`Validation failed: ${validationErrors[0].message}`);
    }
    
    return {
      section,
      text: sanitizedText
    };
  };

  const saveContent = async (item: ContentItem, newText: string) => {
    try {
      setSaving(item.section);
      setValidationErrors(prev => ({ ...prev, [item.section]: [] }));

      // Validate and sanitize input
      const validatedData = validateAndSanitizeContent(item.section, newText);

      if (item.id) {
        // Update existing content
        const { error } = await supabase
          .from('site_content')
          .update({ 
            text: validatedData.text,
            updated_at: new Date().toISOString()
          })
          .eq('id', item.id);

        if (error) throw error;
      } else {
        // Insert new content
        const { data, error } = await supabase
          .from('site_content')
          .insert({
            section: validatedData.section,
            text: validatedData.text,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select();

        if (error) throw error;

        // Update the item with the new ID
        if (data && data[0]) {
          const updatedContent = content.map((contentItem: ContentItem) => {
            if (contentItem.section === item.section) {
              return {
                ...contentItem,
                id: data[0].id,
                text: validatedData.text,
                updated_at: new Date().toISOString()
              };
            }
            return contentItem;
          });
          setContent(updatedContent);
        }
      }

      showSuccess('Content saved successfully!');
      setEditingId(null);
      setHasUnsavedChanges(prev => ({ ...prev, [item.section]: false }));
      
      // Reload content to get fresh data
      await loadContent();
    } catch (err) {
      const error = err as Error;
      
      // Handle validation errors
      if (error.message.includes('Validation failed:')) {
        const validationError = error.message.replace('Validation failed: ', '');
        setValidationErrors(prev => ({ 
          ...prev, 
          [item.section]: [{ field: 'text', message: validationError }] 
        }));
        showError('Please fix validation errors before saving');
      } else {
        showError('Failed to save content: ' + error.message);
        captureError(error, { 
          context: 'ContentEditor.saveContent',
          section: item.section,
          contentLength: newText.length
        });
      }
    } finally {
      setSaving(null);
    }
  };

  const handleSave = (item: ContentItem) => {
    const textarea = document.getElementById(`content-${item.section}`) as HTMLTextAreaElement;
    const newText = textarea?.value || '';
    saveContent(item, newText);
  };

  const handleCancel = (section: string) => {
    setEditingId(null);
    setValidationErrors(prev => ({ ...prev, [section]: [] }));
    setHasUnsavedChanges(prev => ({ ...prev, [section]: false }));
  };

  const handleTextChange = (section: string, text: string) => {
    setHasUnsavedChanges(prev => ({ ...prev, [section]: true }));
    
    // Real-time validation
    const errors = validateContentInput(section, text);
    setValidationErrors(prev => ({ ...prev, [section]: errors }));
  };

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return 'Never updated';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCharacterCount = (text: string): { count: number; isOverLimit: boolean } => {
    const count = text.length;
    const limit = 5000;
    return { count, isOverLimit: count > limit };
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
          Content Editor
        </h1>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {content.map((item: ContentItem) => {
          const sectionErrors = validationErrors[item.section] || [];
          const hasErrors = sectionErrors.length > 0;
          const isEditing = editingId === item.section;
          const isSaving = saving === item.section;
          const hasUnsaved = hasUnsavedChanges[item.section];

          return (
            <div key={item.section} className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900">{item.label}</h3>
                      {hasUnsaved && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          Unsaved changes
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                    <p className="mt-1 text-xs text-gray-400">
                      Last updated: {formatDate(item.updated_at)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleCancel(item.section)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <XMarkIcon className="h-4 w-4 mr-1" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditingId(item.section)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <textarea
                          id={`content-${item.section}`}
                          rows={6}
                          className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                            hasErrors 
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                              : ''
                          }`}
                          placeholder={item.placeholder}
                          defaultValue={item.text}
                          onChange={(e) => handleTextChange(item.section, e.target.value)}
                          disabled={isSaving}
                        />
                        
                        <div className="mt-1 flex justify-between items-center">
                          <div>
                            {/* Validation Errors */}
                            {sectionErrors.map((error, index) => (
                              <p key={index} className="text-sm text-red-600">
                                {error.message}
                              </p>
                            ))}
                          </div>
                          
                          {/* Character Count */}
                          <div className="text-right">
                            {(() => {
                              const textarea = document.getElementById(`content-${item.section}`) as HTMLTextAreaElement;
                              const currentText = textarea?.value || item.text;
                              const { count, isOverLimit } = getCharacterCount(currentText);
                              return (
                                <p className={`text-xs ${isOverLimit ? 'text-red-600' : 'text-gray-500'}`}>
                                  {count}/5000 characters
                                </p>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => handleCancel(item.section)}
                          disabled={isSaving}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSave(item)}
                          disabled={isSaving || hasErrors}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSaving ? (
                            <>
                              <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <CheckIcon className="h-4 w-4 mr-1" />
                              Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-md p-4">
                      {item.text ? (
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">{item.text}</p>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No content set. Click "Edit" to add content.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Content Editor Help</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Click "Edit" to modify any section content</li>
                <li>Content is automatically validated for security and length</li>
                <li>Changes are saved immediately when you click "Save Changes"</li>
                <li>Content updates will be reflected on the live website</li>
                <li>Maximum content length is 5,000 characters per section</li>
                <li>HTML and JavaScript content is automatically sanitized for security</li>
              </ul>
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
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;