import React, { useEffect, useRef } from 'react';

const ElevenLabsWidget: React.FC = () => {
  const scriptLoaded = useRef(false);
  const widgetMounted = useRef(false);
  const isMobileDevice = useRef(false);

  useEffect(() => {
    // Verifică dacă este un dispozitiv mobil (lățime < 768px)
    const checkMobileDevice = () => {
      isMobileDevice.current = window.innerWidth < 768;
    };

    // Verifică inițial și adaugă listener pentru redimensionare
    checkMobileDevice();
    window.addEventListener('resize', checkMobileDevice);

    // Use the specific agent ID provided
    const agentId = 'agent_01jwtq4zsef3cvgrpw0kzxk7ad';
    
    // Prevent multiple initializations
    if (scriptLoaded.current && widgetMounted.current) {
      return;
    }

    const initializeWidget = () => {
      try {
        // Skip initialization on mobile devices
        if (isMobileDevice.current) {
          console.log('ElevenLabs widget disabled on mobile devices');
          return;
        }

        // Check if script is already loaded
        if (!scriptLoaded.current) {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
          script.async = true;
          script.type = 'text/javascript';
          
          script.onload = () => {
            scriptLoaded.current = true;
            mountWidget();
          };
          
          script.onerror = (error) => {
            console.warn('ElevenLabs script failed to load:', error);
            scriptLoaded.current = false;
          };
          
          document.head.appendChild(script);
        } else {
          mountWidget();
        }
      } catch (error) {
        console.warn('Error initializing ElevenLabs widget:', error);
      }
    };

    const mountWidget = () => {
      try {
        // Skip mounting on mobile devices
        if (isMobileDevice.current) {
          return;
        }

        // Remove existing widget if present
        const existingWidget = document.querySelector('elevenlabs-convai');
        if (existingWidget) {
          existingWidget.remove();
          widgetMounted.current = false;
        }

        // Create new widget element
        if (!widgetMounted.current) {
          const widget = document.createElement('elevenlabs-convai');
          widget.setAttribute('agent-id', agentId);
          
          // Add widget to body
          document.body.appendChild(widget);
          widgetMounted.current = true;
          
          // Add error event listener
          widget.addEventListener('error', (event) => {
            console.warn('ElevenLabs widget error:', event);
            console.warn('Please verify that the agent ID is valid and active in your ElevenLabs account.');
          });

          // Add load event listener for debugging
          widget.addEventListener('load', () => {
            console.log('ElevenLabs widget loaded successfully');
          });
        }
      } catch (error) {
        console.warn('Error mounting ElevenLabs widget:', error);
        console.warn('Please check your ElevenLabs agent configuration.');
      }
    };

    // Initialize with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(initializeWidget, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkMobileDevice);
      
      try {
        // Remove widget on unmount
        const existingWidget = document.querySelector('elevenlabs-convai');
        if (existingWidget) {
          existingWidget.remove();
          widgetMounted.current = false;
        }
        
        // Note: We don't remove the script as it might be used by other components
        // and removing it could cause issues
      } catch (error) {
        console.warn('Error during ElevenLabs widget cleanup:', error);
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default ElevenLabsWidget;