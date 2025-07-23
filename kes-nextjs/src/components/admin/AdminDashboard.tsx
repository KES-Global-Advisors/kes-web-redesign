'use client'

import Link from 'next/link'; // ← Import Next.js Link
import { useSupabase } from './SupabaseContext';
import { DocumentTextIcon, FolderIcon } from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const { user } = useSupabase();
  
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Welcome to the Admin Panel</h2>
        <p className="text-gray-600 mb-4">
          Hello {user?.email}! You can manage your website content and documents from here.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/content" 
            className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-gray-50 transition-colors"
          >
            <DocumentTextIcon className="h-8 w-8 text-indigo-600 mb-2" />
            <h3 className="font-medium text-gray-900">Content Editor</h3>
            <p className="text-sm text-gray-600">Edit text content throughout your website</p>
          </Link>
          <Link
            href="/admin/manager"
            className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-gray-50 transition-colors"
          >
            <FolderIcon className="h-8 w-8 text-indigo-600 mb-2" />
            <h3 className="font-medium text-gray-900">Document Manager</h3>
            <p className="text-sm text-gray-600">Upload and manage documents and images</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;