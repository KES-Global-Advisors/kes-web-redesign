import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { useSupabase } from './SupabaseContext';
import ContentEditor from './ContentEditor';
import DocumentManager from './DocumentManager';
import { 
  DocumentTextIcon, 
  FolderIcon, 
  HomeIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const AdminPanel = () => {
  const { user, loading, signOut } = useSupabase();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navigation = [
    { name: 'Content Editor', href: '/admin/content', icon: DocumentTextIcon },
    { name: 'Document Manager', href: '/admin/documents', icon: FolderIcon },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`relative z-50 lg:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)}></div>
        <div className="fixed inset-0 flex">
          <div className="relative mr-16 flex w-full max-w-xs flex-1">
            <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
              <button
                type="button"
                className="-m-2.5 p-2.5"
                onClick={() => setSidebarOpen(false)}
              >
                <XMarkIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
              <div className="flex h-16 shrink-0 items-center">
                <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
              </div>
              <nav className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                              location.pathname === item.href
                                ? 'bg-gray-50 text-indigo-600'
                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                            }`}
                            onClick={() => setSidebarOpen(false)}
                          >
                            <item.icon className="h-6 w-6 shrink-0" />
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
          <div className="flex h-16 shrink-0 items-center">
            <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={`group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                          location.pathname === item.href
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                        }`}
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                  <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {user?.email?.[0]?.toUpperCase() || 'A'}
                    </span>
                  </div>
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">{user?.email}</span>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">Admin Panel</div>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Sign out
        </button>
      </div>

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Top bar for desktop */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:mb-8">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                {location.pathname === '/admin/content' && 'Content Editor'}
                {location.pathname === '/admin/documents' && 'Document Manager'}
                {location.pathname === '/admin/dashboard' && 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-x-4">
              <Link
                to="/"
                className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
              >
                <HomeIcon className="h-5 w-5" />
                Back to site
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 hover:text-red-600"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Sign out
              </button>
            </div>
          </div>

          {/* Routes */}
          <Routes>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/content" element={<ContentEditor />} />
            <Route path="/documents" element={<DocumentManager />} />
            <Route path="/" element={<AdminDashboard />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// Simple dashboard component
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
            to="/admin/content"
            className="block p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-gray-50 transition-colors"
          >
            <DocumentTextIcon className="h-8 w-8 text-indigo-600 mb-2" />
            <h3 className="font-medium text-gray-900">Content Editor</h3>
            <p className="text-sm text-gray-600">Edit text content throughout your website</p>
          </Link>
          <Link
            to="/admin/documents"
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

export default AdminPanel;