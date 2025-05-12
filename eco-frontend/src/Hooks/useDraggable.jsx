// hooks/useDraggable.js
import { useEffect, useRef } from 'react';

const useDraggable = (ref, isText, onMove, containerRef) => {
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseDown = (e) => {
      if (e.button !== 0) return; // Only left mouse button
      
      const rect = element.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      
      isDragging.current = true;
      element.style.cursor = 'grabbing';
      
      if (isText) {
        e.preventDefault();
      }
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      
      if (containerRef && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - containerRect.left - offset.current.x;
        const y = e.clientY - containerRect.top - offset.current.y;
        
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        
        if (onMove) {
          onMove(x, y);
        }
      }
    };

    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        if (element) {
          element.style.cursor = 'move';
        }
      }
    };

    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [ref, isText, onMove, containerRef]);
};

export default useDraggable;