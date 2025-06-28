import React, { useEffect, useRef } from 'react';

interface MathRendererProps {
  children: string;
  inline?: boolean;
  className?: string;
}

const MathRenderer: React.FC<MathRendererProps> = ({ children, inline = false, className = '' }) => {
  const mathRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mathRef.current && window.MathJax) {
      // Clear previous content
      mathRef.current.innerHTML = children;
      
      // Render math
      window.MathJax.typesetPromise([mathRef.current]).catch((err: any) => {
        console.error('MathJax rendering error:', err);
      });
    }
  }, [children]);

  return (
    <span 
      ref={mathRef}
      className={`math-renderer ${inline ? 'inline-math' : 'display-math'} ${className}`}
      style={{ display: inline ? 'inline' : 'block' }}
    >
      {children}
    </span>
  );
};

export default MathRenderer;