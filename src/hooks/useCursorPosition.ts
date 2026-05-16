import { useState, useEffect, useRef } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export function useCursorPosition(throttleMs = 16): CursorPosition {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const lastUpdate = useRef(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate.current >= throttleMs) {
        lastUpdate.current = now;
        setPosition({ x: event.clientX, y: event.clientY });
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const now = Date.now();
        if (now - lastUpdate.current >= throttleMs) {
          lastUpdate.current = now;
          setPosition({
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
          });
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [throttleMs]);

  return position;
}