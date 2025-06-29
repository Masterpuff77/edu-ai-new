import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'circle' | 'square' | 'triangle';
}

interface ConfettiCelebrationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const ConfettiCelebration: React.FC<ConfettiCelebrationProps> = ({ isVisible, onComplete }) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [animationId, setAnimationId] = useState<number | null>(null);

  const colors = [
    '#FFD700', // Gold
    '#FF6B9D', // Pink
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#96CEB4', // Green
    '#FFEAA7', // Yellow
    '#DDA0DD', // Plum
    '#98D8C8', // Mint
    '#F7DC6F', // Light Yellow
    '#BB8FCE'  // Light Purple
  ];

  const createConfettiPiece = (id: number): ConfettiPiece => {
    const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
    
    return {
      id,
      x: Math.random() * window.innerWidth,
      y: -10,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * 3 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      shape: shapes[Math.floor(Math.random() * shapes.length)]
    };
  };

  const updateConfetti = (pieces: ConfettiPiece[]): ConfettiPiece[] => {
    return pieces
      .map(piece => ({
        ...piece,
        x: piece.x + piece.vx,
        y: piece.y + piece.vy,
        vy: piece.vy + 0.1, // gravity
        rotation: piece.rotation + piece.rotationSpeed
      }))
      .filter(piece => piece.y < window.innerHeight + 50);
  };

  useEffect(() => {
    if (!isVisible) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        setAnimationId(null);
      }
      setConfetti([]);
      return;
    }

    // Create initial burst of confetti
    const initialConfetti: ConfettiPiece[] = [];
    for (let i = 0; i < 150; i++) {
      initialConfetti.push(createConfettiPiece(i));
    }
    setConfetti(initialConfetti);

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      
      setConfetti(prevConfetti => {
        let updatedConfetti = updateConfetti(prevConfetti);
        
        // Add more confetti periodically for the first 2 seconds
        if (frameCount < 120 && frameCount % 10 === 0) {
          for (let i = 0; i < 10; i++) {
            updatedConfetti.push(createConfettiPiece(Date.now() + i));
          }
        }
        
        // Stop animation when no confetti left or after 5 seconds
        if (updatedConfetti.length === 0 || frameCount > 300) {
          if (onComplete) onComplete();
          return [];
        }
        
        return updatedConfetti;
      });
      
      if (frameCount <= 300) {
        const id = requestAnimationFrame(animate);
        setAnimationId(id);
      }
    };

    const id = requestAnimationFrame(animate);
    setAnimationId(id);

    return () => {
      if (id) cancelAnimationFrame(id);
    };
  }, [isVisible, onComplete]);

  const renderShape = (piece: ConfettiPiece) => {
    const style = {
      position: 'absolute' as const,
      left: piece.x,
      top: piece.y,
      width: piece.size,
      height: piece.size,
      backgroundColor: piece.color,
      transform: `rotate(${piece.rotation}deg)`,
      pointerEvents: 'none' as const,
    };

    switch (piece.shape) {
      case 'circle':
        return (
          <div
            key={piece.id}
            style={{
              ...style,
              borderRadius: '50%',
            }}
          />
        );
      case 'square':
        return (
          <div
            key={piece.id}
            style={style}
          />
        );
      case 'triangle':
        return (
          <div
            key={piece.id}
            style={{
              ...style,
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: `${piece.size / 2}px solid transparent`,
              borderRight: `${piece.size / 2}px solid transparent`,
              borderBottom: `${piece.size}px solid ${piece.color}`,
            }}
          />
        );
      default:
        return null;
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ overflow: 'hidden' }}
    >
      {confetti.map(renderShape)}
    </div>
  );
};

export default ConfettiCelebration;