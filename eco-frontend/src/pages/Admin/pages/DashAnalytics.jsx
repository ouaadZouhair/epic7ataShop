import React from 'react';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiActivity,
  FiPieChart,
  FiCalendar,
  FiFilter,
  FiDownload,
  FiRefreshCw
} from 'react-icons/fi';

const DetailedAnalytics = () => {
  // Sample data - in a real app, this would come from an API
  const metrics = [
    { title: "Total Revenue", value: "$48,752", change: 12.5, icon: <FiDollarSign className="text-blue-500" /> },
    { title: "Total Orders", value: "1,842", change: 8.2, icon: <FiShoppingCart className="text-green-500" /> },
    { title: "Avg. Order Value", value: "$132.45", change: 3.7, icon: <FiActivity className="text-purple-500" /> },
    { title: "Conversion Rate", value: "3.8%", change: 0.9, icon: <FiTrendingUp className="text-orange-500" /> },
    { title: "New Customers", value: "324", change: 5.4, icon: <FiUsers className="text-cyan-500" /> },
    { title: "Repeat Rate", value: "42%", change: -1.2, icon: <FiPieChart className="text-pink-500" /> },
  ];

  const salesData = [
    { month: "Jan", sales: 4000, orders: 320, customers: 280 },
    { month: "Feb", sales: 3000, orders: 290, customers: 250 },
    { month: "Mar", sales: 5000, orders: 420, customers: 380 },
    { month: "Apr", sales: 2780, orders: 240, customers: 210 },
    { month: "May", sales: 1890, orders: 180, customers: 150 },
    { month: "Jun", sales: 2390, orders: 210, customers: 190 },
    { month: "Jul", sales: 3490, orders: 310, customers: 270 },
  ];

  const revenueSources = [
    { name: 'Online Sales', value: 45, color: 'bg-blue-500' },
    { name: 'Retail', value: 30, color: 'bg-green-500' },
    { name: 'Wholesale', value: 15, color: 'bg-purple-500' },
    { name: 'Subscriptions', value: 10, color: 'bg-orange-500' },
  ];

  const topProducts = [
    { name: "Premium T-Shirt", sales: 1250, stock: 42 },
    { name: "Designer Jeans", sales: 980, stock: 18 },
    { name: "Sports Shoes", sales: 875, stock: 7 },
    { name: "Winter Jacket", sales: 620, stock: 0 },
    { name: "Baseball Cap", sales: 540, stock: 35 },
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "John Doe", date: "2023-07-01", amount: "$125.00", status: "Delivered" },
    { id: "#ORD-002", customer: "Jane Smith", date: "2023-07-02", amount: "$89.50", status: "Processing" },
    { id: "#ORD-003", customer: "Robert Johnson", date: "2023-07-02", amount: "$234.00", status: "Shipped" },
    { id: "#ORD-004", customer: "Emily Davis", date: "2023-07-03", amount: "$56.75", status: "Pending" },
    { id: "#ORD-005", customer: "Michael Brown", date: "2023-07-03", amount: "$189.00", status: "Delivered" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col space-y-6">
        {/* Header with filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Detailed Analytics</h1>
            <p className="text-sm text-gray-500">Granular insights and performance metrics</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
              <FiRefreshCw className="text-gray-500" />
              <span className="text-sm">Refresh</span>
            </button>
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
              <FiDownload className="text-gray-500" />
              <span className="text-sm">Export</span>
            </button>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <FiCalendar className="text-gray-500" />
              <select className="text-sm bg-transparent border-none focus:ring-0">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Custom range</option>
              </select>
            </div>
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
              <FiFilter className="text-gray-500" />
              <span className="text-sm">Filters</span>
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{metric.title}</p>
                  <h3 className="text-xl font-bold mt-1">{metric.value}</h3>
                </div>
                <div className={`p-2 rounded-lg ${metric.change >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                  {metric.icon}
                </div>
              </div>
              <div className="mt-3 flex items-center">
                <span className={`text-xs font-medium ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change >= 0 ? (
                    <FiTrendingUp className="inline mr-1" />
                  ) : (
                    <FiTrendingDown className="inline mr-1" />
                  )}
                  {Math.abs(metric.change)}%
                </span>
                <span className="text-xs text-gray-500 ml-1">vs previous period</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Trend Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Sales Trend</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-md">Revenue</button>
                <button className="px-3 py-1 text-xs text-gray-500 rounded-md hover:bg-gray-100">Orders</button>
                <button className="px-3 py-1 text-xs text-gray-500 rounded-md hover:bg-gray-100">Customers</button>
              </div>
            </div>
            <div className="h-80">
              {/* Chart would go here - using simulated bars for demo */}
              <div className="flex items-end h-64 space-x-1 mt-4">
                {salesData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="flex items-end space-x-1 w-full">
                      <div
                        className="w-full bg-blue-500 rounded-t-sm hover:bg-blue-600 transition-colors"
                        style={{ height: `${data.sales / 100}px` }}
                        title={`$${data.sales}`}
                      ></div>
                      <div
                        className="w-full bg-green-500 rounded-t-sm hover:bg-green-600 transition-colors"
                        style={{ height: `${data.orders * 2}px` }}
                        title={`${data.orders} orders`}
                      ></div>
                      <div
                        className="w-full bg-purple-500 rounded-t-sm hover:bg-purple-600 transition-colors"
                        style={{ height: `${data.customers * 2.5}px` }}
                        title={`${data.customers} customers`}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">Revenue</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">Orders</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">Customers</span>
                  </div>
                </div>
                <div className="flex items-center text-green-500 text-xs">
                  <FiTrendingUp className="mr-1" />
                  <span>12.5% increase from last period</span>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Sources */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Revenue Sources</h2>
              <select className="text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-1">
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Quarter</option>
              </select>
            </div>
            <div className="h-80 flex flex-col">
              <div className="flex-grow flex items-center justify-center">
                {/* Pie chart simulation */}
                <div className="relative w-40 h-40 mb-4">
                  {revenueSources.map((source, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 rounded-full border-8 ${source.color} opacity-${100 - (index * 20)}`}
                      style={{
                        clipPath: `circle(50% at 50% 50%)`,
                        transform: `rotate(${index * 90}deg)`,
                        zIndex: revenueSources.length - index
                      }}
                    ></div>
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">100%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {revenueSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${source.color} mr-2`}></div>
                      <span className="text-sm">{source.name}</span>
                    </div>
                    <span className="text-sm font-medium">{source.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold">Top Selling Products</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topProducts.map((product, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.sales}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          product.stock === 0 ? "bg-red-100 text-red-800" :
                          product.stock < 10 ? "bg-yellow-100 text-yellow-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          {product.stock === 0 ? "Out of Stock" : product.stock < 10 ? "Low Stock" : "In Stock"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-gray-50 text-right">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View All Products
              </button>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "Delivered" ? "bg-green-100 text-green-800" :
                          order.status === "Processing" ? "bg-yellow-100 text-yellow-800" :
                          order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                          "bg-gray-100 text-gray-800"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-gray-50 text-right">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View All Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedAnalytics;