// components/TextEditor.jsx
import React, { useState, useEffect } from 'react';

const TextEditor = ({ 
  selectedDesign, 
  onUpdateText, 
  onDelete, 
  onBringToFront,
  onSendToBack,
}) => {
  const [text, setText] = useState(selectedDesign.content);
  const [color, setColor] = useState(selectedDesign.color);
  const [fontSize, setFontSize] = useState(selectedDesign.fontSize);
  const [fontFamily, setFontFamily] = useState(selectedDesign.fontFamily);

  const fonts = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Impact', 'Comic Sans MS', 'Palatino'];

  useEffect(() => {
    setText(selectedDesign.content);
    setColor(selectedDesign.color);
    setFontSize(selectedDesign.fontSize);
    setFontFamily(selectedDesign.fontFamily);
  }, [selectedDesign]);

  const handleSave = () => {
    onUpdateText({
      ...selectedDesign,
      content: text,
      color,
      fontSize: parseInt(fontSize),
      fontFamily,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Text Settings</h3>
      
      <div className="space-y-4">
        {/* Text content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Color picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 cursor-pointer"
              />
              <span className="text-sm">{color}</span>
            </div>
          </div>

          {/* Font family */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {fonts.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Font size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Font Size: {fontSize}px</label>
          <input
            type="range"
            min="10"
            max="72"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="w-full accent-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={onBringToFront}
            className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 text-sm font-medium transition"
          >
            Front
          </button>
          <button
            onClick={onSendToBack}
            className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 text-sm font-medium transition"
          >
            Back
          </button>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={onDelete}
            className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium transition"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm font-medium transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;