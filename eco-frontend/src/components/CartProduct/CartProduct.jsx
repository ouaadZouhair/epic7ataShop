import { FaCartPlus } from "react-icons/fa";

const CartProduct = ({ frontImg, backImg, title, price, originalPrice, onClick }) => {
    return (
        <div
            className='group w-96 md:w-60 lg:w-64 h-auto rounded-2xl overflow-hidden border-2 border-gray-200 cursor-pointer'
            onClick={onClick}
        >
            {/* Product Image */}
            <div className="relative flex justify-center items-center w-full h-80 md:h-60 lg:h-64">
                {backImg && (
                    <img className="absolute w-full h-full object-cover" src={backImg} alt={title} />
                )}
                <img
                    className={`absolute w-full h-full object-cover  ${backImg ? "hover:opacity-0 duration-150" : ""}`}
                    src={frontImg}
                    alt={title}
                />
            </div>

            {/* Product Info */}
            <div className='p-3 bg-black/95 group-hover:bg-red-500 duration-100 h-full'>

                <h1 className='text-base font-semibold text-white py-2 text-center'>{title}</h1>
                <div className='flex justify-between items-center px-8'>

                    <h1 className='text-base font-normal text-gray-300 line-through'>
                        {230} Dh
                    </h1>

                    <h1 className='text-2xl font-bold text-white'>{price} Dh</h1>
                </div>

            </div>
        </div>
    );
};

export default CartProduct;
