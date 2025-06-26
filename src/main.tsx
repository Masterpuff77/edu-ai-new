import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import supabase, { isSupabaseAvailable } from './config/supabase';
import { initMockData } from './data/mockData';

// Initialize mock data and render the app
const init = async () => {
  try {
    // Only try to initialize mock data if Supabase is available
    if (isSupabaseAvailable) {
      console.log('Supabase is available, initializing mock data...');
      await initMockData(supabase);
    } else {
      console.log('Supabase is not available, running in offline mode');
    }
  } catch (error) {
    console.warn('Failed to initialize mock data:', error);
    // Continue anyway - the app should still work without Supabase
  } finally {
    // Always render the app, regardless of Supabase status
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
};

init();