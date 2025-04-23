import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addToWishlist, removeFromWishlist } from "../../../redux/slice/WishlistSlice";
import { FaHeart, FaStar } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../../Context/AuthContext";

const CartProduct = React.memo(({ id, frontMockups, backMockups, title, price, viewProduct }) => {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist.wishlist);
    const { user } = useAuth()

    // Local state for instant UI update
    const [isExist, setIsExist] = useState(false);

    useEffect(() => {
        const exists = wishlist.some(item => item._id === id);
        setIsExist(exists);
    }, [wishlist, id]);

    const BASE_URL = "http://localhost:3000";

    const handleAddtoWishlist = async (e) => {
        e.stopPropagation();
        try {
            setIsExist(true); // Update local state instantly
            await dispatch(addToWishlist({
                productId: id,  // ✅ Ensure it's consistent with Redux state
                imageUrls: { frontMockups, backMockups },
                title,
                price
            })).unwrap();
        } catch (e) {
            console.error("Error adding to wishlist:", e);
            setIsExist(false); // Revert local state if there's an error
        }
    };

    const handleRemoveFromWishlist = async (e) => {
        e.stopPropagation();
        try {
            setIsExist(false); // Update local state instantly
            await dispatch(removeFromWishlist({ id })).unwrap();
        } catch (error) {
            console.error("Failed to remove item from wishlist:", error);
            setIsExist(true); // Revert local state if there's an error
        }
    };

    return (
        <div className='relative group w-[90%] md:w-60 lg:w-64 h-auto overflow-hidden border-2 border-transparent cursor-pointer rounded-lg' onClick={() => viewProduct(id)}>
            {/* Wishlist Button */}

            <button
                onClick={isExist ? handleRemoveFromWishlist : handleAddtoWishlist}
                className={` absolute ${user.role === 'admin' ? 'hidden' : 'block'} top-2 ${isExist ? 'right-2' : '-right-12'} z-10  group-hover:right-2 transition-all duration-150 h-10 w-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm
  `}
                aria-label={isExist ? "Remove from wishlist" : "Add to wishlist"}
            >
                {isExist ? (
                    <FaCheckCircle className="text-3xl text-green-500 hover:scale-110 transition-transform duration-100" />
                ) : (
                    <FaHeart className="text-3xl text-gray-300 hover:text-red-600 transition-colors duration-100" />
                )}
            </button>

            {/* Product Image */}
            <div className="relative overflow-hidden flex justify-center items-center w-full h-80 md:h-60 lg:h-64 group:">
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
            <div className='p-3 bg-gray-50 group-hover:bg-red-500 duration-100 h-full'>
                <h1 className='text-xl md:text-lg lg:text-base font-semibold text-black group-hover:text-white py-2 text-center'>{title}</h1>
                <div className='flex flex-row justify-between items-center px-14 md:px-8'>
                    <div className="text-xl font-medium md:text-base flex justify-center items-center gap-2 group-hover:text-white">
                        <FaStar className="text-2xl md:text-xl text-amber-400" />
                        <p>4.9</p>
                    </div>
                    <h1 className='text-2xl md:text-xl font-bold text-black group-hover:text-white'>{price} Dh</h1>
                </div>
            </div>
        </div>
    );
})

export default CartProduct;