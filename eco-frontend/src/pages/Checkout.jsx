import { updateCartQuantity, removeFromCart, fetchFromCart } from "../redux/slice/CartShippingSlice";
import { createOrder } from "../redux/slice/CheckoutSlice";
import { FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { PiCreditCardFill } from "react-icons/pi";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";

const cities = ["Rabat", "Casablanca", "Fes", "Tanger"];

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [totalItemPrice, setTotalItemPrice] = useState(0);
  const { cart } = useSelector(state => state.cart);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('')
  const [selectedCity, setSelectedCity] = useState("");
  const [selected, setSelected] = useState("");

  const BASE_URL = 'http://localhost:3000';

  const updateQuantity = async (productId, newQuantity) => {
    // Update the quantity in the cart
    try {
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

  const removeItem = async ({ id, color, size }) => {
    try {
      // Remove item from the cart
      await dispatch(removeFromCart({ id, color, size })).unwrap();
      console.log("Item removed successfully");
    } catch (err) {
      console.log(err)
    }
  };

  const sendToOrder = async (e) => {

    const order = {
      firstname,
      lastname,
      phoneNumber,
      address,
      city: selectedCity,
      payment: selected,
      deliveryCost,
      totalItemPrice,
      cart
    }

    console.log(order)
    // try {
    //   await dispatch(createOrder(order)).unwrap();
    //   console.log("Order created successfully");
    // } catch (err) {
    //   console.error("Failed to create order:", err);
    // }

  }

  return (
    <>
      {/* Navbar */}
      <nav className="top-0 w-full h-14 flex justify-between items-center text-white  px-4 mb-5">
        <button className="flex items-center group gap-2 bg-transparent text-gray-500 group" onClick={() => navigate('/shop')}>
          <FaArrowLeft className="text-xl group-hover:text-3xl group-hover:text-blue-600 duration-100" />
          <span className="text-lg font-base group-hover:font-semibold group-hover:text-blue-600 duration-100">Continue Shopping</span>
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex gap-4 justify-around items-start mx-20">
        {/* Left Column - Shopping Cart */}
        <section className="w-1/2">
          <h1 className="text-2xl font-medium underline">Shopping Cart</h1>

          <div className="flex justify-between items-center">
            <p className="text-lg text-gray-900 my-5">You have 4 items in your cart</p>
            <div className="flex gap-2">
              <h1 className="text-lg">Sort by:</h1>
              <select name="sort" id="sort" className="text-lg font-normal bg-transparent rounded-lg border p-1">
                <option value="price">Price</option>
                <option value="newer">Newer</option>
                <option value="older">Older</option>
              </select>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex flex-col items-center gap-3 max-h-80 p-2 rounded-xl overflow-y-scroll scrollbar-thin scrollbar-thumb-white scrollbar-track-white/50">

            {cart.map(({ product }, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-100 text-black p-2 gap-2 w-full rounded-lg">

                <img src={`${BASE_URL}${product.imageUrls.frontMockups}`} className=" w-[80px] h-[80px] rounded-lg" />
                <p className="text-lg w-48">{product.title}</p>

                <div className={`w-8 h-8 rounded-full ${product.color}`}></div>

                {/* Quantity Controller */}
                <div className="flex items-center">

                  <button onClick={() => { updateQuantity(product._id, product.quantity + 1) }} className="text-xl p-2 hover:text-blue-500 hover:scale-110 duration-100 ">
                    <FaPlus />
                  </button>
                  <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    value={product.quantity}
                    readOnly
                    className="w-10 h-10 text-center rounded-lg p-1 border-2 bg-white border-black/50"
                  />
                  <button onClick={() => { updateQuantity(product._id, Math.max(1, product.quantity - 1)) }} className="text-xl p-2 hover:text-blue-500 hover:scale-110 duration-100 ">
                    <FaMinus />
                  </button>
                </div>

                <h1 className="text-2xl font-semibold">{product.fullPrice} Dh</h1>
                {/* Remove Item */}
                <button onClick={() => { removeItem({ id: product._id, color: product.color, size: product.size }) }} className="text-2xl text-gray-500 hover:text-red-500 hover:scale-110 duration-100 ">
                  <FaTrashAlt />
                </button>
              </div>
            ))}

          </div>

          <section className="p-7 rounded-xl w-[80%] mx-auto bg-amber-400 mt-5 text-white ">
            <h2 className="text-2xl text-center mb-2 font-semibold">Order Summary</h2>
            <div className="border-b-2 border-gray-100">
              <p className="text-lg"><span className="text-lg font-semibold">Delivery cost:</span> {deliveryCost.toFixed(2)} Dh</p>
              <p className="text-lg"><span className="text-lg font-semibold">Items Price:</span> {totalItemPrice.toFixed(2)} Dh</p>
            </div>
            <p className="text-2xl font-semibold text-center">
              Total: {(totalItemPrice + deliveryCost).toFixed(2)} Dh
            </p>
          </section>
        </section>

        <form className="w-2/5 bg-blue-500 h-auto rounded-xl p-8">
          <h1 className="text-3xl text-white text-center mb-2 font-semibold">Shipping Info</h1>

          <div className="w-full flex justify-center gap-5 items-center">
            <div className="flex flex-col my-3 w-full">
              <label htmlFor="firstname" className="text-lg text-white font-semibold ">Firstname:</label>
              <input
                type="text"
                placeholder="Enter your Firstname"
                className="border-b-2 bg-white/40 rounded-lg text-white placeholder-white p-2 w-full  outline-none focus:outline-4 focus:outline-amber-400"
                onChange={(e) => { setFirstname(e.target.value) }}
                required />
            </div>

            <div className="flex flex-col my-3 w-full">
              <label htmlFor="lastname" className="text-lg text-white font-semibold">Lastname:</label>
              <input
                type="text"
                placeholder="Enter your Lastname"
                className="border-b-2 bg-white/40 rounded-lg text-white placeholder-white p-2 w-full outline-none focus:outline-4 focus:outline-amber-400"
                onChange={(e) => { setLastname(e.target.value) }}
                required />
            </div>
          </div>

          <div className="flex flex-col my-3">
            <label htmlFor="phone" className="text-lg text-white font-semibold">Phone number:</label>
            <input
              type="tel"
              placeholder="Enter your Phone Number"
              className="border-b-2 bg-white/40 rounded-lg text-white placeholder-white p-2 w-full outline-none focus:outline-4 focus:outline-amber-400"
              onChange={(e) => { setPhoneNumber(e.target.value) }}
              required />
          </div>

          <div className="flex flex-col my-3">
            <label htmlFor="address" className="text-lg text-white font-semibold">Address:</label>
            <input
              type="text"
              placeholder="Enter your Postal Address"
              className="border-b-2 bg-white/40 rounded-lg text-white placeholder-white p-2 w-full outline-none focus:outline-4 focus:outline-amber-400"
              onChange={(e) => { setAddress(e.target.value) }}
            />
          </div>

          <div className="flex items-center justify-center w-[90%]">
            <div className="flex items-center gap-2 my-3 w-1/2">
              <label htmlFor="city" className="text-lg text-white font-semibold">City:</label>
              <Listbox value={selectedCity} onChange={setSelectedCity}>
                <div className="relative z-10">
                  <Listbox.Button className="border-b-2 bg-white/40 rounded-lg text-white placeholder-white p-2 w-[150px] text-left">
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

            <div className="flex items-center gap-1 justify-start my-3 w-[200px]">
              <label htmlFor="ZIP" className="text-lg text-white font-semibold w-full">ZIP Code:</label>
              <input type="number" className="border-b-2 bg-white/40 rounded-lg text-white placeholder-white p-2 w-[90px] outline-none focus:outline-4 focus:outline-amber-400" required />
            </div>

          </div>

          <div className="flex justify-around items-center w-full mt-4">
            {/* Payment Online Option */}
            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={selected === "online"}
                onChange={() => setSelected("online")}
                className="hidden peer"
              />
              <div className="flex justify-between items-center gap-5 border-2 text-white border-white rounded-lg w-44 h-20 p-5 cursor-pointer duration-150 peer-checked:bg-amber-400 peer-checked:border-amber-400 peer-checked:text-white hover:bg-amber-400 hover:border-amber-400 group">
                <PiCreditCardFill className="text-5xl group-hover:text-white peer-checked:text-blue-500" />
                <h1 className="text-lg font-semibold group-hover:text-white peer-checked:text-blue-500">
                  Payment Online
                </h1>
              </div>
            </label>

            {/* Cash on Delivery Option */}
            <label className="relative cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={selected === "cash"}
                onChange={() => setSelected("cash")}
                className="hidden peer"
              />
              <div className="flex justify-between items-center gap-5 border-2 text-white border-white rounded-lg w-44 h-20 p-5 cursor-pointer duration-150 peer-checked:bg-amber-400 peer-checked:border-amber-400 peer-checked:text-white hover:bg-amber-400 hover:border-amber-400 group">
                <BsCashCoin className="text-5xl group-hover:text-white peer-checked:text-blue-500" />
                <h1 className="text-lg font-semibold group-hover:text-white peer-checked:text-blue-500">
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
            className="text-lg p-4 text-white bg-white/40 mx-7 font-semibold w-[90%] rounded-full my-4 hover:bg-amber-400 hover:text-white duration-100"
          >
            Order Commande
          </button>
        </form>


      </div>
    </>
  );
}

export default Checkout