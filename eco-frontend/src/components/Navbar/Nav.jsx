import { CardItem, Loading } from "../imports.jsx";
import logo from '../../assets/epic7ata-logo.png';
import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../Context/AuthContext.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { IoSearch, IoLogoTiktok } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { FiMenu, FiInstagram } from "react-icons/fi";
import { FaUserAlt, FaTrashAlt } from "react-icons/fa";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { IoLogoWhatsapp, IoMdMail, IoIosHeart } from "react-icons/io";
import { MdRemoveShoppingCart } from "react-icons/md";
import { fetchWishlist, removeFromWishlist } from "../../redux/slice/WishlistSlice.js";
import { fetchFromCart } from "../../redux/slice/CartShippingSlice.js";


const navLinks = [
  { path: '/', text: 'Home' },
  { path: '/shop', text: 'Shop' },
  { path: '/about', text: 'About' },
  { path: '/contact', text: 'Contact' }
];

const SearchResultsDropdown = ({ results, onItemClick, visible }) => {

  if (!visible || !results.length) return null;

  return (
    <div className="absolute top-full left-0 w-[300px] mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
      {results.map((product) => (
        <Link
          key={product._id}
          to={`/product/${product._id}`}
          className="flex items-center w-full p-3 text-gray-800 hover:bg-blue-500 hover:text-white transition-colors duration-200"
          onClick={() => onItemClick(product._id)}
        >
          <img
            src={`http://localhost:3000${product.imageUrls.frontMockups}`}
            alt={product.title}
            className="w-20 h-20 object-cover rounded mr-3"
          />
          <span className="font-medium">{product.title}</span>
        </Link>
      ))}
    </div>
  );
};

