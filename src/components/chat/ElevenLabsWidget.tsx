import React, { useEffect, useRef } from 'react';

const ElevenLabsWidget: React.FC = () => {
  const scriptLoaded = useRef(false);
  const widgetMounted = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (scriptLoaded.current && widgetMounted.current) {
      return;
    }

    const initializeWidget = () => {
      try {
        // Check if script is already loaded
        if (!scriptLoaded.current) {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
          script.async = true;
          
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
        // Remove existing widget if present
        const existingWidget = document.querySelector('elevenlabs-convai');
        if (existingWidget) {
          existingWidget.remove();
          widgetMounted.current = false;
        }

        // Create new widget element
        if (!widgetMounted.current) {
          const widget = document.createElement('elevenlabs-convai');
          widget.setAttribute('agent-id', 'agent_01jwtq4zsef3cvgrpw0kzxk7ad');
          
          // Add error handling attributes
          widget.setAttribute('fallback-mode', 'true');
          widget.setAttribute('retry-attempts', '3');
          
          // Add widget to body
          document.body.appendChild(widget);
          widgetMounted.current = true;
          
          // Add error event listener
          widget.addEventListener('error', (event) => {
            console.warn('ElevenLabs widget error:', event);
            // Optionally retry or show fallback
          });
        }
      } catch (error) {
        console.warn('Error mounting ElevenLabs widget:', error);
      }
    };

    // Initialize with a small delay to ensure DOM is ready
    const timeoutId = setTimeout(initializeWidget, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      
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