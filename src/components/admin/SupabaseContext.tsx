/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Type definitions
interface User {
  id: string;
  email: string;
  [key: string]: any;
}

interface AuthResponse {
  data: { user: User | null };
  error: Error | null;
}

interface SupabaseContextType {
  supabase: SupabaseClient;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => Promise<{ error: Error | null }>;
}

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

interface QueryResponse<T = any> {
  data: T;
  error: Error | null;
}

interface FileObject {
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

interface StorageResponse {
  data: any;
  error: Error | null;
}

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Simple Supabase client implementation
class SupabaseClient {
  public url: string;
  public key: string;
  public authToken: string | null;

  constructor(url: string, key: string) {
    this.url = url;
    this.key = key;
    this.authToken = null;
  }

  async _request(endpoint: string, options: RequestOptions = {}): Promise<any> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'apikey': this.key,
      ...options.headers
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    const response = await fetch(`${this.url}${endpoint}`, {
      ...options,
      headers
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Authentication methods
  async signInWithPassword(email: string, password: string): Promise<AuthResponse> {
    const response = await this._request('/auth/v1/token?grant_type=password', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      })
    });

    if (response.access_token) {
      this.authToken = response.access_token;
      localStorage.setItem('supabase_token', response.access_token);
      localStorage.setItem('supabase_user', JSON.stringify(response.user));
    }

    return { data: { user: response.user }, error: null };
  }

  async signOut(): Promise<{ error: Error | null }> {
    await this._request('/auth/v1/logout', {
      method: 'POST'
    });
    
    this.authToken = null;
    localStorage.removeItem('supabase_token');
    localStorage.removeItem('supabase_user');
    
    return { error: null };
  }

  async getUser(): Promise<{ data: { user: User | null }; error: Error | null }> {
    if (!this.authToken) {
      return { data: { user: null }, error: null };
    }

    try {
      const response = await this._request('/auth/v1/user');
      return { data: { user: response }, error: null };
    } catch (error) {
      return { data: { user: null }, error: error as Error };
    }
  }

  // Database methods
  from(table: string): QueryBuilder {
    return new QueryBuilder(this, table);
  }

  // Storage methods
  storage = {
    from: (bucket: string) => new StorageBucket(this, bucket)
  };
}

class QueryBuilder {
  private client: SupabaseClient;
  private table: string;
  private query: string;
  private insertData?: any;
  private updateData?: any;

  constructor(client: SupabaseClient, table: string) {
    this.client = client;
    this.table = table;
    this.query = '';
  }

  select(columns = '*'): QueryBuilder {
    this.query = `select=${columns}`;
    return this;
  }

  insert(data: any): QueryBuilder {
    this.insertData = data;
    return this;
  }

  update(data: any): QueryBuilder {
    this.updateData = data;
    return this;
  }

  eq(column: string, value: any): QueryBuilder {
    this.query += this.query ? '&' : '';
    this.query += `${column}=eq.${value}`;
    return this;
  }

  async execute(): Promise<QueryResponse> {
    if (this.insertData) {
      return await this.client._request(`/rest/v1/${this.table}`, {
        method: 'POST',
        body: JSON.stringify(this.insertData)
      });
    }

    if (this.updateData) {
      return await this.client._request(`/rest/v1/${this.table}?${this.query}`, {
        method: 'PATCH',
        body: JSON.stringify(this.updateData)
      });
    }

    const response = await this.client._request(`/rest/v1/${this.table}?${this.query}`);
    return { data: response, error: null };
  }

  async delete(): Promise<{ error: Error | null }> {
    await this.client._request(`/rest/v1/${this.table}?${this.query}`, {
      method: 'DELETE'
    });
    return { error: null };
  }
}

class StorageBucket {
  private client: SupabaseClient;
  private bucket: string;

  constructor(client: SupabaseClient, bucket: string) {
    this.client = client;
    this.bucket = bucket;
  }

  async list(path = ''): Promise<{ data: FileObject[] | null; error: Error | null }> {
    try {
      const response = await this.client._request(`/storage/v1/object/list/${this.bucket}?limit=100&offset=0&sortBy=name&prefix=${path}`);
      return { data: response, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async upload(path: string, file: File): Promise<StorageResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${this.client.url}/storage/v1/object/${this.bucket}/${path}`, {
        method: 'POST',
        headers: {
          'apikey': this.client.key,
          'Authorization': `Bearer ${this.client.authToken}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Upload failed');
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }

  async remove(paths: string[]): Promise<{ error: Error | null }> {
    try {
      await this.client._request(`/storage/v1/object/${this.bucket}`, {
        method: 'DELETE',
        body: JSON.stringify({ prefixes: paths })
      });
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  getPublicUrl(path: string): { data: { publicUrl: string } } {
    return {
      data: {
        publicUrl: `${this.client.url}/storage/v1/object/public/${this.bucket}/${path}`
      }
    };
  }
}

// Create Supabase client instance
const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Context
const SupabaseContext = createContext<SupabaseContextType>({} as SupabaseContextType);

interface SupabaseProviderProps {
  children: ReactNode;
}

export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('supabase_token');
    const userData = localStorage.getItem('supabase_user');
    
    if (token && userData) {
      supabase.authToken = token;
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.signInWithPassword(email, password);
      if (error) throw error;
      
      setUser(data.user);
      return { data, error: null };
    } catch (error) {
      return { data: { user: null }, error: error as Error };
    }
  };

  const signOut = async (): Promise<{ error: Error | null }> => {
    try {
      await supabase.signOut();
      setUser(null);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const value: SupabaseContextType = {
    supabase,
    user,
    loading,
    signIn,
    signOut
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = (): SupabaseContextType => {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};