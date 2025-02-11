import './TopSellsSlider.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../slice/CartShippingSlice';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMemo } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import CartProduct from '../CartProduct/CartProduct';

const TopSellsSlider = ({ products = [] }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Memoize Top Selling Products
    const TopSelling = useMemo(() => products.filter(product => product.isTopSelling), [products]);

    const handleAddToCart = (product) => {
        dispatch(addItem({ ...product, quantity: 1 }));
    };

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="carts__container">
            {/* Section Title */}
            <div className='relative w-full flex justify-between items-center py-3 border-b-[3px] border-gray-200 after:content-[""] after:bg-amber-400 after:w-full md:after:w-2/4 after:h-[3px] after:rounded-full after:absolute after:-bottom-[2px] after:left-1/2 after:-translate-x-1/2'>
                <h1 className='text-3xl font-medium text-center w-full'>Best Selling Products</h1>
            </div>

            {/* Swiper Slider */}
            <Swiper
                modules={[Navigation]}
                loop={true}
                spaceBetween={0}
                slidesPerView={4}
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
                {TopSelling.map(({ id, title, backMockups, frontMockups, price }) => (
                    <SwiperSlide key={id}>
                        <CartProduct
                            title={title}
                            backImg={backMockups}
                            frontImg={frontMockups}
                            price={price}
                            onClick={() => handleProductClick(id)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopSellsSlider;
