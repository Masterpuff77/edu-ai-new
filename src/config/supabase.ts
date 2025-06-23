import { createClient } from '@supabase/supabase-js';

// Get environment variables with better error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug environment variables
console.log('🔧 Supabase Config Debug:');
console.log('URL exists:', !!supabaseUrl);
console.log('Key exists:', !!supabaseKey);
console.log('URL value:', supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : 'MISSING');
console.log('Key value:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'MISSING');

if (!supabaseUrl) {
  console.error('❌ VITE_SUPABASE_URL is missing from .env file');
  throw new Error('Missing VITE_SUPABASE_URL environment variable');
}

if (!supabaseKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY is missing from .env file');
  throw new Error('Missing VITE_SUPABASE_ANON_KEY environment variable');
}

// Initialize the Supabase client with better error handling
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'eduai-app'
    }
  }
});

// Test connection immediately
supabase.from('lessons').select('count').limit(1)
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ Supabase connection test failed:', error);
    } else {
      console.log('✅ Supabase connection test successful');
    }
  })
  .catch(err => {
    console.error('💥 Supabase connection error:', err);
  });

export default supabase;