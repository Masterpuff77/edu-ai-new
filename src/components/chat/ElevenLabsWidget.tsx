import React, { useEffect, useRef } from 'react';

const ElevenLabsWidget: React.FC = () => {
  const scriptLoaded = useRef(false);
  const widgetMounted = useRef(false);

  useEffect(() => {
    // Check if agent ID is configured
    const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID;
    if (!agentId) {
      console.warn('ElevenLabs agent ID not configured. Please set VITE_ELEVENLABS_AGENT_ID in your .env file.');
      return;
    }

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
          widget.setAttribute('agent-id', agentId);
          
          // Add error handling attributes
          widget.setAttribute('fallback-mode', 'true');
          widget.setAttribute('retry-attempts', '3');
          
          // Add widget to body
          document.body.appendChild(widget);
          widgetMounted.current = true;
          
          // Add error event listener
          widget.addEventListener('error', (event) => {
            console.warn('ElevenLabs widget error:', event);
            console.warn('Please verify that the agent ID is valid and active in your ElevenLabs account.');
            // Optionally retry or show fallback
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