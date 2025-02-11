import './FeaturedProducts.css';
import CartProduct from '../CartProduct/CartProduct';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const FeaturedProducts = ({ products }) => {
    const navigate = useNavigate();

    const NewProducts = products.filter(product => product.isNew);

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div className="carts__container">
            {/* Section Title */}
            <div className='relative w-full flex justify-between items-center py-3 border-b-[3px] border-gray-200 after:content-[""] after:bg-amber-400 after:w-full md:after:w-2/4 after:h-[3px] after:rounded-full after:absolute after:-bottom-[2px] after:left-1/2 after:-translate-x-1/2'>
                <h1 className='text-3xl font-semibold text-center w-full'>Featured Products</h1>
            </div>

            {/* Swiper Slider */}
            <Swiper
                modules={[Navigation]}
                loop
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
                className='my-14 w-full'
            >
                {NewProducts.map(({ id, price, title, backMockups, frontMockups }) => (
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

export default FeaturedProducts;
