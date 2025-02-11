
import logo from "../../assets/epic7ata-logo.png";
import { FaXmark } from "react-icons/fa6";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const BurgerMenu = ({ visibility, onClose }) => {
    return (
        <div className={`h-screen fixed z-50 top-0 left-0 ${visibility ? 'w-full' : "w-0"} transition-all duration-500`}>
            {/* Overlay */}
            <div
                className={`absolute bg-black/20 w-full h-screen z-30 backdrop-blur-md top-0 ${visibility ? "left-0" : "-left-full"
                    } transition-all ease-in-out duration-300`}
                onClick={onClose} // Close the cart when clicking on the overlay
            ></div>

            {/* Menu Content */}
            <div
                className={`flex flex-col  items-center absolute h-screen w-full md:w-[450px] lg:w-[400px] bg-slate-50 top-0 z-40 ${visibility ? "left-0" : "-left-[1000px]"
                    } transition-all duration-500`}
            >
                <div className="flex justify-between px-5 items-center w-full h-10 py-10">
                    <img src={logo} className="w-12 h-12" alt="Brand logo"/>
                    <h1 className="text-2xl md:text-3xl font-semibold ">Menu</h1>
                    <FaXmark className="text-3xl md:text-4xl hover:text-red-500 duration-100" onClick={onClose}/>
                </div>
                
                <div className="w-full h-[60%] py-4 flex flex-col justify-around items-center text-xl md:text-2xl font-semibold border-t-2 border-gray-200 ">
                    <Link to='/' className="hover:bg-blue-500 hover:text-white duration-100 cursor-pointer py-5 w-[90%] text-center rounded-xl" onClick={onClose}>Home</Link>   
                    <Link to="/print" className="hover:bg-blue-500 hover:text-white duration-100 cursor-pointer py-5 w-[90%] text-center rounded-xl" onClick={onClose}>Print</Link>   
                    <Link to="/shop" className="hover:bg-blue-500 hover:text-white duration-100 cursor-pointer py-5 w-[90%] text-center rounded-xl" onClick={onClose}>Shop</Link>   
                    <Link to="/about" className="hover:bg-blue-500 hover:text-white duration-100 cursor-pointer py-5 w-[90%] text-center rounded-xl" onClick={onClose}>About</Link>   
                    <Link to="/print" className="hover:bg-blue-500 hover:text-white duration-100 cursor-pointer py-5 w-[90%] text-center rounded-xl" onClick={onClose}>Contact</Link>   
                </div>
               
            </div>

        </div>
    )
}

export default BurgerMenu