import { useState, useEffect } from 'react';

const ImgsProduct = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.imageUrls.frontMockups);
  const BASE_URL = 'http://localhost:3000';

  useEffect(() => {
    setCurrentImage(product.imageUrls.frontMockups);
  }, [product])

  return (
    <div className="flex flex-col lg:px-10 justify-center items-center md:items-start my-5 w-full md:w-[700px] lg:w-[60%] md:gap-2">
      {/* Main Image */}
      <img
        src={`${BASE_URL}${currentImage}`}
        alt={product.title || 'Product image'}
        className="w-full md:mx-auto lg:mx-0 max-w-[700px] md:max-w-[700px] lg:max-w-[500px] aspect-square border-2 border-gray-100 rounded-lg object-cover"
      />

      {/* Small Thumbnails */}
      <div className="flex md:flex-row flex-wrap justify-start items-center gap-2 w-full md:w-auto mt-3 md:mt-0">
        {product.imageUrls.frontMockups && (
          <img
            src={`${BASE_URL}${product.imageUrls.frontMockups}`}
            alt={`${product.title || 'Product'} Front`}
            className="w-[100px] md:w-[200px] lg:w-[140px] aspect-square border-2 border-gray-200 hover:shadow-lg hover:scale-105 duration-100 cursor-pointer object-cover"
            onMouseOver={() => setCurrentImage(product.imageUrls.frontMockups)}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setCurrentImage(product.imageUrls.frontMockups)}
          />
        )}
        {product.imageUrls.backMockups && (
          <img
          src={`${BASE_URL}${product.imageUrls.backMockups}`}
            alt={`${product.title || 'Product'} Back`}
            className="w-[100px] md:w-[200px] lg:w-[140px] aspect-square border-2 border-gray-200 hover:shadow-lg hover:scale-105 duration-100 cursor-pointer object-cover"
            onMouseOver={() => setCurrentImage(product.imageUrls.backMockups)}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setCurrentImage(product.imageUrls.backMockups)}
          />
        )}
      </div>
    </div>
  );
};

export default ImgsProduct;
