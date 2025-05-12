// components/Toolbar.jsx
import React, { useState } from 'react';

const Toolbar = ({
  onAddText,
  onUploadImage,
  onChangeGarmentColor,
  onChangeGarmentType,
  garmentColor,
  garmentType,
}) => {
  const colors = ['white', 'black', 'red', 'blue', 'green', 'yellow', 'gray'];
  const garmentTypes = ['t-shirt', 'hoodie'];
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setIsUploading(true);
    onUploadImage(e);
    setIsUploading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
      <div className="flex flex-wrap items-center gap-6">
        {/* Garment type selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Garment Type</label>
          <div className="flex gap-2">
            {garmentTypes.map((type) => (
              <button
                key={type}
                onClick={() => onChangeGarmentType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  garmentType === type 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Color selector */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => onChangeGarmentColor(color)}
                className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                  garmentColor === color ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                } ${color === 'white' ? 'border border-gray-300' : ''}`}
                style={{ 
                  backgroundColor: color === 'black' ? '#111827' : color,
                }}
                title={color.charAt(0).toUpperCase() + color.slice(1)}
              />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 ml-auto">
          <button
            onClick={onAddText}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium transition flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Add Text
          </button>

          <label className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 text-sm font-medium transition flex items-center gap-2 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            {isUploading ? 'Uploading...' : 'Upload Design'}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;