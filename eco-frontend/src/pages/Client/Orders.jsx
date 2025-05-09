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

  const handleCancelOrder = async (e, orderId) => {
    try {
      e.stopPropagation();
      await dispatch(cancelOrder({ orderId })).unwrap();
      await dispatch(fetchOrder()).unwrap();
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  }

  useEffect(() => {
    dispatch(fetchOrder())
      .unwrap()
      .catch(() => {
        setLocalError('Failed to load order data. Please try again later.');
      });
  }, [dispatch]);

  const calculateSubtotal = (products) => {
    return products.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-blue-100 text-blue-800';
      case 'Canceled': return 'bg-red-100 text-red-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Delivering': return 'bg-orange-100 text-orange-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Printing': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <GoShopNav />
      
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header with filter */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-500 mt-1">View and manage your orders</p>
            </div>
            <div className="relative w-full md:w-48">
              <select 
                name="filter" 
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="">All Orders</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <section className="space-y-6">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loading />
              </div>
            ) : error || localError ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error || localError}</p>
                  </div>
                </div>
              </div>
            ) : order.length === 0 ? (
              <div className="text-center py-16">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100">
                  <MdRemoveShoppingCart className="text-red-600 text-5xl" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">No orders yet</h3>
                <p className="mt-2 text-gray-500">Start shopping to see your orders here.</p>
                <div className="mt-6">
                  <button
                    onClick={handleGoToShopping}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {order.map((orderItem, i) => (
                  <div key={i} className="bg-white overflow-hidden shadow rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-200">
                    {/* Order header */}
                    <div 
                      className="px-6 py-4 cursor-pointer flex justify-between items-center"
                      onClick={() => toggleOrderDetails(orderItem._id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                          <span className="text-blue-600 font-medium">#{i+1}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            Order <span className="text-gray-500">#{orderItem._id.slice(-8)}</span>
                          </h3>
                          <p className="text-sm text-gray-500">
                            Placed on {new Date(orderItem.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(orderItem.status)}`}>
                          {orderItem.status}
                        </span>
                        
                        {(orderItem.status !== 'Canceled' && orderItem.status !== 'Completed') && (
                          <button 
                            onClick={(e) => handleCancelOrder(e, orderItem._id)}
                            className="p-2 rounded-full hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors duration-200"
                            title="Cancel order"
                          >
                            <TiCancel className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Order products */}
                    <div className="border-t border-gray-200 px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orderItem.products.map((item, i) => (
                          <div 
                            key={i} 
                            className="flex items-start space-x-4 cursor-pointer group"
                            onClick={() => handleProductClick(item.product?._id)}
                          >
                            <div className="flex-shrink-0">
                              <img
                                src={`${BASE_URL}${item.product?.imageUrls?.frontMockups || ''}`}
                                alt={item.product?.title || 'Product image'}
                                className="h-44 w-auto rounded-lg object-cover group-hover:opacity-80 transition-opacity duration-200"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                                {item.product?.title || 'Deleted Product'}
                              </h4>
                              <p className="text-base text-gray-500 mt-1">
                                {item.product?.price || 0} Dhs × {item.quantity}
                              </p>
                              <p className="text-sm text-gray-400 mt-1">
                                Size: {item.size} | Color: <span className="capitalize">{item.color}</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order summary (collapsible) */}
                    <div className={`border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${expandedOrderId === orderItem._id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Shipping Information */}
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                            <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            Shipping Information
                          </h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p><span className="font-medium">Recipient:</span> {orderItem.firstName} {orderItem.lastName}</p>
                            <p><span className="font-medium">Address:</span> {orderItem.address}, {orderItem.city}</p>
                            <p><span className="font-medium">Phone:</span> {orderItem.phone}</p>
                            <p>
                              <span className="font-medium">Payment:</span> 
                              <span className="ml-1 capitalize">
                                {orderItem.paymentMethod === 'creditCard' ? 'Credit Card' : 'Cash on Delivery'}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                            <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                            </svg>
                            Order Summary
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Subtotal:</span>
                              <span className="font-medium">{calculateSubtotal(orderItem.products)} Dhs</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Shipping:</span>
                              <span className="font-medium">{orderItem.deleviryCost} Dhs</span>
                            </div>
                            <div className="border-t border-gray-200 my-2"></div>
                            <div className="flex justify-between text-base font-bold">
                              <span className="text-gray-900">Total:</span>
                              <span className="text-blue-600">{orderItem.totalPrice} Dhs</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Toggle button */}
                    <div className="border-t border-gray-200 px-6 py-3 text-center">
                      <button
                        onClick={() => toggleOrderDetails(orderItem._id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center transition-colors duration-200"
                      >
                        {expandedOrderId === orderItem._id ? (
                          <>
                            Hide details
                            <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                          </>
                        ) : (
                          <>
                            View details
                            <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;