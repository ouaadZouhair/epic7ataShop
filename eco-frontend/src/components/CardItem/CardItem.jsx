import { FaTrashAlt } from "react-icons/fa";
import { removeFromCart } from '../../redux/slice/CartShippingSlice';
import { useDispatch } from 'react-redux';

const CardItem = ({item}) => {

    const dispatch = useDispatch();
    const BASE_URL = 'http://localhost:3000';
    console.log(item)

    const removeItem = async ({ id, color, size }) => {
        try {
            console.log(id, color ,size)
            await dispatch(removeFromCart({ id, color, size })).unwrap(); // Use .unwrap() to handle the promise
            console.log("Item removed successfully");
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    };


    return (
        <div className="flex justify-between items-center w-full border-b-2 h-[100px] bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-md p-3 text-white my-1">
            <div className="flex justify-start items-center gap-3">
                <img src={`${BASE_URL}${item.imageUrls.frontMockups}`} alt={item.title} className="w-20 h-20 rounded-lg" />
                <div>
                    <h1 className="text-sm font-semibold w-32">{item.title}</h1>
                    <h1 className="text-gray-300 text-lg font-light">{item.quantity} x {item.price} Dh</h1>
                </div>
            </div>
            <div className='flex flex-col justify-between items-center gap-2'>
                <span className={`w-7 h-7 ${item.color} rounded-lg border border-white`}></span>
                <span className='w-7 h-7 rounded-log border rounded-lg text-center border-white text-white'>{item.size}</span>
            </div>
            <button onClick={() => removeItem({id:item._id, color:item.color, size: item.size})}>
                <FaTrashAlt className="text-2xl text-white hover:text-red-500 duration-100" />
            </button>
        </div>
    )
}

export default CardItem