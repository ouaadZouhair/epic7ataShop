import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addToWishlist, removeFromWishlist } from "../../../redux/slice/WishlistSlice";
import { removeProduct } from '../../../redux/slice/ProductsShopSlice';
import { FaHeart, FaStar } from "react-icons/fa6";
import { FaCheckCircle, FaTrashAlt, FaPen } from "react-icons/fa";
import { useAuth } from "../../../Context/AuthContext";
import { EditProductForm } from '../../imports';
import { useNavigate } from 'react-router-dom';
import { DeleteConfi } from '../../imports.jsx'

const CartProduct = React.memo(({ id, frontMockups, backMockups, title, price, viewProduct, ratingAvg }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const wishlist = useSelector(state => state.wishlist.wishlist);
    const { user } = useAuth()

    const [isExist, setIsExist] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        setShowDeleteConfirm(true);
    };

    useEffect(() => {
        const exists = wishlist.some(item => item._id === id);
        setIsExist(exists);
    }, [wishlist, id]);

    const BASE_URL = "http://localhost:3000";

    const handleAddtoWishlist = async (e) => {
        e.stopPropagation();
        try {
            setIsExist(true);
            await dispatch(addToWishlist({
                productId: id,
                imageUrls: { frontMockups, backMockups },
                title,
                price
            })).unwrap();
        } catch (e) {
            console.error("Error adding to wishlist:", e);
            setIsExist(false);
        }
    };

    const handleRemoveFromWishlist = async (e) => {
        e.stopPropagation();
        try {
            setIsExist(false);
            await dispatch(removeFromWishlist(id)).unwrap();
        } catch (error) {
            console.error("Failed to remove item from wishlist:", error);
            setIsExist(true);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await dispatch(removeProduct(id)).unwrap();
        } catch (err) {
            console.error("Failed to remove product", err);
        } finally {
            setShowDeleteConfirm(false);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    const handleEditProduct = (e) => {
        e.stopPropagation();
        setShowEditForm(true);
    }

    const handleCloseEditForm = () => {
        setShowEditForm(false);
    }

    return (
        <>
            <div 
                className='relative rounded-xl w-full h-full shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg'
                onClick={() => viewProduct(id)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                

                {/* Wishlist Button */}
                {user?.role !== 'admin' && (
                    <button
                        onClick={isExist ? handleRemoveFromWishlist : handleAddtoWishlist}
                        className={`absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 ${
                            isHovered || isExist ? 'opacity-100' : 'opacity-0'
                        }`}
                        aria-label={isExist ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        {isExist ? (
                            <FaCheckCircle className="text-3xl md:text-2xl text-green-500 hover:scale-110 transition-transform" />
                        ) : (
                            <FaHeart className="text-3xl md:text-2xl text-gray-500 hover:text-red-600 transition-colors" />
                        )}
                    </button>
                )}

                {/* Admin Controls */}
                {user?.role === 'admin' && (
                    <div className={`absolute top-3 right-3 z-10 flex flex-col gap-3 p-2  transition-all duration-200 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                        <button 
                            className='text-gray-600 hover:text-red-500 transition-colors'
                            onClick={handleRemoveClick}
                        >
                            <FaTrashAlt className="text-3xl md:text-2xl" />
                        </button>
                        <button 
                            className='text-gray-600 hover:text-blue-500 transition-colors'
                            onClick={handleEditProduct}
                        >
                            <FaPen className="text-3xl md:text-2xl" />
                        </button>
                    </div>
                )}

                {/* Product Image */}
                <div className="relative w-full aspect-square overflow-hidden">
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
                <div className='p-4 bg-white'>
                    <h1 className='text-base text-center font-semibold text-gray-900 line-clamp-2 mb-2'>{title}</h1>
                    <div className='flex justify-between items-center'>
                        <div className="flex items-center gap-1">
                            <FaStar className="text-amber-400" />
                            <span className="text-sm font-medium text-gray-700">{ratingAvg || '0.0'}</span>
                        </div>
                        <span className='text-lg font-bold text-blue-600'>{price} Dh</span>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            {showDeleteConfirm && (
                <DeleteConfi 
                    onCancel={handleCancelDelete} 
                    onDelete={handleConfirmDelete} 
                    title={title}
                />
            )}

            {/* Edit Product Form */}
            {showEditForm && (
                <EditProductForm
                    productId={id}
                    onClose={handleCloseEditForm}
                />
            )}
        </>
    );
})

export default CartProduct;