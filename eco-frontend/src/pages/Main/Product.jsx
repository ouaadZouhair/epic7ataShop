import axios from "axios";
import { ImgsProduct, DetailsProduct, InfoProduct, Footer, Loading } from "../../components/imports.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = "http://localhost:3000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await axios.get(`${BASE_URL}/api/v1/products/${id}`);
        
        if (res.status !== 200) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        setProduct(res.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message || "Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <div className="min-h-screen w-full flex items-center justify-center">
      <Loading />
    </div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-500">{error}</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>Product not found</h1>
      </div>
    );
  }

  return (
    <>
      <main className="relative flex flex-col lg:flex-row justify-center items-center w-[85%] h-auto mx-auto my-2 gap-1 lg:gap-3">
        <ImgsProduct product={product} />
        <DetailsProduct product={product} />
      </main>
      <InfoProduct product={product} />
      <Footer />
    </>
  );
};

export default Product;