export const Navbar = () => {
  const [cardCounter, setCardCounter] = useState(0)
  const [isCardShippingVisible, setIsCardShippingVisible] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false)
  const [isWishlistMenuVisible, setIsWishlistMenuVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const { products } = useSelector(state => state.shop);
  const { user } = useAuth()

  const toggleShippingCard = () => setIsCardShippingVisible(!isCardShippingVisible)
  const toggleMenu = () => setIsMenuVisible(!isMenuVisible)

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 2) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(term.toLowerCase()) ||
        (product.tags && product.tags.some(tag =>
          tag.toLowerCase().includes(term.toLowerCase())
        ))
      );
      setSearchResults(filtered.slice(0, 5)); // Show top 5 results
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleResultClick = (id) => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuVisible(!isProfileMenuVisible)
    setIsWishlistMenuVisible(false)
  };

  const toggleWishlistMenu = () => {
    setIsWishlistMenuVisible(!isWishlistMenuVisible)
    setIsProfileMenuVisible(false)
  };

  const handleCartCounter = (data) => {
    setCardCounter(data)
  }

  return (
    <nav className="flex justify-around items-center md:justify-center md:gap-5 px-7 md:px-0 w-full py-3 z-50">

      <button className=' flex justify-center items-center w-10 h-10 border-2 rounded-xl text-2xl border-black p-1 hover:bg-black hover:text-white duration-100 lg:hidden' onClick={toggleMenu}>
        <FiMenu />
      </button>

      <div className=" w-[40px] h-auto hidden lg:block">
        <img src={logo} className="h-full w-full" />
      </div>

      <ul className="w-[350px] justify-around items-center hidden lg:flex">
        {navLinks.map((link) => (
          <li key={link.path} className="relative hover:text-blue-500 text-lg duration-200 ">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2 transition-colors  ${isActive
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-800 hover:text-blue-500 font-medium'
                }`
              }
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="flex  justify-around gap-3 w-[500px]">
        <form className="form relative hidden lg:block" ref={searchRef}>
          <button
            type="submit"
            className="absolute left-2 -translate-y-1/2 top-1/2 p-1"
            onClick={(e) => e.preventDefault()}
          >
            <IoSearch className="w-5 h-5 text-gray-700" />
          </button>
          <input
            className="input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
            placeholder="Search..."
            required
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => searchTerm.length > 2 && setShowResults(true)}
          />
          {searchTerm && (
            <button
              type="reset"
              className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
              onClick={() => {
                setSearchTerm('');
                setSearchResults([]);
                setShowResults(false);
              }}
            >
              <FaXmark className="w-6 h-6 text-gray-700 hover:text-red-500 duration-100" />
            </button>
          )}
          <SearchResultsDropdown
            results={searchResults}
            onItemClick={handleResultClick}
            visible={showResults}
          />
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
            {isProfileMenuVisible && <Profiel data={user} />}
            <button className="relative group" onClick={toggleWishlistMenu}>
              <IoIosHeart className="text-3xl group-hover:text-red-600 group-hover:scale-110 duration-100 " />
            </button>
            {isWishlistMenuVisible && <Wishlist troggleClick={toggleWishlistMenu} />}
          </div>
        )}


      </div>
      <button className=" relative text-4xl hover:text-blue-500 duration-100 " onClick={toggleShippingCard}>
        <PiShoppingCartSimpleFill />
        <div className="bg-red-500 w-[18px] h-[18px] rounded-full absolute -top-2 -right-3">
          <span className="text-sm text-white font-semibold absolute bottom-1/2 translate-y-1/2  left-1/2 -translate-x-1/2">{cardCounter}</span>
        </div>
      </button>

      <CardShipping visibility={isCardShippingVisible} onClose={toggleShippingCard} fnData={handleCartCounter} />
      <BurgerMenu visibility={isMenuVisible} onClose={toggleMenu} />
    </nav>

  )
}

export const TopNav = () => {
  return (
    <div className="bg-black/95 w-full h-auto py-3 md:py-0 md:h-14 flex flex-col md:flex-row justify-start md:justify-center items-center px-0 md:px-12 gap-2">
      <div>
        <span className="flex justify-between items-center gap-2">
          <TbTruckDelivery className="text-2xl md:text-3xl text-white" />
          <h3 className="text-sm md:text-lg text-white font-light">Fast and reliable delivery in all cities of Morocco</h3>
        </span>
      </div>
      {/* <div>
        <ul className="flex justify-between items-center text-2xl text-white gap-3">
          <li className=" cursor-pointer hover:scale-125 duration-100"><IoLogoWhatsapp /></li>
          <li className=" cursor-pointer hover:scale-125 duration-100" ><IoLogoTiktok /></li>
          <li className=" cursor-pointer hover:scale-125 duration-100"><FiInstagram /></li>
          <li className=" cursor-pointer hover:scale-125 duration-100"><IoMdMail /></li>
        </ul>
      </div> */}
    </div>
  );
}

export const CardShipping = ({ visibility, onClose, fnData }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsQuantity, setItemsQuantity] = useState(0);
  const { cart, loading, error } = useSelector(state => state.cart);

  const navigate = useNavigate();

  const handleProductClick = useCallback((id) => {
    navigate(`/product/${id}`);
    onClose();
  }, [navigate, onClose]);

  useEffect(() => {
    dispatch(fetchFromCart()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    let total = 0;
    let quantity = 0;
    cart.forEach(item => {
      total += item.product.price * item.product.quantity;
      quantity += item.product.quantity;
    });
    setTotalPrice(total);
    setItemsQuantity(quantity);
    fnData(quantity);
  }, [cart, fnData]);

  return (
    <div className={`fixed inset-0 z-50 ${visibility ? 'block' : 'hidden'}`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${visibility ? 'opacity-100' : 'opacity-0'
          }`}
        onClick={onClose}

      ></div>

      {/* Cart Content */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-all duration-300 ${
          visibility ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-red-500"
            >
              <FaXmark className="text-xl" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">
              My Cart <span className="text-sm font-medium text-gray-500">({itemsQuantity} items)</span>
            </h1>
            <img src={logo} alt="Store logo" className="h-10 w-10" />
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-2">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <MdRemoveShoppingCart className="text-6xl text-gray-300" />
                <p className="text-lg font-medium text-gray-500">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item, i) => (
                  <CardItem
                    item={item.product}
                    key={i}
                    fn={fnData}
                    viewProduct={() => handleProductClick(item.product._id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-semibold">Subtotal:</span>
                <span className="text-lg font-bold text-blue-600">{totalPrice.toFixed(2)} Dh</span>
              </div>

              <div className="space-y-2">
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="block w-full rounded-lg bg-red-600 py-3 text-center font-medium text-white hover:bg-red-700"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="block w-full rounded-lg border border-gray-300 py-3 text-center font-medium text-gray-700 hover:bg-gray-50"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const BurgerMenu = ({ visibility, onClose }) => {
  return (
    <div className={`h-svh fixed z-50 top-0 left-0 ${visibility ? 'w-full' : "w-0"} transition-all duration-500`}>
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

        <div className="w-full h-[50%] py-4 flex flex-col justify-around items-center text-xl md:text-2xl font-semibold border-t-2 border-gray-200 ">
          <Link to='/' className="hover:bg-blue-500 hover:text-white duration-100 cursor-pointer py-5 w-[90%] text-center rounded-xl" onClick={onClose}>Home</Link>
          <Link to="/shop" className="hover:bg-blue-500 hover:text-white duration-100 cursor-pointer py-5 w-[90%] text-center rounded-xl" onClick={onClose}>Shop</Link>
          <Link to="/about" className="hover:bg-blue-500 hover:text-white duration-100 cursor-pointer py-5 w-[90%] text-center rounded-xl" onClick={onClose}>About</Link>
          <Link to="/contact" className="hover:bg-blue-500 hover:text-white duration-100 cursor-pointer py-5 w-[90%] text-center rounded-xl" onClick={onClose}>Contact</Link>
        </div>

      </div>

    </div>
  )
}

export const Profiel = ({ data }) => {

  const navigate = useNavigate()

  const handleNavigation = (path) => {
    navigate(path)
  }


  const { logout } = useAuth()
  return (
    <div className="absolute top-14 -right-1/2 md:right-12 z-50 bg-white shadow-lg rounded-xl w-60 overflow-hidden">
      <div className="px-4 py-2">
        <p className="text-base font-semibold"> {data.fullName}</p>
        <p className="text-sm text-gray-500">{data.email}</p>
      </div>
      {data.role === 'admin' ? (
        <button
          className="text-white font-semibold mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 duration-100"
          onClick={() => handleNavigation('/dashboard')}
        >
          My Dashboard
        </button>
      ) : (
        <button
          className="text-white font-semibold mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 duration-100"
          onClick={() => handleNavigation('/orders')}
        >
          My Orders
        </button>
      )}

      <button
        className="text-white font-semibold  w-full py-2 bg-red-600 hover:bg-red-700 duration-100"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}

export const Wishlist = ({ troggleClick }) => {
  const dispatch = useDispatch();
  const { wishlist, loading, error } = useSelector((state) => state.wishlist);
  const [localError, setLocalError] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchWishlist()).unwrap().catch(() => {
      setLocalError("Failed to load wishlist. Please try again later.");
    });
  }, [dispatch]);

  const removeItem = async (itemId, e) => {
    e.stopPropagation(); // Stop the event from bubbling up
    try {
      await dispatch(removeFromWishlist(itemId)).unwrap();
    } catch (error) {
      setLocalError("Failed to remove item from wishlist. Please try again.");
      console.error("Error removing item:", error);
    }
  };

  const handleProductClick = useCallback((id) => {
    navigate(`/product/${id}`);
    console.log(id)
    troggleClick(); // Close the wishlist when navigating to a product page
  }, [])


  return (
    <div className="absolute top-14 -left-1/2 md:left-10 z-50 bg-white shadow-lg rounded-xl w-72 max-h-96 p-1 overflow-y-auto">
      {loading ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : (error || localError || wishlist.length === 0) ? (
        <p className="text-center text-gray-500 p-2">Your wishlist is empty</p>
      ) : (
        wishlist.map((item, i) => (
          <div
            key={item._id || i}
            className="flex items-center justify-between p-2 my-1 w-full bg-blue-500 rounded-lg shadow-lg cursor-pointer hover:bg-blue-600 duration-150"
            onClick={() => handleProductClick(item._id)}
          >
            <img
              src={`http://localhost:3000${item.imageUrls.frontMockups}`}
              className="w-20 h-20 lg:w-16 lg:h-16 rounded-lg object-cover"
              alt={item.title}
            />
            <p className="text-gray-200 md:text-lg lg:text-base font-semibold w-1/2 ">{item.title}</p>
            <button
              onClick={(e) => removeItem(item._id, e)}
              aria-label="Remove from wishlist"
            >
              <FaTrashAlt className="text-gray-200 text-3xl lg:text-2xl hover:text-red-600 hover:scale-110 duration-150" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};


