import { IoMdAddCircle, IoMdClose, IoMdSearch } from "react-icons/io";
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
  const [resetFormKey, setResetFormKey] = useState(0);
  const [filter, setFilter] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

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

  const troggleForm = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleProductsChange = () => {
    troggleForm();
    dispatch(fetchProducts());
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(product => {
        const matchesTitle = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTags = product.tags?.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return matchesTitle || matchesTags;
      });
    }

    // Rest of your sorting logic remains the same
    switch (filter) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "highest-rated":
        filtered.sort((a, b) => b.ratingAvg - a.ratingAvg);
        break;
      case "lowest-price":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "highest-price":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  };

  // Pagination logic
  const filteredProducts = getFilteredProducts();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="w-full">
      {/* Add Product Popup */}
      {isPopupOpen && (
        <AddProductsForm
          key={resetFormKey}
          troggleForm={troggleForm}
          onSuccess={handleProductsChange}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full bg-white rounded-lg shadow-sm p-4 my-2 gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-gray-900">Total Products</h1>
            <p className="text-xl font-semibold text-gray-500">
              {products?.length || 0}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoMdSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
                className="block w-full pl-10 pr-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="relative w-full md:w-auto">
              <label htmlFor="filter" className="sr-only">Filter</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="highest-price">Highest Price</option>
              </select>
            </div>

            <button
              onClick={troggleForm}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg px-4 py-2 font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg w-full md:w-auto justify-center"
            >
              <IoMdAddCircle className="text-xl" />
              <span>Add Product</span>
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex flex-col justify-between items-center w-full h-auto">
        {currentProducts?.length > 0 ? (
          <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-4 justify-items-center">
            {currentProducts?.map(({ _id, imageUrls, title, price, ratingAvg }) => (
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
                ratingAvg={ratingAvg}
              />
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-10 text-gray-500">
            No products found
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > productsPerPage && (
        <div className="flex justify-center items-center gap-2 my-6">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-md ${currentPage === number ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default DashProducts;