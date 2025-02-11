import { useState } from 'react';

const ImgsProduct = ({ product }) => {
  const defaultImage = '/placeholder.png'; // Fallback image
  const [currentImage, setCurrentImage] = useState(product.frontMockups || defaultImage);

  return (
    <div className="flex flex-col md:flex-row-reverse justify-center items-center md:items-start my-5 w-full md:w-[700px] lg:w-[60%]">
      {/* Main Image */}
      <img
        src={currentImage}
        alt={product.title || 'Product image'}
        className="w-full max-w-[400px] md:max-w-[530px] aspect-square border-2 border-gray-100 rounded-lg object-cover"
      />

      {/* Small Thumbnails */}
      <div className="flex md:flex-col flex-wrap justify-center items-center gap-2 w-full md:w-auto mt-3 md:mt-0">
        {product.frontMockups && (
          <img
            src={product.frontMockups}
            alt={`${product.title || 'Product'} Front`}
            className="w-[80px] sm:w-[100px] md:w-[130px] lg:w-[140px] aspect-square border-2 border-gray-100 hover:shadow-lg hover:scale-105 duration-100 cursor-pointer object-cover"
            onClick={() => setCurrentImage(product.frontMockups)}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setCurrentImage(product.frontMockups)}
          />
        )}
        {product.backMockups && (
          <img
            src={product.backMockups}
            alt={`${product.title || 'Product'} Back`}
            className="w-[80px] sm:w-[100px] md:w-[130px] lg:w-[140px] aspect-square border-2 border-gray-100 hover:shadow-lg hover:scale-105 duration-100 cursor-pointer object-cover"
            onClick={() => setCurrentImage(product.backMockups)}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setCurrentImage(product.backMockups)}
          />
        )}
      </div>
    </div>
  );
};

export default ImgsProduct;
