import CartProduct from '../Product/CartProduct/CartProduct';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useCallback, useEffect, useMemo } from 'react';
import { fetchProducts } from '../../redux/slice/ProductsShopSlice';
import 'swiper/css';
import 'swiper/css/autoplay';

const FeaturedProducts = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.shop);

    // Fetch products on mount
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Memoized list of new products
    const NewProducts = useMemo(() => {
        if (!Array.isArray(products)) return [];
        return products.filter(product => product?.isNewPr);
    }, [products]);

    // Memoized navigation function
    const handleProductClick = useCallback((id) => {
        navigate(`/product/${id}`);
    }, [navigate]);

    if (loading) {
        return (
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse space-y-8">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="bg-white rounded-lg shadow overflow-hidden">
                                    <div className="aspect-square bg-gray-200"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="ml-3 text-sm text-red-700">Error loading featured products. Please try again later.</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (NewProducts.length === 0) {
        return (
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-block p-4 bg-yellow-50 rounded-full mb-4">
                        <svg className="h-12 w-12 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No featured products available</h3>
                    <p className="text-gray-500">Check back later for new arrivals</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-1">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-10 relative">
                    <h2 className="text-4xl font-bold text-gray-900 inline-block relative">
                        New Arrivals
                        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-amber-500 rounded-full"></span>
                    </h2>
                    <p className="mt-3 text-gray-600">Discover our latest products</p>
                </div>

                {/* Product Slider */}
                <div className="relative">
                    <Swiper
                        key={NewProducts.length}
                        modules={[Autoplay]}
                        loop={NewProducts.length > 4}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        spaceBetween={24}
                        slidesPerView={1}
                        navigation
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 4 },
                        }}
                        className="px-2 py-6"
                    >
                        {NewProducts.map(({ _id, price, title, imageUrls, ratingAvg }) => (
                            <SwiperSlide key={_id} className="pb-10">
                                <CartProduct
                                    id={_id}
                                    title={title}
                                    backMockups={imageUrls.backMockups ? `${imageUrls.backMockups}` : null}
                                    frontMockups={imageUrls.frontMockups ? `${imageUrls.frontMockups}` : null}
                                    price={price}
                                    ratingAvg={ratingAvg}
                                    viewProduct={() => handleProductClick(_id)}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;