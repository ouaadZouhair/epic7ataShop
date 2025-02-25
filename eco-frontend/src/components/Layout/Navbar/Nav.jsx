import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { IoSearch, IoLogoTiktok } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { FiMenu, FiInstagram } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { IoLogoWhatsapp, IoMdMail, IoIosHeart } from "react-icons/io";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useAuth } from "../../../Context/AuthContext.jsx";
import logo from '../../../assets/epic7ata-logo.png';
import CardItem from "../../CardItem/CardItem.jsx";
import { Profiel, Wishlist } from "../../imports.jsx";



export const Navbar = () => {
  const [cardCounter, setCardCounter] = useState(0)
  const [isCardShippingVisible, setIsCardShippingVisible] = useState(0);
  const [isMenuVisible, setIsMenuVisible] = useState(0);
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false)
  const [isOrderMenuVisible, setIsOrderMenuVisible] = useState(false)
  const { user } = useAuth()

  const openShippingCard = () => setIsCardShippingVisible(true);
  const closeShippingCard = () => setIsCardShippingVisible(false);

  const toggleProfileMenu = () => setIsProfileMenuVisible(!isProfileMenuVisible);
  const toggleOrderMenu = () => setIsOrderMenuVisible(!isOrderMenuVisible);

  const openMenu = () => setIsMenuVisible(true);
  const closeMenu = () => setIsMenuVisible(false);

  const handleCartCounter = (data) => {
    setCardCounter(data)
  }

  return (
    <nav className="flex justify-around md:justify-center md:gap-5 items-center px-7 md:px-0 w-full py-3 z-50">

      <button className=' flex justify-center items-center w-10 h-10 border-2 rounded-xl text-2xl border-black p-1 hover:bg-black hover:text-white duration-100 lg:hidden' onClick={openMenu}>
        <FiMenu />
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



        {!user ? (
          <div className="flex justify-between gap-5">
            <Link to="/signup" className="flex justify-center items-center text-gray-700 text-lg font-semibold duration-100">
              Sign up
            </Link>
            <Link to="/login" className="flex justify-center items-center text-gray-700 text-lg font-semibold duration-100">
              Log in
            </Link>
          </div>
        ) : (
          <div className="relative w-28 flex justify-between items-center">
            <button className="group" onClick={toggleProfileMenu}><FaUserAlt className="text-2xl group-hover:text-blue-600 group-hover:scale-110 duration-100" /></button>
            {isProfileMenuVisible && <Profiel data={user}/>}
            <button className="group" onClick={toggleOrderMenu}><IoIosHeart className="text-3xl group-hover:text-red-600 group-hover:scale-110 duration-100 " /></button>
            {isOrderMenuVisible && <Wishlist/>}
          </div>
        )}


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

export const TopNav = () => {
  return (
    <div className="bg-black/90 w-full h-auto py-3 md:py-0 md:h-14 flex flex-col md:flex-row justify-start md:justify-between items-center px-0 md:px-12 gap-2">
      <div>
        <span className="flex justify-between items-center gap-2">
          <TbTruckDelivery className="text-2xl md:text-3xl text-white" />
          <h3 className="text-sm md:text-lg text-white font-light">Fast and reliable delivery in all cities of Morocco</h3>
        </span>
      </div>
      <div>
        <ul className="flex justify-between items-center text-2xl text-white gap-3">
          <li className=" cursor-pointer hover:scale-125 duration-100"><IoLogoWhatsapp /></li>
          <li className=" cursor-pointer hover:scale-125 duration-100" ><IoLogoTiktok /></li>
          <li className=" cursor-pointer hover:scale-125 duration-100"><FiInstagram /></li>
          <li className=" cursor-pointer hover:scale-125 duration-100"><IoMdMail /></li>
        </ul>
      </div>
    </div>
  );
}

export const CardShipping = ({ visibility, onClose, fnData }) => {

  const [totalPrice, setTotalPrice] = useState(0)
  const [itemsQuantity, setItemsQuantity] = useState(0)
  const cardItems = useSelector(state => state.cart.items)


  // Calculate the total price and items quantity
  useEffect(() => {
    let total = 0;
    let quantity = 0;
    cardItems.forEach(item => {
      total += item.price * item.quantity;
      quantity += item.quantity;
    })
    setTotalPrice(total);
    setItemsQuantity(quantity);
    fnData(quantity)
  }, [cardItems])


  return (
    <div className={`h-screen fixed z-50 top-0 right-0 ${visibility ? 'w-full' : "w-0"} transition-all duration-500`}>
      {/* Overlay */}
      <div
        className={`absolute bg-black/20 w-full h-screen z-30 backdrop-blur-md top-0 ${visibility ? "right-0" : "-right-full"
          } transition-all ease-in-out duration-300`}
        onClick={onClose} // Close the cart when clicking on the overlay
      ></div>

      {/* Cart Content */}
      <div
        className={`absolute h-screen w-full md:w-[450px] lg:w-[400px] bg-slate-50 top-0 z-40 ${visibility ? "right-0" : "-right-[1000px]"
          } transition-all duration-500`}
      >
        <div className="flex flex-col justify-start items-center h-full px-5">
          {/* Header */}
          <div className="flex justify-between items-center w-full py-4 border-b-2 border-gray-200">
            <button onClick={onClose}>
              <FaXmark className="text-3xl hover:text-red-500 duration-100" />
            </button>
            <h1 className="text-xl font-semibold">
              My Cart <span className="text-sm text-gray-500">({itemsQuantity} items)</span>
            </h1>
            <img src={logo} alt="epic7ata logo" className="w-10 h-10" />
          </div>

          {/* Cart Items */}
          <div className="flex flex-col justify-start items-center h-[700px] md:h-[950px] lg:h-[700px] w-full gap-1 overflow-y-auto">
            {
              cardItems.length === 0 ? (
                <div className=' flex flex-col justify-center items-center  p-4 mt-4 h-[90%] gap-4'>
                  <MdRemoveShoppingCart className='text-black text-7xl' />
                  <p className="text-lg md:text-2xl lg:text-xl font-light text-black">They're any product in shipping card</p>
                </div>
              ) : (
                cardItems.map((item, i) => (
                  <CardItem
                    item={item}
                    key={i}
                  />
                ))
              )
            }
          </div>

          {/* Footer */}
          <div className="py-2 flex flex-col justify-center items-center border-t-2 gap-2 border-gray-200 w-full">
            <div className="font-semibold text-gray-950 flex justify-between items-center w-[80%]">
              <h1 className="text-xl">Total:</h1>
              <h1 className="text-xl">{totalPrice} Dh</h1>
            </div>
            <Link to='/checkout' onClick={onClose} className="bg-blue-700 py-1 md:py-3 flex justify-center items-center text-white text-lg md:text-xl border-2 border-blue-700 font-semibold w-[90%] rounded-xl hover:bg-blue-600 hover:border-blue-600 duration-100">
              Proceed to checkout
            </Link>
            <Link to='/shop' onClick={onClose} className="text-white bg-gray-950 py-1 md:py-3 flex justify-center items-center border-2 border-gray-950 text-lg md:text-xl font-semibold w-[90%] rounded-xl hover:bg-gray-900 hover:border-gray-900 hover:text-white duration-100">
              Shop more
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export const BurgerMenu = ({ visibility, onClose }) => {
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
          <img src={logo} className="w-12 h-12" alt="Brand logo" />
          <h1 className="text-2xl md:text-3xl font-semibold ">Menu</h1>
          <FaXmark className="text-3xl md:text-4xl hover:text-red-500 duration-100" onClick={onClose} />
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

