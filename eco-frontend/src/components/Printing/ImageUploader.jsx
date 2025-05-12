// components/ImageUploader.jsx
import React, {useState, useEffect} from 'react';

const ImageUploader = ({ selectedDesign, onUpdateImage, onDelete, onBringToFront, onSendToBack }) => {
  const [scale, setScale] = useState(selectedDesign.scale || 1);
  const [width, setWidth] = useState(selectedDesign.width || 200);

  useEffect(() => {
    if (selectedDesign.scale !== scale || selectedDesign.width !== width) {
      setScale(selectedDesign.scale || 1);
      setWidth(selectedDesign.width || 200);
    }
  }, [selectedDesign]);

  const handleSave = () => {
    onUpdateImage({
      ...selectedDesign,
      scale,
      width,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Image Settings</h3>
      
      <div className="space-y-4">
        {/* Size control */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Width (px)</label>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value))}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Small</span>
            <span>{width}px</span>
            <span>Large</span>
          </div>
        </div>

        {/* Scale control */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Scale</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Small</span>
            <span>{scale.toFixed(1)}x</span>
            <span>Large</span>
          </div>
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

export default ImageUploader;