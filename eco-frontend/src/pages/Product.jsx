import axios from "axios";
import { ImgsProduct, DetailsProduct, InfoProduct, Footer } from "../components/imports.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Product = () => {
  const { id } = useParams();

  // Find the product based on the URL id
  const [product, setProduct] = useState(null);
  const BASE_URL = "http://localhost:3000";


  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/products/${id}`);
  
        // Ensure images have full URLs
        const productData = res.data.product;
        if (productData.imageUrls) {
          productData.imageUrls.frontMockups = productData.imageUrls.frontMockups 
            ? `${BASE_URL}${productData.imageUrls.frontMockups}`
            : null;
  
          productData.imageUrls.backMockups = productData.imageUrls.backMockups 
            ? `${BASE_URL}${productData.imageUrls.backMockups}`
            : null;
        }
  
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
  
    fetchProduct();
  }, [id]);
  
  useEffect(() =>{
    window.scrollTo(0, 0);
  }, [])

  // If no product is found
  if (!product) {
    return <h1>Product not found</h1>;
  }


  return (
    <>
      <main className="relative flex flex-col lg:flex-row justify-center items-center w-[95%] h-auto mx-auto my-2 gap-1 lg:gap-5">
       
        {/* Large Image */}
        <ImgsProduct product={product}/>

        {/* Product Details */}
        <DetailsProduct product={product}/>

        {/* Product Info */}
      </main>
        <InfoProduct product={product}/>
      <Footer />
    </>
  );
};

export default Product;
