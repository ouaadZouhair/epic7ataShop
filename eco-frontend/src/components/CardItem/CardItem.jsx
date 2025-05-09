import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { removeFromCart } from '../../redux/slice/CartShippingSlice';
import { useDispatch } from 'react-redux';

const CartItem = React.memo(({ item, viewProduct }) => {
    const dispatch = useDispatch();
    const BASE_URL = 'http://localhost:3000';
    
    const removeItem = async (e, { id, color, size }) => {
        try {
            e.stopPropagation();
            await dispatch(removeFromCart({ id, color, size })).unwrap();
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    };

    const colorClasses = {
        white: 'bg-gray-50',
        black: 'bg-black',
        blue: 'bg-blue-600',
        red: 'bg-red-500',
        orange: 'bg-orange-400',
        yellow: 'bg-yellow-400',
        green: 'bg-green-500',
        purple: 'bg-purple-500',
        gray: 'bg-gray-300'
    };

    return (
        <div 
            className="relative flex items-center gap-4 bg-white p-3 hover:bg-gray-50 transition-all duration-150 cursor-pointer"
            onClick={viewProduct}
        >
            <img 
                src={`${BASE_URL}${item.imageUrls.frontMockups}`} 
                alt={item.title} 
                className="h-20 w-20 rounded-lg object-cover border border-gray-200" 
            />
            
            <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-gray-900 truncate">{item.title}</h3>
                <p className="text-sm text-gray-500">
                    {item.quantity} × {item.price} Dh
                </p>
                <div className="flex gap-2 mt-1">
                    <div 
                        className={`h-5 w-5 rounded-full border border-gray-200 ${colorClasses[item.color] || 'bg-gray-100'}`}
                        title={item.color}
                    ></div>
                    <span className="text-sm text-gray-500">Size: {item.size === 'STD' ? 'Standard' : item.size}</span>
                </div>
            </div>
            
            <button 
                onClick={(e) => removeItem(e, {id: item._id, color: item.color, size: item.size})}
                className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                aria-label="Remove item"
            >
                <FaTrashAlt className="text-2xl md:text-3xl" />
            </button>
        </div>
    );
});

export default CartItem;