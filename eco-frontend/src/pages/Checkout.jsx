import { FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { PiCreditCardFill } from "react-icons/pi";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Listbox } from "@headlessui/react";

const cities = ["Rabat", "Casablanca", "Fes", "Tanger"];

const Checkout = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedCity, setSelectedCity] = useState("");
  const [selected, setSelected] = useState("");

  // Handle Quantity Change
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);
  const removeItem = () => alert("Item removed from cart");

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
        <div className="w-1/2">
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
          <div className="flex flex-col items-center gap-3 max-h-80 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-transparent">

            <div className="flex items-center justify-between bg-gray-100 p-2 gap-2 w-[95%] rounded-lg">
              <div className="bg-blue-500 w-[80px] h-[80px] rounded-lg"></div>
              <p className="text-lg">Lorem ipsum dolor sit amet.</p>

              <div className="w-7 h-7 bg-red-500 rounded-full">

              </div>

              {/* Quantity Controller */}
              <div className="flex items-center">
                <button onClick={increaseQuantity} className="p-2">
                  <FaPlus />
                </button>
                <input
                  type="text"
                  name="quantity"
                  id="quantity"
                  value={quantity}
                  readOnly
                  className="w-10 h-10 text-center rounded-lg p-1 border border-gray-400"
                />
                <button onClick={decreaseQuantity} className="p-2">
                  <FaMinus />
                </button>
              </div>

              <h1 className="text-2xl font-semibold">200 Dh</h1>
              {/* Remove Item */}
              <button onClick={removeItem} className="text-2xl text-gray-400 hover:text-red-500 hover:scale-110 duration-100 ">
                <FaTrashAlt />
              </button>
            </div>

            

          </div>
          <div className="p-5 rounded-lg w-[80%] mx-auto bg-gray-100 mt-5 text-black ">
            <h2 className="text-2xl text-center mb-2 font-semibold">Order Summary</h2>
            <div className="border-b-2 border-gray-300">
              <p className="text-lg"><span className="text-lg font-semibold">Delivery cost:</span> --.-- Dh</p>
              <p className="text-lg"><span className="text-lg font-semibold">Items Price:</span> --.-- Dh</p>
            </div>
            <p className="text-2xl font-semibold text-center"><span className="text-xl">Total: </span>--.-- Dh</p>
          </div>
        </div>

        <form className="w-2/5 bg-blue-500 h-auto rounded-xl p-8">
          <h1 className="text-3xl text-white text-center mb-2 font-semibold">Shipping Info</h1>

          <div className="w-full flex justify-center gap-5 items-center">
            <div className="flex flex-col my-3 w-full">
              <label htmlFor="firstname" className="text-lg text-white font-semibold">Firstname:</label>
              <input type="text" placeholder="Enter your Firstname" className="border-b-2 bg-white/40 rounded-lg text-white placeholder-white p-2 w-full" required />
            </div>

            <div className="flex flex-col my-3 w-full">
              <label htmlFor="lastname" className="text-lg text-white font-semibold">Lastname:</label>
              <input type="text" placeholder="Enter your Lastname" className="border-b-2 bg-white/40 rounded-lg text-white placeholder-white p-2 w-full" required />
            </div>
          </div>

          <div className="flex flex-col my-3">
            <label htmlFor="phone" className="text-lg text-white font-semibold">Phone number:</label>
            <input type="tel" placeholder="Enter your Phone Number" className="border-b-2 bg-white/40 rounded-lg text-white placeholder-white p-2 w-full" required />
          </div>

          <div className="flex flex-col my-3">
            <label htmlFor="address" className="text-lg text-white font-semibold">Address:</label>
            <input type="text" placeholder="Enter your Postal Address" className="border-b-2 bg-white/40 rounded-lg text-white placeholder-white p-2 w-full" required />
          </div>

          <div className="flex items-center justify-center w-[90%]">
            <div className="flex items-center gap-2 my-3 w-1/2">
              <label htmlFor="city" className="text-lg text-white font-semibold">City:</label>
              <Listbox value={selectedCity} onChange={setSelectedCity}>
                <div className="relative z-10">
                  <Listbox.Button className="border-b-2 bg-white/40 rounded-lg text-white placeholder-white p-2 w-full text-left">
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

            <div className="flex items-center gap-2 justify-start my-3 w-[200px]">
              <label htmlFor="ZIP" className="text-lg text-white font-semibold w-full">ZIP Code:</label>
              <input type="number" className="border-b-2 bg-white/40 rounded-lg text-white placeholder-white p-2 w-[90px]" required />
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
              <div className="flex justify-between items-center gap-5 border-2 text-white border-white rounded-lg w-44 h-20 p-5 cursor-pointer duration-150 peer-checked:bg-white peer-checked:text-blue-500 hover:bg-white group">
                <PiCreditCardFill className="text-5xl group-hover:text-blue-500 peer-checked:text-blue-500" />
                <h1 className="text-lg font-semibold group-hover:text-blue-500 peer-checked:text-blue-500">
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
              <div className="flex justify-between items-center gap-5 border-2 text-white border-white rounded-lg w-44 h-20 p-5 cursor-pointer duration-150 peer-checked:bg-white peer-checked:text-blue-500 hover:bg-white group">
                <BsCashCoin className="text-5xl group-hover:text-blue-500 peer-checked:text-blue-500" />
                <h1 className="text-lg font-semibold group-hover:text-blue-500 peer-checked:text-blue-500">
                  Cash on Delivery
                </h1>
              </div>
            </label>
          </div>

          <button className="text-lg p-4 bg-cyan-400 text-white mx-7 font-semibold w-[90%] rounded-lg my-4 hover:bg-cyan-500 duration-100">Order Commande</button>
        </form>


      </div>
    </>
  );
}

export default Checkout