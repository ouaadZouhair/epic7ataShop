// src/pages/Admin/OrderDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Button, Tag, Spin, Divider, Badge, Tabs } from 'antd';
import { ArrowLeftOutlined, UserOutlined, EnvironmentOutlined, CreditCardOutlined } from '@ant-design/icons';
import { fetchAllOrders } from '../../../redux/slice/CheckoutSlice';
import moment from 'moment';

const OrderDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const { order: orders } = useSelector((state) => state.order);
    const order = orders.find(o => o._id === orderId);
    const BASE_URL = "http://localhost:3000";

    // useEffect(async () => {
    //     try {
    //         await dispatch(fetchAllOrders()).unwrap();
    //     } catch (error) {
    //         console.error("Failed to fetch orders:", error);
    //     }
    // }, [dispatch])

    const statusColors = {
        Pending: 'blue',
        Processing: 'yellow',
        Printing: 'cyan',
        Delivering: 'orange',
        Completed: 'green',
        Canceled: 'red'
    };

    if (!order) {
        return (
            <div className="flex justify-center items-center h-full">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="w-full p-3">
            <div className="max-w-7xl mx-auto">
                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Side - Products */}
                    <div className="lg:w-2/3 bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Products ({order.products.length})</h2>
                            <Tag color={statusColors[order.status]} className="text-sm">
                                {order.status}
                            </Tag>
                        </div>
                        <Divider className="my-4" />

                        {order.products.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-4 mb-6 pb-6 border-b last:border-0">
                                <div className="sm:w-1/4">
                                    <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
                                        {item.product.imageUrls?.frontMockups ? (
                                            <img
                                                src={`${BASE_URL}${item.product.imageUrls.frontMockups}`}
                                                alt={item.product.title}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <span className="text-gray-400">No image</span>
                                        )}
                                    </div>
                                </div>

                                <div className="sm:w-3/4">
                                    <div className="flex justify-between">
                                        <h3 className="text-lg font-medium">{item.product.title}</h3>
                                        <p className="text-lg font-bold">{item.fullPrice.toFixed(2)} Dhs</p>
                                    </div>

                                    <div className="flex gap-4 mt-2">
                                        <div>
                                            <p className="text-gray-500 text-sm">Color</p>
                                            <div className="flex items-center mt-1">
                                                <div
                                                    className={`w-4 h-4 rounded-full mr-2 border border-gray-200 ${item.color === 'white' && 'bg-gray-50'} ${item.color === 'black' && 'bg-black'} ${item.color === 'blue' && 'bg-blue-800'} ${item.color === 'red' && 'bg-red-600'} ${item.color === 'orange' && 'bg-orange-500'} ${item.color === 'yellow' && 'bg-yellow-400'} ${item.color === 'green' && 'bg-green-600'} ${item.color === 'purple' && 'bg-purple-500'} ${item.color === 'gray' && 'bg-gray-400'}`}
                                                // style={{
                                                //     backgroundColor: item.color === 'gray' ? '#9CA3AF' :
                                                //         item.color === 'black' ? '#000000' :
                                                //             item.color === 'white' ? '#FFFFFF' : '#cccccc'
                                                // }}
                                                />
                                                <span className="capitalize">{item.color}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-gray-500 text-sm">Size</p>
                                            <p className="mt-1 capitalize">{item.size}</p>
                                        </div>

                                        <div>
                                            <p className="text-gray-500 text-sm">Quantity</p>
                                            <p className="mt-1">{item.quantity}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-gray-500 text-sm">Price per item</p>
                                        <p className="text-base">{item.product.price.toFixed(2)} Dhs</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className="lg:w-1/3 bg-white rounded-lg shadow-sm p-6 h-fit sticky top-6">
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="Order Summary" key="1">
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order Date</span>
                                        <span>{moment(order.createdAt).format('MMM D, YYYY h:mm A')}</span>
                                    </div>

                                    <Divider className="my-4" />

                                    <div className="flex items-start gap-3">
                                        <UserOutlined className="text-gray-400 mt-1" />
                                        <div>
                                            <h3 className="font-medium">Customer Information</h3>
                                            <p className="mt-1">
                                                {order.firstName} {order.lastName}
                                            </p>
                                            <p className="text-gray-500 text-sm">{order.user.email}</p>
                                            <p className="text-gray-500 text-sm mt-1">{order.phone}</p>
                                        </div>
                                    </div>

                                    <Divider className="my-4" />

                                    <div className="flex items-start gap-3">
                                        <EnvironmentOutlined className="text-gray-400 mt-1" />
                                        <div>
                                            <h3 className="font-medium">Shipping Address</h3>
                                            <p className="mt-1">{order.address}{order.city}</p>
                                        </div>
                                    </div>

                                    <Divider className="my-4" />

                                    <div className="flex items-start gap-3">
                                        <CreditCardOutlined className="text-gray-400 mt-1" />
                                        <div>
                                            <h3 className="font-medium">Payment Method</h3>
                                            <p className="mt-1 capitalize">
                                                {order.paymentMethod === 'creditCard' ? 'Credit Card' : order.paymentMethod}
                                            </p>
                                        </div>
                                    </div>

                                    <Divider className="my-4" />

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>{(order.totalPrice - order.deleviryCost).toFixed(2)} Dhs</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Shipping</span>
                                            <span>{order.deleviryCost.toFixed(2)} Dhs</span>
                                        </div>
                                        <div className="flex justify-between font-bold text-lg pt-2">
                                            <span>Total</span>
                                            <span>{order.totalPrice.toFixed(2)} Dhs</span>
                                        </div>
                                    </div>

                                    <Divider className="my-4" />

                                    <Button
                                        type="primary"
                                        block
                                        onClick={() => window.print()}
                                        className="mb-2"
                                    >
                                        Print Invoice
                                    </Button>

                                    {order.status !== 'Completed' && order.status !== 'Canceled' && (
                                        <Button
                                            danger
                                            block
                                            onClick={() => navigate(`/dashboard/orders/${order._id}/edit`)}
                                        >
                                            Update Status
                                        </Button>
                                    )}
                                </div>
                            </Tabs.TabPane>

                            <Tabs.TabPane tab="Order Notes" key="2">
                                <div className="text-gray-500 italic">
                                    No notes available for this order
                                </div>
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;