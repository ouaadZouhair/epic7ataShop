import { updateCartQuantity, removeFromCart, fetchFromCart } from "../../redux/slice/CartShippingSlice";
import { createOrder } from "../../redux/slice/CheckoutSlice";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { PiCreditCardFill } from "react-icons/pi";
import { FaTrashAlt } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { Loading, GoShopNav, PaymentPopup } from "../../components/imports";

const cities = ["Rabat", "Casablanca", "Fes", "Tanger"];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalItemPrice, setTotalItemPrice] = useState(0);
  const { cart, loading } = useSelector(state => state.cart);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('')
  const [selectedCity, setSelectedCity] = useState("");
  const [selected, setSelected] = useState("");

  const BASE_URL = 'http://localhost:3000';

  const updateQuantity = async (e, productId, newQuantity) => {
    // Update the quantity in the cart
    try {
      e.stopPropagation()
      await dispatch(updateCartQuantity({ productId, quantity: newQuantity })).unwrap();
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }

  }

  const cityDeliveryCost = [
    { city: "Rabat", cost: 35 },
    { city: "Casablanca", cost: 20 },
    { city: "Fes", cost: 40 },
    { city: "Tanger", cost: 35 },
  ]

  useEffect(() => {
    dispatch(fetchFromCart()).unwrap().catch(() => {
      setlocalError('Failed to load data from  Cart. Please try again later.')
    })
  }, [dispatch])

  useEffect(() => {
    // Calculate delivery cost
    const cost = cityDeliveryCost.find(city => city.city === selectedCity)?.cost || 0;
    setDeliveryCost(cost);

    // Calculate total items price
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      setTotalItemPrice(0);
      return;
    }

    const total = cart.reduce(
      (acc, item) => acc + (item.product?.fullPrice || 0),
      0
    ).toFixed(2);

    setTotalItemPrice(parseFloat(total));
  }, [cart, selectedCity]);

  const removeItem = async (e, { id, color, size }) => {
    try {
      // Remove item from the cart
      e.stopPropagation()
      await dispatch(removeFromCart({ id, color, size })).unwrap();
    } catch (err) {
      console.log(err)
    }
  };

  const sendToOrder = async () => {
    const order = {
      firstName: firstname,
      lastName: lastname,
      phone: phoneNumber,
      address,
      city: selectedCity,
      paymentMethod: selected,
      deleviryCost: deliveryCost
    };
  
    try {
      // Send order to database through redux slice
      const response = await dispatch(createOrder(order));
  
      if (response) {
        console.log("Order created successfully");
  
        // Clear shipping info inputs
        setFirstname('');
        setLastname('');
        setPhoneNumber('');
        setAddress('');
        setSelectedCity('');
        setSelected('');
  
        // Navigate to orders page
        navigate('/orders');
      } else {
        console.error("Order creation failed:", response);
      }
    } catch (err) {
      console.error("Failed to create order:", err);
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };
  

  return (
    <>
      {/* Navigation to Shop page */}
      <GoShopNav />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 justify-around lg:items-start items-center w-[95%] lg:w-[90%] mx-auto lg:mx-20">
        {/* Left Column - Checkout Cart */}
        <section className="w-full md:w-[70%] lg:w-1/2">
          <h1 className="text-2xl font-medium underline">Shopping Cart</h1>

          <div className="flex justify-between items-center">
            <p className="text-base md:text-lg text-gray-900 my-5">You have {cart.length} items in your cart</p>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg">Sort by:</h1>
              <select name="sort" id="sort" className="text-lg font-normal bg-transparent rounded-lg border p-1">
                <option value="price">Price</option>
                <option value="newer">Newer</option>
                <option value="older">Older</option>
              </select>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex flex-col justify-center items-center gap-3 w-full p-0 md:p-2 rounded-xl overflow-y-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-white/50">
            {loading ? (
              <Loading />
            ) : cart.length > 0 ? (
              cart.map(({ product }, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-100 shadow-sm text-black p-2 gap-2 w-full rounded-lg cursor-pointer" onClick={() => handleProductClick(product._id)}>
                  <img src={`${BASE_URL}${product.imageUrls.frontMockups}`} className="w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-lg" />
                  <p className="text-sm md:text-lg font-semibold w-24 md:w-40 lg:w-48">{product.title}</p>

                  <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-gray-500 ${product.color} ${ product.color === 'white' && 'bg-gray-50'} ${ product.color === 'black' && 'bg-black'} ${ product.color === 'blue' && 'bg-blue-900'} ${ product.color === 'red' && 'bg-red-500'} ${ product.color === 'orange' && 'bg-orange-500'} ${ product.color === 'green' && 'bg-green-600'} ${ product.color === 'purple' && 'bg-purple-500'} ${ product.color === 'gray' && 'bg-gray-300'}`}></div>

                  {/* Quantity Controller */}
                  <div className="flex flex-col md:flex-row items-center">
                    <button onClick={(e) => { updateQuantity(e, product._id, product.quantity + 1) }} className="text-sm md:text-xl p-2 hover:text-blue-500 hover:scale-110 duration-100 ">
                      <FaPlus />
                    </button>
                    <input
                      type="text"
                      name="quantity"
                      id="quantity"
                      value={product.quantity}
                      readOnly
                      className="w-8 h-8 md:w-10 md:h-10 text-center rounded-lg p-1 border-2 bg-white border-black/50"
                    />
                    <button onClick={(e) => { updateQuantity(e, product._id, Math.max(1, product.quantity - 1)) }} className="text-sm md:text-xl p-2 hover:text-blue-500 hover:scale-110 duration-100 ">
                      <FaMinus />
                    </button>
                  </div>

                  <h1 className="text-base w-16 md:text-lg font-bold">{product.fullPrice} Dh</h1>
                  {/* Remove Item */}
                  <button onClick={(e) => { removeItem(e, { id: product._id, color: product.color, size: product.size }) }} className="text-2xl text-gray-500 hover:text-red-500 hover:scale-110 duration-100 ">
                    <FaTrashAlt />
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-64">
                <MdRemoveShoppingCart className='text-black text-7xl' />
                <h3 className="text-2xl font-light text-black mb-2">Your cart is empty</h3>
                <p className="text-sm md:text-base font-medium text-gray-500 mb-4">Looks like you haven't added anything to your cart yet</p>
                <button
                  onClick={() => navigate('/shop')}
                  className="px-6 py-2 bg-white border-2 font-semibold border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white duration-150 transition-colors"
                >
                  Shop Now
                </button>
              </div>
            )}
          </div>

          <div className="p-7 rounded-xl w-full mx-auto bg-red-500 mt-5 text-white ">
            <h2 className="text-3xl text-center mb-2 font-semibold">Order Summary</h2>
            <div className="border-b-2 pb-2 border-gray-100">
              <p className="text-lg md:text-xl lg:text-lg"><span className="font-semibold">Delivery cost:</span> {deliveryCost.toFixed(2)} Dh</p>
              <p className="text-lg md:text-xl lg:text-lg"><span className="font-semibold">Items Price:</span> {totalItemPrice.toFixed(2)} Dh</p>
            </div>
            <p className="text-2xl font-semibold text-center">
              Total: {(totalItemPrice + deliveryCost).toFixed(2)} Dh
            </p>
          </div>
          
        </section>

        <form className="w-full md:w-[70%] lg:w-2/5 bg-gray-600 backdrop-blur-lg h-auto rounded-xl p-4 md:p-8 shadow-xl">
          <h1 className="text-3xl text-white text-center mb-2 font-semibold">Shipping Info</h1>

          <div className="w-full flex flex-col md:flex-row justify-center gap-0 md:gap-5 items-center">
            <div className="flex flex-col my-3 w-full">
              <label htmlFor="firstname" className="text-lg text-white font-semibold ">Firstname:</label>
              <input
                type="text"
                placeholder="Enter your Firstname"
                className="border-b-4 bg-white/40 rounded-lg text-white placeholder-white p-2 w-full  outline-none"
                onChange={(e) => { setFirstname(e.target.value) }}
                required />
            </div>

            <div className="flex flex-col my-3 w-full">
              <label htmlFor="lastname" className="text-lg text-white font-semibold">Lastname:</label>
              <input
                type="text"
                placeholder="Enter your Lastname"
                className="border-b-4 bg-white/40 rounded-lg text-white placeholder-white p-2 w-full outline-none"
                onChange={(e) => { setLastname(e.target.value) }}
                required />
            </div>
          </div>

          <div className="flex flex-col my-3">
            <label htmlFor="phone" className="text-lg text-white font-semibold">Phone number:</label>
            <input
              type="tel"
              placeholder="Enter your Phone Number"
              className="border-b-4 bg-white/40 rounded-lg text-white placeholder-white p-2 w-full outline-none"
              onChange={(e) => { setPhoneNumber(e.target.value) }}
              required />
          </div>

          <div className="flex flex-col my-3">
            <label htmlFor="address" className="text-lg text-white font-semibold">Address:</label>
            <input
              type="text"
              placeholder="Enter your Postal Address"
              className="border-b-4 bg-white/40 rounded-lg text-white placeholder-white p-2 w-full outline-none"
              onChange={(e) => { setAddress(e.target.value) }}
            />
          </div>

          <div className="flex items-center justify-start w-[90%]">
            <div className="flex items-center gap-2 my-3 w-1/2">
              <label htmlFor="city" className="text-lg text-white font-semibold">City:</label>
              <Listbox value={selectedCity} onChange={setSelectedCity}>
                <div className="relative z-10">
                  <Listbox.Button className="border-b-4 bg-white/40 rounded-lg text-white placeholder-white p-2 w-[150px] text-left">
                    {selectedCity || "Select your City"}
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-2 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-auto">
                    {cities.map((city, index) => (
                      <Listbox.Option key={index} value={city} className="cursor-pointer p-2 font-medium hover:bg-blue-600 hover:text-white">
                        {city}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            {/* <div className="flex items-center gap-1 justify-start my-3 w-[200px]">
              <label htmlFor="ZIP" className="text-lg text-white font-semibold w-full">ZIP Code:</label>
              <input type="number" className="border-b-4 bg-white/40 rounded-lg text-white placeholder-white p-2 w-[90px] outline-none" required />
            </div> */}

          </div>

          <div className="flex flex-row gap-3 md:gap-0 justify-around items-center w-full mt-4">
            {/* Payment Online Option */}
            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="creditCard"
                checked={selected === "creditCard"}
                onChange={() => setSelected("creditCard")}
                className="hidden peer"
              />
              <div className="flex justify-between items-center gap-5 border-2 text-white border-white rounded-lg w-36 h-20 p-3 cursor-pointer duration-150 peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:text-white hover:bg-blue-600 hover:border-blue-600 group">
                <PiCreditCardFill className="text-6xl md:text-5xl group-hover:text-white peer-checked:text-blue-500" />
                <h1 className="text-base md:text-lg font-semibold group-hover:text-white peer-checked:text-blue-500">
                  Credit Card
                </h1>
              </div>
            </label>

            {/* Cash on Delivery Option */}
            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cashOnDelivery"
                checked={selected === "cashOnDelivery"}
                onChange={() => setSelected("cashOnDelivery")}
                className="hidden peer"
              />
              <div className="flex justify-between items-center gap-5 border-2 text-white border-white rounded-lg w-36 h-20 p-3 cursor-pointer duration-150 peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:text-white hover:bg-blue-600 hover:border-blue-600 group">
                <BsCashCoin className="text-6xl md:text-6xl group-hover:text-white peer-checked:text-blue-500" />
                <h1 className="text-base md:text-lg font-semibold group-hover:text-white peer-checked:text-blue-500">
                  Cash on Delivery
                </h1>
              </div>
            </label>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              sendToOrder();
            }}
            className="text-lg p-4 text-white bg-white/40 font-semibold w-full mx-auto rounded-full my-4 hover:bg-blue-600 hover:text-white duration-100"
          >
            Order Commande
          </button>
        </form>
      </div>
    </>
  );
}

export default Checkout