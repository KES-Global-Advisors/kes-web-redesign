import { useState, useEffect } from 'react';
import { useSupabase } from './SupabaseContext';
import { 
  CheckIcon, 
  ExclamationTriangleIcon,
  DocumentTextIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

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

const ContentEditor = () => {
  const { supabase } = useSupabase();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

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
        .select('*')
        .execute();

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
      setError('Failed to load content: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async (item: ContentItem, newText: string) => {
    try {
      setSaving(true);
      setError('');

      if (item.id) {
        // Update existing content
        const { error } = await supabase
          .from('site_content')
          .update({ 
            text: newText,
            updated_at: new Date().toISOString()
          })
          .eq('id', item.id)
          .execute();

        if (error) throw error;
      } else {
        // Insert new content
        const { data, error } = await supabase
          .from('site_content')
          .insert({
            section: item.section,
            text: newText,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .execute();

        if (error) throw error;

        // Update the item with the new ID
        const updatedContent = content.map((contentItem: ContentItem) => {
          if (contentItem.section === item.section) {
            return {
              ...contentItem,
              id: (data as DatabaseContentItem[])[0]?.id,
              text: newText,
              updated_at: new Date().toISOString()
            };
          }
          return contentItem;
        });
        setContent(updatedContent);
      }

      setSuccess('Content saved successfully!');
      setEditingId(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
      
      // Reload content to get fresh data
      await loadContent();
    } catch (err) {
      setError('Failed to save content: ' + (err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = (item: ContentItem) => {
    const textarea = document.getElementById(`content-${item.section}`) as HTMLTextAreaElement;
    const newText = textarea?.value || '';
    saveContent(item, newText);
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

      {/* Alerts */}
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckIcon className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">{success}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Content Sections */}
      <div className="space-y-6">
        {content.map((item: ContentItem) => (
          <div key={item.section} className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">{item.label}</h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Last updated: {formatDate(item.updated_at)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingId(editingId === item.section ? null : item.section)}
                  className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  {editingId === item.section ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className="mt-4">
                {editingId === item.section ? (
                  <div className="space-y-4">
                    <textarea
                      id={`content-${item.section}`}
                      rows={6}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder={item.placeholder}
                      defaultValue={item.text}
                    />
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSave(item)}
                        disabled={saving}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving ? (
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
        ))}
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
                <li>Changes are saved immediately when you click "Save Changes"</li>
                <li>Content updates will be reflected on the live website</li>
                <li>Use line breaks to format your text content</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;