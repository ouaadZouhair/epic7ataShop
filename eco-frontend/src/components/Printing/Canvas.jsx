// components/Canvas.jsx
import React, { useRef, useState } from 'react';
import useDraggable from '../../Hooks/useDraggable';

const Canvas = ({garmentType, garmentColor, designs, onDesignSelect, selectedDesignId, onDesignMove }) => {
  const canvasRef = useRef(null);

  return (
    <div className="relative w-[500px] h-[500px]  mx-auto bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      {/* Garment base */}
      <div 
        ref={canvasRef}
        className={`relative ${garmentColor === 'white' ? 'bg-white' : garmentColor === 'black' ? 'bg-gray-900' : `bg-${garmentColor}-500`}`} 
        style={{ 
          backgroundImage: `url(/imgWebpage/${garmentType}-template.png)`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '500px',
          width: '100%'
        }}
      >
        {/* Render designs */}
        {designs.map((design) => (
          <DesignElement 
            key={design.id}
            design={design}
            isSelected={selectedDesignId === design.id}
            onClick={() => onDesignSelect(design.id)}
            onMove={(x, y) => onDesignMove(design.id, x, y)}
            containerRef={canvasRef}
          />
        ))}
      </div>
    </div>
  );
};

const DesignElement = ({ design, isSelected, onClick, onMove, containerRef }) => {
  const elementRef = useRef(null);
  
  useDraggable(elementRef, design.type === 'text' ? design.content : null, onMove, containerRef);

  const style = {
    position: 'absolute',
    left: `${design.x}px`,
    top: `${design.y}px`,
    transform: `scale(${design.scale || 1})`,
    cursor: 'move',
    border: isSelected ? '2px dashed #3B82F6' : 'none',
    zIndex: design.zIndex,
    userSelect: 'none',
  };

  return (
    <div 
      ref={elementRef}
      style={style}
      onClick={onClick}
      className="select-none"
    >
      {design.type === 'image' ? (
        <img 
          src={design.src} 
          alt="User design" 
          style={{ width: `${design.width}px`, height: 'auto' }}
          draggable="false"
        />
      ) : (
        <p style={{ 
          color: design.color, 
          fontSize: `${design.fontSize}px`,
          fontFamily: design.fontFamily,
          margin: 0,
          padding: '4px',
          whiteSpace: 'nowrap'
        }}>
          {design.content}
        </p>
      )}
    </div>
  );
};

export default Canvas;