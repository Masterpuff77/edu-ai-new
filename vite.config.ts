import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg}'],
        navigateFallback: '/offline.html',
        navigateFallbackDenylist: [/^\/api/, /^\/supabase/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/v1\/.*/,
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'supabase-api-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60, // 5 minutes
              },
            },
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/functions\/v1\/.*/,
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'supabase-functions-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 2 * 60, // 2 minutes
              },
            },
          },
          {
            urlPattern: /^https:\/\/www\.google-analytics\.com\/.*/,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /^https:\/\/analytics\.google\.com\/.*/,
            handler: 'NetworkOnly',
          },
        ],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'EduVibe – Platformă Educațională AI pentru Elevi',
        short_name: 'EduVibe',
        description: 'Platformă educațională AI pentru pregătirea la Evaluarea Națională și Bacalaureat',
        theme_color: '#4f46e5',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        categories: ['education', 'productivity'],
        lang: 'ro',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'pwa-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any',
          },
        ],
        shortcuts: [
          {
            name: 'Dashboard',
            short_name: 'Dashboard',
            description: 'Accesează tabloul de bord',
            url: '/dashboard',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
          {
            name: 'Plan de Studiu',
            short_name: 'Studiu',
            description: 'Vezi planul de studiu',
            url: '/study-plan',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});