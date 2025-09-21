/**
 * Service Worker Registration with Update Notification
 * 
 * This module handles:
 * - Service worker registration
 * - Update detection and user notification
 * - Automatic reload on user confirmation
 * - Error handling for registration failures
 */

interface UpdateAvailableEvent {
  type: 'UPDATE_AVAILABLE';
  payload: {
    isUpdate: boolean;
  };
}

interface OfflineReadyEvent {
  type: 'OFFLINE_READY';
}

type PWAEvent = UpdateAvailableEvent | OfflineReadyEvent;

let updateSW: ((reloadPage?: boolean) => Promise<void>) | undefined;

/**
 * Show update notification to user
 * Uses native browser confirm dialog for maximum compatibility
 */
const showUpdateNotification = (): boolean => {
  return confirm(
    'O versiune nouă a aplicației este disponibilă!\n\n' +
    'Dorești să actualizezi acum pentru a beneficia de cele mai recente îmbunătățiri?\n\n' +
    'Aplicația se va reîncărca automat după actualizare.'
  );
};

/**
 * Show offline ready notification
 * Informs user that app is ready to work offline
 */
const showOfflineReadyNotification = (): void => {
  // Create a subtle notification that doesn't interrupt user flow
  const notification = document.createElement('div');
  notification.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #10b981;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 14px;
      font-weight: 500;
      animation: slideUp 0.3s ease-out;
    ">
      ✅ Aplicația este gata pentru utilizare offline!
    </div>
    <style>
      @keyframes slideUp {
        from { transform: translateX(-50%) translateY(100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
      }
    </style>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove notification after 4 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideUp 0.3s ease-out reverse';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 4000);
};

/**
 * Handle PWA events (update available, offline ready)
 */
const handlePWAEvent = (event: PWAEvent): void => {
  switch (event.type) {
    case 'UPDATE_AVAILABLE':
      console.log('PWA update available');
      if (showUpdateNotification() && updateSW) {
        updateSW(true); // Reload page after update
      }
      break;
      
    case 'OFFLINE_READY':
      console.log('PWA offline ready');
      showOfflineReadyNotification();
      break;
      
    default:
      console.log('Unknown PWA event:', event);
  }
};

/**
 * Check if we're in a supported environment for Service Workers
 */
const isServiceWorkerSupported = (): boolean => {
  // Check if Service Workers are supported by the browser
  if (!('serviceWorker' in navigator)) {
    return false;
  }
  
  // Check if we're in StackBlitz environment
  const isStackBlitz = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname.includes('stackblitz') ||
     window.location.hostname.includes('webcontainer'));
  
  return !isStackBlitz;
};

/**
 * Register service worker with comprehensive error handling
 */
export const initializePWA = async (): Promise<void> => {
  try {
    // Check if Service Workers are supported in this environment
    if (!isServiceWorkerSupported()) {
      console.log('Service Worker registration skipped - not supported in this environment');
      return;
    }

    // Dynamically import the registerSW function
    const { registerSW } = await import('virtual:pwa-register');
    
    updateSW = registerSW({
      immediate: true,
      onNeedRefresh() {
        handlePWAEvent({ type: 'UPDATE_AVAILABLE', payload: { isUpdate: true } });
      },
      onOfflineReady() {
        handlePWAEvent({ type: 'OFFLINE_READY' });
      },
      onRegisterError(error) {
        console.error('Service Worker registration failed:', error);
        
        // Optional: Show user-friendly error message
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            'PWA features are not available in development mode or due to registration failure. ' +
            'This is normal in development. PWA features will work in production.'
          );
        }
      },
      onRegistered(registration) {
        console.log('Service Worker registered successfully:', registration);
        
        // Optional: Set up periodic update checks (every 60 minutes)
        if (registration) {
          setInterval(() => {
            registration.update().catch(error => {
              console.log('Periodic update check failed:', error);
            });
          }, 60 * 60 * 1000); // 60 minutes
        }
      },
    });
    
    console.log('PWA initialization completed');
  } catch (error) {
    console.error('Failed to initialize PWA:', error);
  }
};

/**
 * Check if app is running as PWA (installed)
 */
export const isPWAInstalled = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true ||
         document.referrer.includes('android-app://');
};

/**
 * Check if PWA installation is available
 */
export const isPWAInstallable = (): boolean => {
  return 'serviceWorker' in navigator && 'BeforeInstallPromptEvent' in window;
};

// Export for use in components if needed
export { updateSW };