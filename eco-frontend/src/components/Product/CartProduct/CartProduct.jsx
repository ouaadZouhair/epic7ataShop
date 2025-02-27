import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { storeWishlist, addItemToWishlist, removeItemFromWishlist, deleteWishlist } from "../../../redux/slice/WishlistSlice";
import { FaHeart } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

const CartProduct = ({ id, frontMockups, backMockups, title, price, viewProduct }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist.wishlist);

    // Local state for instant UI update
    const [isExist, setIsExist] = useState(false);

    useEffect(() => {
        setIsExist(wishlist.some(item => item._id === id));
    }, [wishlist, id]); // Re-run whenever wishlist updates

    const BASE_URL = "http://localhost:3000";

    const handleAddtoWishlist = async (e) => {
        e.stopPropagation();
        console.log(id)
        try {
            await dispatch(storeWishlist({ productId: id })).unwrap();
            dispatch(addItemToWishlist({
                _id: id, // Use _id instead of id
                imageUrls: { frontMockups, backMockups },
                title
            }));
            setIsExist(true); // Update local state instantly
        } catch (e) {
            console.error("Error adding to wishlist:", e);
        }
    };

    const handleRemoveFromWishlist = async (e) => {
        e.stopPropagation();
        try {
            await dispatch(deleteWishlist(id)).unwrap();
            dispatch(removeItemFromWishlist({ id }));
            setIsExist(false); // Update local state instantly
        } catch (error) {
            console.error("Failed to remove item from wishlist:", error);
        }
    };

    return (
        <div className='relative group w-96 md:w-60 lg:w-64 h-auto rounded-2xl overflow-hidden border-2 border-gray-200 cursor-pointer' onClick={() => viewProduct(id)}>
            <button onClick={isExist ? handleRemoveFromWishlist : handleAddtoWishlist} 
                className="absolute top-2 -right-12 z-10 group-hover:right-2 duration-150 h-10 w-10 p-2 rounded-full">
                {isExist ? 
                    (<FaCheckCircle className="text-3xl text-green-500 cursor-pointer hover:scale-110 duration-100" />)
                    :
                    (<FaHeart className="text-3xl text-gray-500 cursor-pointer hover:text-red-600 duration-100" />)}
            </button>

            {/* Product Image */}
            <div className="relative flex justify-center items-center w-full h-80 md:h-60 lg:h-64 group:">
                {backMockups && (
                    <img className="absolute w-full h-full object-cover" src={`${BASE_URL}${backMockups}`} alt={title} />
                )}
                <img
                    className={`absolute w-full h-full object-cover  ${backMockups ? "hover:opacity-0 duration-150" : ""}`}
                    src={`${BASE_URL}${frontMockups}`}
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
