import { GoShopNav, Footer, Loading } from "../../components/imports";
import { useNavigate } from "react-router-dom";
import { MdRemoveShoppingCart } from "react-icons/md";
import { LuChevronsRight } from "react-icons/lu";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TiCancel } from "react-icons/ti";
import { fetchOrder, cancelOrder } from "../../redux/slice/CheckoutSlice";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.order);
  const [localError, setLocalError] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const BASE_URL = 'http://localhost:3000';


  const handleGoToShopping = useCallback(() => {
    navigate("/shop");
  }, [])

  const handleProductClick = useCallback((id) => {
    navigate(`/product/${id}`);
  }, [])

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleCancelOrder = async (e, orderId ) => {
    try {
      e.stopPropagation();
      await dispatch(cancelOrder({ orderId })).unwrap();
      await dispatch(fetchOrder()).unwrap();
      console.log("Item removed successfully");
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  }


  useEffect(() => {
    dispatch(fetchOrder())
      .unwrap()
      .catch(() => {
        setLocalError('Failed to load data from Cart. Please try again later.');
      });
  }, [dispatch]);

  
  const calculateSubtotal = (products) => {
    return products.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <div className="bg-gray-50">
      <GoShopNav />
      <div className="w-[80%] mx-auto flex justify-between items-center ">
        <h1 className="text-2xl font-semibold">My Orders</h1>
        <select name="fillter" className="border border-gray-300 rounded-full p-2 m-4">
          <option value="">All Orders</option>
          <option value="">Pending</option>
          <option value="">Shipped</option>
          <option value="">Delivered</option>
          <option value="">Cancelled</option>
        </select>
      </div>
      <section className="flex flex-col items-center justify-start gap-3 min-h-[400px] p-4">
        {loading ? (
          <Loading />
        ) : error || localError ? (
          <div className="text-red-500 text-center">
            {error || localError}
          </div>
        ) : order.length === 0 ? (
          <div className="flex flex-col items-center justify-between gap-4">
            <MdRemoveShoppingCart className='text-gray-800 text-8xl' />
            <p className="text-gray-800 text-xl">You have no orders yet.</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
              onClick={handleGoToShopping}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="w-full max-w-7xl h-auto">
            {order.map((orderItem, i) => (
              <div key={i} className="relative bg-white p-4 rounded-3xl shadow mb-4 overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-0 md:items-center mb-4">
                  <div className="flex justify-between items-center gap-2 w-[450px]">
                    <div className="flex flex-col">
                      <p className="font-semibold text-base md:text-xl">Order <span className="text-gray-400 truncate">#{orderItem._id}</span></p>
                      <p className="text-gray-600 text-sm md:text-lg">Placed on: {new Date(orderItem.createdAt).toDateString()}</p>
                    </div>
                    <p className={`px-3 py-2 ${orderItem.status === 'Pending' && 'bg-blue-400'}  ${orderItem.status === 'Canceled' && 'bg-red-500'} ${orderItem.status === 'Processing' && 'bg-yellow-400'} ${orderItem.status === 'Delivering' && 'bg-orange-400'} ${orderItem.status === 'Completed' && 'bg-green-400'} ${orderItem.status === 'Printing' && 'bg-teal-400'} rounded-full text-white font-semibold`}> {orderItem.status}</p>
                  </div>
                  <button 
                  className="text-white bg-red-500 rounded-full w-9 h-9 text-4xl text-center flex items-center justify-center hover:bg-red-600 hover:scale-110 hover:shadow-md duration-150" 
                  onClick={(e) => handleCancelOrder(e, orderItem._id )}
                  >
                    <TiCancel />
                  </button>
                </div>
                <div className="flex flex-col  md:flex-row md:justify-start md:items-center md:flex-wrap gap-2 md:gap-5 mb-4">
                  {orderItem.products.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <img
                        src={`${BASE_URL}${item.product?.imageUrls?.frontMockups || ''}`}
                        alt={item.product?.title || 'Product image'}
                        className="w-36 md:w-40 h-auto cursor-pointer rounded hover:scale-105 duration-150"
                        onClick={() => handleProductClick(item.product?._id)}
                      />
                      <div className="flex flex-col">
                        <h4 className="font-semibold text-lg md:text-xl cursor-pointer hover:scale-105 hover:underline duration-150"
                          onClick={() => handleProductClick(item.product?._id)}>
                          {item.product?.title || 'Deleted Product'}
                        </h4>
                        <p className="text-sm md:text-base font-normal text-gray-500">
                          {item.product?.price || 0} Dhs x {item.quantity} Qty
                        </p>
                        <p className="text-sm md:text-base font-normal text-gray-500">
                          Size: {item.size} | Color: <span className="capitalize">{item.color}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional order details with transition */}
                <div className={`grid transition-all duration-300 ease-in-out ${expandedOrderId === orderItem._id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="border-t pt-4 mt-4 flex justify-center md:justify-end">
                      <div className="w-full md:w-[400px] lg:w-1/3 p-4 rounded-lg">
                        <h4 className="font-semibold text-xl underline mb-2 text-center">Order Summary</h4>
                        <div className="flex justify-between text-gray-700 mb-1">
                          <span className="font-semibold">Subtotal:</span>
                          <span>{calculateSubtotal(orderItem.products)} Dhs</span>
                        </div>
                        <div className="flex justify-between text-gray-700 mb-1">
                          <span className="font-semibold">Shipping:</span>
                          <span>{orderItem.deleviryCost} Dhs</span>
                        </div>
                        <div className="flex justify-between font-semibold text-xl mt-2">
                          <span>Total:</span>
                          <span>{orderItem.totalPrice} Dhs</span>
                        </div>

                        <h4 className="font-semibold text-xl underline text-center mt-4 mb-2">Shipping Information</h4>
                        <p className="text-lg text-gray-700"> <span className="font-semibold">Send to:</span>  {orderItem.firstName} {orderItem.lastName}</p>
                        <p className="text-lg text-gray-700"> <span className="font-semibold">Address:</span> {orderItem.address} {orderItem.city}</p>
                        <p className="text-lg text-gray-700"> <span className="font-semibold">Payment method:</span> {orderItem.paymentMethod === 'creditCard' && 'Credit Cart'} {orderItem.paymentMethod === 'cashOnDelivery' && 'Cash On Delivery'}</p>
                        <p className="text-lg text-gray-700"><span className="font-semibold">Phone:</span> {orderItem.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* More details button - only shows when not expanded */}
                {expandedOrderId !== orderItem._id && (
                  <button
                    onClick={() => toggleOrderDetails(orderItem._id)}
                    className="absolute right-5 bottom-1 md:bottom-3 px-3 py-2 text-blue-700 font-normal text-base md:text-lg rounded-full hover:underline hover:scale-105 duration-150  flex items-center justify-center"
                  >
                    More details <LuChevronsRight className="text-xl" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default Orders;