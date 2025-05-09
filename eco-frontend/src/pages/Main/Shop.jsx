import { CartProduct, Loading } from '../../components/imports.jsx';
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slice/ProductsShopSlice.js';
import "./shop.css"

function Shop() {
  const [selectedProductType, setSelectedProductType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const productsPerPage = 16;

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.shop);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleProductClick = useCallback((id) => {
    navigate(`/product/${id}`);
  }, [navigate]);

  const getFilteredProducts = () => {
    let filtered = [...(products || [])];

    if (selectedProductType) {
      filtered = filtered.filter(product => product.productType === selectedProductType);
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product => {
        const matchesTitle = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTags = product.tags?.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return matchesTitle || matchesTags;
      });
    }

    switch (filter) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "highest-rated":
        filtered.sort((a, b) => (b.ratingAvg || 0) - (a.ratingAvg || 0));
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

  const filteredProducts = getFilteredProducts();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentProducts]);

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Our Collection</h1>
        <p className="text-gray-600 mt-2">Discover our premium selection of products</p>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        {/* <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div> */}

        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedProductType}
                onChange={handleFilterChange(setSelectedProductType)}
              >
                <option value="">All Types</option>
                <option value="Classic-tshirt">Classic Tshirts</option>
                <option value="Oversize-tshirt">Oversize Tshirts</option>
                <option value="Classic-hoodie">Classic Hoodies</option>
                <option value="Oversize-hoodie">Oversize Hoodies</option>
                <option value="Caps">Caps</option>
                <option value="Mugs">Mugs</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedCategory}
                onChange={handleFilterChange(setSelectedCategory)}
              >
                <option value="">All Categories</option>
                <option value="Anime">Anime</option>
                <option value="Sport">Sport</option>
                <option value="Music">Music</option>
                <option value="SuperCars">Super Cars</option>
                <option value="Movies&Series">Movies & Series</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="newest">Newest Arrivals</option>
                <option value="oldest">Oldest First</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="lowest-price">Price: Low to High</option>
                <option value="highest-price">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : (
          <>
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map(({ _id, imageUrls, title, price, ratingAvg }) => (
                    <CartProduct
                      key={_id}
                      id={_id}
                      title={title}
                      frontMockups={imageUrls.frontMockups ? `${imageUrls.frontMockups}` : null}
                      backMockups={imageUrls.backMockups ? `${imageUrls.backMockups}` : null}
                      price={price}
                      viewProduct={() => handleProductClick(_id)}
                      ratingAvg={ratingAvg}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <nav className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                      >
                        <GrFormPrevious className="inline" />
                      </button>

                      {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}`}
                        >
                          {index + 1}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                      >
                        <GrFormNext className="inline" />
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-yellow-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                <button
                  onClick={() => {
                    setSelectedProductType('');
                    setSelectedCategory('');
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Reset filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Shop;