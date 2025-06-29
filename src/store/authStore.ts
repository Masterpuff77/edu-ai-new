import { create } from 'zustand';
import { User } from '../types';
import supabase, { isSupabaseAvailable } from '../config/supabase';
import { AuthUser } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  loadUserProfile: (authUser: AuthUser) => Promise<void>;
  clearAuth: () => void;
  uploadAvatar: (file: File | string) => Promise<string>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  clearAuth: () => {
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  },

  uploadAvatar: async (file: File | string) => {
    const { user } = get();
    if (!user) throw new Error('User not authenticated');

    try {
      set({ loading: true, error: null });

      // Dacă este string (base64 sau URL), îl salvăm direct
      if (typeof file === 'string') {
        await get().updateUser({ avatar: file });
        set({ loading: false });
        return file;
      }

      // Dacă este File object, îl convertim în base64
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const base64String = e.target?.result as string;
            await get().updateUser({ avatar: base64String });
            set({ loading: false });
            resolve(base64String);
          } catch (error) {
            set({ loading: false, error: 'Eroare la salvarea avatarului' });
            reject(error);
          }
        };
        reader.onerror = () => {
          set({ loading: false, error: 'Eroare la citirea fișierului' });
          reject(new Error('Failed to read file'));
        };
        reader.readAsDataURL(file);
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  loadUserProfile: async (authUser: AuthUser) => {
    // If Supabase is not available, skip profile loading
    if (!isSupabaseAvailable || !supabase) {
      console.warn('Supabase not available, cannot load user profile');
      set({ error: 'Database connection not available', loading: false });
      return;
    }

    try {
      set({ loading: true, error: null });
      
      // Try to fetch existing user profile
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();
      
      if (fetchError) {
        throw fetchError;
      }

      if (existingUser) {
        // User profile exists, use it
        set({
          user: existingUser as User,
          isAuthenticated: true,
          loading: false,
        });
        return;
      }

      // No profile exists, create a new one
      const newUser: Partial<User> = {
        id: authUser.id,
        email: authUser.email || '',
        name: '',
        level: 1,
        experience: 0,
        subjects: [],
        badges: [],
      };

      const { data: createdUser, error: createError } = await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single();

      if (createError) {
        throw createError;
      }

      set({
        user: createdUser as User,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
      console.error('Error loading user profile:', error);
    }
  },

  signUp: async (email: string, password: string) => {
    // If Supabase is not available, show appropriate error
    if (!isSupabaseAvailable || !supabase) {
      set({ 
        error: 'Authentication service is not available. Please check your configuration.', 
        loading: false 
      });
      return;
    }

    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        throw error;
      }

      if (data.user) {
        await get().loadUserProfile(data.user);
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    // If Supabase is not available, show appropriate error
    if (!isSupabaseAvailable || !supabase) {
      set({ 
        error: 'Authentication service is not available. Please check your configuration.', 
        loading: false 
      });
      return;
    }

    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }

      if (data.user) {
        await get().loadUserProfile(data.user);
      }
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  signInWithGoogle: async () => {
    // If Supabase is not available, show appropriate error
    if (!isSupabaseAvailable || !supabase) {
      set({ 
        error: 'Authentication service is not available. Please check your configuration.', 
        loading: false 
      });
      return;
    }

    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      
      if (error) {
        throw error;
      }

      // Note: The actual user data will be handled in App.tsx after redirect
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  signOut: async () => {
    if (!isSupabaseAvailable || !supabase) {
      get().clearAuth();
      return;
    }

    try {
      await supabase.auth.signOut();
      get().clearAuth();
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  updateUser: async (userData: Partial<User>) => {
    const { user } = get();
    if (!user) return;

    // If Supabase is not available, just update local state
    if (!isSupabaseAvailable || !supabase) {
      set({
        user: { ...user, ...userData },
        loading: false,
      });
      return;
    }

    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('users')
        .update(userData)
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }

      set({
        user: { ...user, ...userData },
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useAuthStore;