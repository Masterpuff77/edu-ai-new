import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are available
const hasSupabaseConfig = supabaseUrl && supabaseKey;

let supabase: any = null;

if (hasSupabaseConfig) {
  try {
    // Initialize the Supabase client
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
    supabase = null;
  }
} else {
  console.warn('Supabase environment variables not found. Please check your .env file includes VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
}

// Export both the client and a flag indicating if it's available
export const isSupabaseAvailable = !!supabase;
export default supabase;