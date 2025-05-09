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
      setlocalError('Failed to load data from Cart. Please try again later.')
    })
  }, [dispatch])

  useEffect(() => {
    const cost = cityDeliveryCost.find(city => city.city === selectedCity)?.cost || 0;
    setDeliveryCost(cost);

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
      const response = await dispatch(createOrder(order));

      if (response) {
        console.log("Order created successfully");
        setFirstname('');
        setLastname('');
        setPhoneNumber('');
        setAddress('');
        setSelectedCity('');
        setSelected('');
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
    <div className="min-h-screen bg-gray-50">
      <GoShopNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="w-2 h-6 bg-red-500 mr-2 rounded-full"></span>
                  Your Cart ({cart.length} items)
                </h2>
              </div>

              {loading ? (
                <div className="p-8 flex justify-center">
                  <Loading />
                </div>
              ) : cart.length > 0 ? (
                <div className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                  {cart.map(({ product }, i) => (
                    <div
                      key={`${product._id}-${product.color}-${product.size}`}
                      className="group p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer border-b border-gray-100 last:border-0"
                      onClick={() => handleProductClick(product._id)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={`${BASE_URL}${product.imageUrls.frontMockups}`}
                            className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-lg border border-gray-200 group-hover:border-blue-300 transition-colors"
                            alt={product.title}
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-2">
                            {product.title}
                          </h3>

                          <div className="mt-2 flex items-center">
                            {/* Color Indicator */}
                            <div
                              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300 mr-2 ${product.color === 'white' ? 'bg-gray-50' :
                                  product.color === 'black' ? 'bg-black' :
                                    product.color === 'blue' ? 'bg-blue-600' :
                                      product.color === 'red' ? 'bg-red-500' :
                                        product.color === 'orange' ? 'bg-orange-500' :
                                          product.color === 'yellow' ? 'bg-yellow-400' :
                                            product.color === 'green' ? 'bg-green-600' :
                                              product.color === 'purple' ? 'bg-purple-500' :
                                                product.color === 'gray' ? 'bg-gray-300' : 'bg-white'
                                }`}
                              title={product.color}
                            ></div>

                            {/* Size */}
                            <span className="text-sm text-gray-500 capitalize">
                              {product.coler}  Size: {product.size}
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="mt-3 flex items-center">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(e, product._id, Math.max(1, product.quantity - 1));
                                }}
                                className="px-2 py-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-l-lg transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <FaMinus size={12} />
                              </button>

                              <span className="px-2 text-center w-8 text-sm font-medium">
                                {product.quantity}
                              </span>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(e, product._id, product.quantity + 1);
                                }}
                                className="px-2 py-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-r-lg transition-colors"
                                aria-label="Increase quantity"
                              >
                                <FaPlus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price and Remove Button */}
                        <div className="flex flex-col items-center justify-between h-full">
                          <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
                            {product.fullPrice.toFixed(2)} Dh
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(e, { id: product._id, color: product.color, size: product.size });
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            aria-label="Remove item"
                          >
                            <FaTrashAlt size={22} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <MdRemoveShoppingCart className="mx-auto text-gray-300 text-5xl mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
                  <button
                    onClick={() => navigate('/shop')}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Shop Now
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-md mt-6 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-yellow-500 mr-2 rounded-full"></span>
                Order Summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items Subtotal</span>
                  <span className="font-medium">{totalItemPrice.toFixed(2)} Dh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">{deliveryCost.toFixed(2)} Dh</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-blue-600">{(totalItemPrice + deliveryCost).toFixed(2)} Dh</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 bg-blue-600">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <span className="w-2 h-6 bg-white mr-2 rounded-full"></span>
                  Shipping Information
                </h2>
              </div>

              <div className="p-6">
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setLastname(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+212 6 12 34 56 78"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      placeholder="123 Main Street"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <Listbox value={selectedCity} onChange={setSelectedCity}>
                      <div className="relative">
                        <Listbox.Button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-left focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                          {selectedCity || "Select your city"}
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg py-1 max-h-60 overflow-auto">
                          {cities.map((city, index) => (
                            <Listbox.Option
                              key={index}
                              value={city}
                              className={({ active }) => `${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'} cursor-pointer px-4 py-2`}
                            >
                              {city}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Payment Method</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="relative">
                        <input
                          type="radio"
                          name="payment"
                          value="creditCard"
                          checked={selected === "creditCard"}
                          onChange={() => setSelected("creditCard")}
                          className="sr-only peer"
                        />
                        <div className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-blue-300 transition-colors">
                          <PiCreditCardFill className="text-3xl text-blue-500 mb-2" />
                          <span className="text-sm font-medium">Credit Card</span>
                        </div>
                      </label>

                      <label className="relative">
                        <input
                          type="radio"
                          name="payment"
                          value="cashOnDelivery"
                          checked={selected === "cashOnDelivery"}
                          onChange={() => setSelected("cashOnDelivery")}
                          className="sr-only peer"
                        />
                        <div className="flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-red-500 peer-checked:bg-red-50 hover:border-red-300 transition-colors">
                          <BsCashCoin className="text-3xl text-red-500 mb-2" />
                          <span className="text-sm font-medium">Cash on Delivery</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      sendToOrder();
                    }}
                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-md flex items-center justify-center"
                  >
                    <span className="mr-2">Place Order</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;