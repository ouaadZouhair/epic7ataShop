import logo from "../../assets/epic7ata-logo.png";
import CardItem from "../CardItem/CardItem";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaXmark } from "react-icons/fa6";
import { MdRemoveShoppingCart } from "react-icons/md";


const CardShipping = ({ visibility, onClose, fnData }) => {

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
          <div className="py-4 flex flex-col justify-center items-center border-t-2 gap-3 border-gray-200 w-full">
            <div className="font-semibold text-gray-950 flex justify-between items-center w-[80%]">
              <h1 className="text-xl">Total:</h1>
              <h1 className="text-xl">{totalPrice} Dh</h1>
            </div>
            <button className="bg-blue-600 py-2 md:py-3 text-white text-lg md:text-xl border-2 border-blue-600 font-semibold w-[90%] rounded-xl hover:bg-blue-500 hover:border-blue-500 duration-100">
              Proceed to checkout
            </button>
            <button className="bg-transparent text-blue-600 py-2 md:py-3 border-2 border-blue-600 text-lg md:text-xl font-semibold w-[90%] rounded-xl hover:bg-blue-600 hover:text-white duration-100">
              Shop more
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CardShipping;
