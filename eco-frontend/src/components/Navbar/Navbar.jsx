import logo from '../../assets/epic7ata-logo.png';
import CardShipping from "../CardShipping/CardShipping";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import BurgerMenu from '../BurgerMenu/BurgerMenu';



const Navbar = () => {
    const [cardCounter, setCardCounter] = useState(0)
    const [isCardShippingVisible, setIsCardShippingVisible] = useState(0);
    const [isMenuVisible, setIsMenuVisible] = useState(0);

    const openShippingCard = () => setIsCardShippingVisible(true);
    const closeShippingCard = () => setIsCardShippingVisible(false);

    const openMenu = () => setIsMenuVisible(true);
    const closeMenu = () => setIsMenuVisible(false);

    const handleCartCounter = (data) => {
        setCardCounter(data)
    }

    return (
        <nav className="flex justify-around md:justify-center md:gap-5 items-center px-7 md:px-0 w-full py-3 z-50">

            <button className=' flex justify-center items-center w-10 h-10 border-2 rounded-xl text-2xl border-black p-1 hover:bg-black hover:text-white duration-100 lg:hidden' onClick={openMenu}>
              <FiMenu/>
            </button>

            <div className=" w-[40px] h-auto hidden lg:block">
                <img src={logo} className="h-full w-full" />
            </div>

            <ul className=" w-1/3 justify-around font-semibold text-lg hidden lg:flex">
                <li className="relative hover:text-blue-500 duration-200 after:content-[''] after:h-1 after:w-0 after:bg-blue-500 after:absolute after:-bottom-2 after:left-0 after:rounded-full after:hover:w-full after:duration-200">
                    <Link to='/'>Home</Link>
                </li>
                <li className="relative hover:text-blue-500 duration-200 after:content-[''] after:h-1 after:w-0 after:bg-blue-500 after:absolute after:-bottom-2 after:left-0 after:rounded-full after:hover:w-full after:duration-200">
                    <Link to="/shop">Shop</Link>
                </li>
                <li className="relative hover:text-blue-500 duration-200 after:content-[''] after:h-1 after:w-0 after:bg-blue-500 after:absolute after:-bottom-2 after:left-0 after:rounded-full after:hover:w-full after:duration-200">
                    <Link to='/print'>Print</Link>
                </li>
                <li className="relative hover:text-blue-500 duration-200 after:content-[''] after:h-1 after:w-0 after:bg-blue-500 after:absolute after:-bottom-2 after:left-0 after:rounded-full after:hover:w-full after:duration-200">
                    <Link to="/about">About</Link>
                </li>
                <li className="relative hover:text-blue-500 duration-200 after:content-[''] after:h-1 after:w-0 after:bg-blue-500 after:absolute after:-bottom-2 after:left-0 after:rounded-full after:hover:w-full after:duration-200">
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>



            <div className="flex  justify-around gap-3 w-[500px]">
                <form className="form relative hidden lg:block">
                    <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">

                        <IoSearch className="w-5 h-5 text-gray-700" />
                    </button>
                    <input className="input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md" placeholder="Search..." required type="text" />
                    <button type="reset" className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
                        <FaXmark className="w-6 h-6 text-gray-700 hover:text-red-500 duration-100" />
                    </button>
                </form>


                <div className="hidden lg:flex gap-5">
                    <Link to="/signup" className="flex justify-center items-center text-gray-700 text-lg font-semibold duration-100">Sign up</Link>
                    <Link to='/login' className="flex justify-center items-center text-gray-700 text-lg font-semibold duration-100">Log in</Link>
                </div>

            </div>
            <button className=" relative text-4xl hover:text-blue-500 duration-100 " onClick={openShippingCard}>
                <PiShoppingCartSimpleFill />
                <div className="bg-red-500 w-[18px] h-[18px] rounded-full absolute -top-2 -right-2">
                    <span className="text-sm text-white font-semibold absolute bottom-1/2 translate-y-1/2  left-1/2 -translate-x-1/2">{cardCounter}</span>
                </div>
            </button>

            <CardShipping visibility={isCardShippingVisible} onClose={closeShippingCard} fnData={handleCartCounter} />
            <BurgerMenu visibility={isMenuVisible} onClose={closeMenu} />
        </nav>

    )
}

export default Navbar