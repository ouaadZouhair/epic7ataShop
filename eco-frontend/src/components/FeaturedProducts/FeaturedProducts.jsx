import './FeaturedProducts.css';
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
        // First check if products exists and is an array
        if (!Array.isArray(products)) return [];
        
        // Then filter for new products
        return products.filter(product => product?.isNewPr );
      }, [products]);
    
    console.log(NewProducts)

    // Memoized navigation function
    const handleProductClick = useCallback((id) => {
        navigate(`/product/${id}`);
    }, [navigate]);

    return (
        <div className="carts__container">
            {/* Section Title */}
            <div className='relative w-full flex justify-between items-center py-3 border-b-[3px] border-gray-200 after:content-[""] after:bg-amber-400 after:w-full md:after:w-2/4 after:h-[3px] after:rounded-full after:absolute after:-bottom-[2px] after:left-1/2 after:-translate-x-1/2'>
                <h1 className='text-3xl font-semibold text-center w-full'>New Products</h1>
            </div>

            {/* Swiper Slider */}
            <Swiper
                key={NewProducts.length}
                modules={[Autoplay]}
                loop={NewProducts.length > 4} 
                autoplay={{ delay: 5000 }}
                spaceBetween={10}
                slidesPerView={4}
                navigation
                breakpoints={{
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 4 },
                    1536: { slidesPerView: 5 },
                }}
                className='my-14 w-full p-5'
            >
                {NewProducts.map(({ _id, price, title, imageUrls, ratingAvg }, index) => (
                    <SwiperSlide key={_id || index}>
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
    );
};

export default FeaturedProducts;
