import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { isSupabaseAvailable } from './config/supabase';
import { initMockData } from './data/mockData';
import supabase from './config/supabase';
import { initializePWA } from './registerSW';

// Initialize mock data and render the app
const init = async () => {
  try {
    // Only try to initialize mock data if Supabase is available and properly configured
    if (isSupabaseAvailable && supabase) {
      console.log('Supabase is available, initializing mock data...');
      await initMockData(supabase);
    } else {
      console.log('Supabase is not properly configured, running in offline mode');
      console.log('To enable full functionality, please configure your Supabase credentials in the .env file');
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
    
    // Initialize PWA features after app is rendered
    initializePWA();
  }
};

init();