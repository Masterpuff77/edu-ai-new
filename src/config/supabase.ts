import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://iecycqxhlhjpkriqswzx.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllY3ljcXhobGhqcGtyaXFzd3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MTIxOTEsImV4cCI6MjA2NDM4ODE5MX0.tKAnc9nlDrC9pMj6Lwn4ra89cufYELxmR4NvBJ_peWQ';

// Check if environment variables are properly configured (not placeholder values)
const hasValidSupabaseConfig = 
  supabaseUrl && 
  supabaseKey && 
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseKey !== 'your-anon-key' &&
  supabaseUrl.includes('.supabase.co') &&
  supabaseKey.length > 20; // Basic validation for key length

let supabase: any = null;

if (hasValidSupabaseConfig) {
  try {
    // Initialize the Supabase client
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
    console.log('Supabase client initialized successfully');
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
    supabase = null;
  }
} else {
  console.warn('Supabase environment variables not properly configured. Please set up your Supabase project credentials in the .env file.');
}

// Export both the client and a flag indicating if it's available
export const isSupabaseAvailable = !!supabase;
export default supabase;