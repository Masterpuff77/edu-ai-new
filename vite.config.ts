import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-dom': 'react-dom/client'
    }
  },
  optimizeDeps: {
    include: ['react-dom/client'],
    exclude: ['lucide-react', '@daily-co/daily-react'],
  },
});