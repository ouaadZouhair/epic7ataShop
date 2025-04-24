import React from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { removeFromCart } from '../../redux/slice/CartShippingSlice';
import { useDispatch } from 'react-redux';

const CardItem = React.memo(({item, viewProduct}) => {

    const dispatch = useDispatch();
    const BASE_URL = 'http://localhost:3000';
    
    const removeItem = async (e, { id, color, size }) => {
        try {
            e.stopPropagation(); // Prevent the click event from bubbling up to the parent div
            await dispatch(removeFromCart({ id, color, size })).unwrap(); // Use .unwrap() to handle the promise
            console.log("Item removed successfully");
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    };


    return (
        <div className="flex justify-between items-center w-full border-b-2 h-[100px] bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-md p-3 text-white my-1 cursor-pointer" onClick={viewProduct}>
            <div className="flex justify-start items-center gap-3">
                <img src={`${BASE_URL}${item.imageUrls.frontMockups}`} alt={item.title} className="w-20 h-20 rounded-lg" />
                <div>
                    <h1 className="text-base font-semibold w-40">{item.title}</h1>
                    <h1 className="text-gray-300 text-lg font-light">{item.quantity} x {item.price} Dh</h1>
                </div>
            </div>
            <div className='flex flex-col justify-between items-center gap-2'>
                <span className={`w-7 h-7 ${ item.color === 'white' && 'bg-gray-50'} ${ item.color === 'black' && 'bg-black'} ${ item.color === 'blue' && 'bg-blue-900'} ${ item.color === 'red' && 'bg-red-500'} ${ item.color === 'orange' && 'bg-orange-500'} ${item.color === 'yellow' && 'bg-yellow-400'} ${ item.color === 'green' && 'bg-green-600'} ${ item.color === 'purple' && 'bg-purple-500'} ${ item.color === 'gray' && 'bg-gray-300'} rounded-lg border border-white`}></span>
                <span className='w-7 h-7 rounded-log border rounded-lg text-center border-white text-white'>{item.size}</span>
            </div>
            <button onClick={(e) => removeItem(e, {id:item._id, color:item.color, size: item.size})}>
                <FaTrashAlt className="text-2xl text-white hover:text-red-500 duration-100" />
            </button>
        </div>
    )
})

export default CardItem