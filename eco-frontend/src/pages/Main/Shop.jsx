import { Footer, CartProduct, Loading } from '../../components/imports.jsx';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slice/ProductsShopSlice.js';
import "./shop.css"

function Shop() {
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.shop);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



  const navigate = useNavigate();

  // Navigate to product details
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  // Filter products based on selected type and category
  const filteredProducts = products?.data ? products.data.filter((product) =>
    (!selectedProductType || product.productType === selectedProductType) &&
    (!selectedCategory || product.category === selectedCategory)
  )
    : [];

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Scroll to top when page changes
  useEffect(() => {
    window.scroll(0, 0);
  }, [currentProducts]);


  // Handle filter changes
  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1); // Reset pagination
  };


  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5 my-10 w-full">

        {/* Filter Section */}
        <div className="flex flex-col md:flex-row justify-start items-center w-[85%] md:w-[90%] lg:w-[80%] h-auto bg-blue-500 rounded-3xl text-white text-lg p-4 gap-5">
          <div className="flex items-center gap-2">
            <label className="text-lg font-semibold">Products:</label>
            <select
              className="bg-white rounded-full w-40 h-9 text-gray-900 px-3 font-normal"
              value={selectedProductType}
              onChange={handleFilterChange(setSelectedProductType)}
            >
              <option value="">All</option>
              <option value="ClaTshirts">Classic Tshirts</option>
              <option value="OvTshirts">Oversize Tshirts</option>
              <option value="ClaHoodies">Classic Hoodies</option>
              <option value="OvHoodies">Oversize Hoodies</option>
              <option value="Caps">Caps</option>
              <option value="Mugs">Mugs</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-lg font-semibold">Categories:</label>
            <select
              className="bg-white rounded-full w-40 h-9 text-black px-3"
              value={selectedCategory}
              onChange={handleFilterChange(setSelectedCategory)}
            >
              <option value="">All</option>
              <option value="Anime">Anime</option>
              <option value="Sport">Sport</option>
              <option value="Music">Music</option>
              <option value="superCars">Super Cars</option>
              <option value="MoviesAndSeries">Movies & Series</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex flex-col justify-between items-center w-full h-auto">
          {loading ? <Loading /> :
            <div className="grid w-full md:w-[95%] lg:w-[85%] grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center gap-4 justify-items-center">
              {currentProducts.map(({ _id, imageUrls, title, price }) => (
                <CartProduct
                  key={_id}
                  id={_id}
                  title={title}
                  frontMockups={imageUrls.frontMockups ? `${imageUrls.frontMockups}` : null}
                  backMockups={imageUrls.backMockups ? `${imageUrls.backMockups}` : null}
                  price={price}
                  viewProduct={() => handleProductClick(_id)}
                />
              ))}
            </div>}


          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {/* Previous Button */}
              <button
                className={`px-2 py-2 rounded-lg text-lg ${currentPage === 1 ? "bg-gray-300 text-black cursor-not-allowed" : "bg-blue-500 text-white"
                  }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <GrFormPrevious />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-300 hover:bg-gray-300 duration-100"
                    }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                className={`px-2 py-2 rounded-lg text-lg ${currentPage === totalPages ? "bg-gray-300 text-black cursor-not-allowed" : "bg-blue-600 text-white"
                  }`}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <GrFormNext />
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Shop;
