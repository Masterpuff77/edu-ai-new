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
          
          // Add custom class for styling
          widget.classList.add('neon-purple-widget');
          
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
            
            // Apply neon purple styling to the widget button
            setTimeout(() => {
              const widgetButton = document.querySelector('elevenlabs-convai')?.shadowRoot?.querySelector('.convai-widget-button');
              if (widgetButton) {
                // Add neon purple glow to the button
                const style = document.createElement('style');
                style.textContent = `
                  .convai-widget-button {
                    border: 2px solid rgba(147, 51, 234, 0.8) !important;
                    background: linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(168, 85, 247, 0.9)) !important;
                    transition: all 0.3s ease !important;
                  }
                  .convai-widget-button:hover {
                    transform: scale(1.05) !important;
                  }
                  .convai-widget-button .convai-widget-icon-container {
                    position: relative;
                  }
                  .convai-widget-button .convai-widget-icon-container::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    border-radius: 50%;
                    background: transparent;
                    border: 2px solid rgba(147, 51, 234, 0.6);
                    animation: neon-spin 2s linear infinite;
                  }
                `;
                
                const shadowRoot = document.querySelector('elevenlabs-convai')?.shadowRoot;
                if (shadowRoot) {
                  shadowRoot.appendChild(style);
                }
              }
            }, 1000);
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