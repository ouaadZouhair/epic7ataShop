import './TopSellsSlider.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMemo, useCallback } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import CartProduct from '../../Product/CartProduct/CartProduct';

const TopSellsSlider = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector(state => state.shop);
     const BASE_URL = "http://localhost:3000";


    // Memoize Top Selling Products with safe optional chaining
    const TopSelling = useMemo(() => products?.data?.filter(product => product.isFavPr) || [], [products]);

    // const handleAddToCart = useCallback((product) => {
    //     dispatch(addItem({ ...product, quantity: 1 }));
    // }, [dispatch]);

    const handleProductClick = useCallback( (_id) => {
        navigate(`/product/${_id}`);
    }, [navigate]);


    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="carts__container">
            {/* Section Title */}
            <div className='relative w-full flex justify-between items-center py-3 border-b-[3px] border-gray-200 after:content-[""] after:bg-amber-400 after:w-full md:after:w-2/4 after:h-[3px] after:rounded-full after:absolute after:-bottom-[2px] after:left-1/2 after:-translate-x-1/2'>
                <h1 className='text-3xl font-medium text-center w-full'>Most Favorite Products</h1>
            </div>

            {/* Swiper Slider */}
            <Swiper
                modules={[Navigation, Autoplay]}
                loop={true}
                spaceBetween={0}
                slidesPerView={4}
                autoplay={{ delay: 3000 }}
                navigation
                breakpoints={{
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 4 },
                    1536: { slidesPerView: 5 },
                }}
                className='my-14 w-full'
            >
                {TopSelling.map(({ _id, title, imageUrls, price }) => (
                    <SwiperSlide key={_id}>
                        <CartProduct
                            title={title}
                            backImg={imageUrls.backMockups ? `${BASE_URL}${imageUrls.backMockups}` : null}
                            frontImg={imageUrls.frontMockups ? `${BASE_URL}${imageUrls.frontMockups}` : null}
                            price={price}
                            onClick={() => handleProductClick(_id)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopSellsSlider;
