import { IoMdAddCircle, IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/slice/ProductsShopSlice.js";
import { Loading, CartProduct, AddProductsForm } from "../../../components/imports";
import { useNavigate } from "react-router-dom";

const DashProducts = () => {
  const { products, loading, error } = useSelector(state => state.shop);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [resetFormKey, setResetFormKey] = useState(0); // Add this line
  

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await dispatch(fetchProducts());
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    loadProducts();
  }, [dispatch]);

  const troggleForm = () =>{
    setIsPopupOpen(!isPopupOpen)
  }

  const handleProductsChange = () => {
    troggleForm(); // This will close the form and increment the reset key
    dispatch(fetchProducts()); // Refresh the product list
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };


  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="w-full h-[600px] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent overflow-y-scroll">
      {/* Add Product Popup */}
      {isPopupOpen && (
        <AddProductsForm
        key={resetFormKey}
        troggleForm = {troggleForm}
        onSuccess={handleProductsChange}
        />
      )}

      {/* Main Content */}
      <div className="flex justify-between items-center w-full h-[60px] bg-white rounded-lg shadow-sm p-2 my-2 px-4">
        <div className="flex justify-between items-center gap-2">
          <h1 className="text-lg font-semibold text-gray-900">Total Products</h1>
          <p className="text-xl font-semibold text-gray-500">
            {products?.length || 0}
          </p>
        </div>

        <button
          onClick={troggleForm}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg px-4 py-2 font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
        >
          <IoMdAddCircle className="text-xl" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="flex flex-col justify-between items-center w-full h-auto">
        {products?.length > 0 ? (
          <div className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center gap-4 justify-items-center">
            {products?.map(({ _id, imageUrls, title, price }) => (
              <CartProduct
                key={_id}
                id={_id}
                title={title}
                frontMockups={
                  imageUrls.frontMockups ? `${imageUrls.frontMockups}` : null
                }
                backMockups={
                  imageUrls.backMockups ? `${imageUrls.backMockups}` : null
                }
                price={price}
                viewProduct={() => handleProductClick(_id)}
                
              />
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-10 text-gray-500">
            No products found
          </div>
        )}
      </div>
    </section>
  );
};

export default DashProducts;