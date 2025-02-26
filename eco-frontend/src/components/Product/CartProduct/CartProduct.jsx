import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { storeWishlist, addItemToWishlist, removeItemFromWishlist } from "../../../redux/slice/WishlistSlice";
import { FaHeart } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";



const CartProduct = ({ id, frontImg, backImg, title, price, originalPrice, onClick }) => {

    const dispatch = useDispatch();

    const wishlist = useSelector(state => state.wishlist.wishlist)

    const isExist = useMemo(() => wishlist.some(item => item.id === id), [wishlist, id]);



    const handleAddtoWishlist = async (e) => {
        e.stopPropagation();
        try {
            await Promise.all([
                dispatch(addItemToWishlist({ id, frontImg, title })),
                dispatch(storeWishlist({ productId: id }))
            ]);
        } catch (e) {
            console.error("Error adding to wishlist:", e);
        }
    };

    const handleRemoveFromWishlist = async (e) => {
        e.stopPropagation();
        try {
            await dispatch(removeItemFromWishlist({ id }));
        } catch (error) {
            console.error("Failed to remove item from wishlist:", error);
        }
    }

    return (
        <div
            className='relative group w-96 md:w-60 lg:w-64 h-auto rounded-2xl overflow-hidden border-2 border-gray-200 cursor-pointer'
            onClick={onClick}
        >
            <button onClick={(!isExist) ? handleAddtoWishlist : handleRemoveFromWishlist} className="absolute top-2 -right-12 z-10 group-hover:right-2 duration-150 h-10 w-10 p-2 rounded-full">
                {isExist ?
                    (<FaCheckCircle className="text-3xl text-green-500 cursor-pointer hover:scale-110 duration-100" />)
                    :
                    (<FaHeart className="text-3xl text-gray-500 cursor-pointer hover:text-red-600 duration-100" />)}

            </button>

            {/* Product Image */}
            <div className="relative flex justify-center items-center w-full h-80 md:h-60 lg:h-64 group:">
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
