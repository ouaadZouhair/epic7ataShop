import React, { useState, useRef } from 'react';
import { Canvas, Toolbar, TextEditor, ImageUploader, GoShopNav } from '../../components/imports';

const Print = () => {
  const [garmentColor, setGarmentColor] = useState('white');
  const [garmentType, setGarmentType] = useState('hoodie');
  const [designs, setDesigns] = useState([]);
  const [selectedDesignId, setSelectedDesignId] = useState(null);
  
  const nextZIndex = useRef(1);

  const selectedDesign = designs.find(design => design.id === selectedDesignId);

  const addText = () => {
    const newDesign = {
      id: Date.now(),
      type: 'text',
      content: 'Your Text Here',
      color: '#000000',
      fontSize: 24,
      fontFamily: 'Arial',
      x: 100,
      y: 100,
      zIndex: nextZIndex.current++,
    };
    setDesigns([...designs, newDesign]);
    setSelectedDesignId(newDesign.id);
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newDesign = {
        id: Date.now(),
        type: 'image',
        src: event.target.result,
        width: 200,
        x: 100,
        y: 100,
        scale: 1,
        zIndex: nextZIndex.current++,
      };
      setDesigns([...designs, newDesign]);
      setSelectedDesignId(newDesign.id);
    };
    reader.readAsDataURL(file);
  };

  const updateText = (updatedText) => {
    setDesigns(designs.map(design => 
      design.id === updatedText.id ? updatedText : design
    ));
  };

  const updateImage = (updatedImage) => {
    setDesigns(designs.map(design => 
      design.id === updatedImage.id ? updatedImage : design
    ));
  };

  const deleteDesign = () => {
    setDesigns(designs.filter(design => design.id !== selectedDesignId));
    setSelectedDesignId(null);
  };

  const bringToFront = () => {
    setDesigns(designs.map(design => ({
      ...design,
      zIndex: design.id === selectedDesignId ? nextZIndex.current++ : design.zIndex,
    })));
  };

  const sendToBack = () => {
    const minZIndex = Math.min(...designs.map(d => d.zIndex));
    setDesigns(designs.map(design => ({
      ...design,
      zIndex: design.id === selectedDesignId ? minZIndex - 1 : design.zIndex,
    })));
  };

  return (
    <div className="min-h-screen">
      <GoShopNav />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Custom Clothing Designer</h1>
        
        <Toolbar
          onAddText={addText}
          onUploadImage={uploadImage}
          onChangeGarmentColor={setGarmentColor}
          onChangeGarmentType={setGarmentType}
          garmentColor={garmentColor}
          garmentType={garmentType}
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <Canvas
              garmentColor={garmentColor}
              garmentType={garmentType}
              designs={designs}
              onDesignSelect={setSelectedDesignId}
              selectedDesignId={selectedDesignId}
            />
          </div>
          
          <div className="w-full lg:w-80">
            {selectedDesign && (
              selectedDesign.type === 'text' ? (
                <TextEditor
                  selectedDesign={selectedDesign}
                  onUpdateText={updateText}
                  onDelete={deleteDesign}
                  onBringToFront={bringToFront}
                  onSendToBack={sendToBack}
                />
              ) : (
                <ImageUploader
                  selectedDesign={selectedDesign}
                  onUpdateImage={updateImage}
                  onDelete={deleteDesign}
                  onBringToFront={bringToFront}
                  onSendToBack={sendToBack}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Print;