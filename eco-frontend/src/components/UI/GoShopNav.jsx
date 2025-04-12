import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const GoShopNav = () => {

    const navigate = useNavigate();
    
    return (
        <nav className="border-b-2 border-gray-100 top-0 w-full h-14 flex justify-between items-center text-white bg-white px-4 mb-5">
            <button className="flex items-center group gap-2 bg-transparent text-gray-500 group" onClick={() => navigate('/shop')}>
                <FaArrowLeft className="text-xl group-hover:text-3xl group-hover:text-blue-600 duration-100" />
                <span className="text-lg font-base group-hover:font-semibold group-hover:text-blue-600 duration-100">Continue Shopping</span>
            </button>
        </nav>
    )
}

export default GoShopNav