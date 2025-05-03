import { RevenueChart, OrderStatusChart, Skeleton } from "../../../components/imports";
import { FaUser, FaChartLine, FaShoppingCart, FaFileAlt } from "react-icons/fa";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import useFetch from '../../../Hooks/useFetch.jsx';

const DashHome = () => {
  const apiBaseUrl = 'http://localhost:3000/api/v1/analytics';
  
  const { data: rev, loading: revLoading, error: revError } = useFetch(`${apiBaseUrl}/revenue`);
  const { data: orders, loading: ordersLoading, error: ordersError } = useFetch(`${apiBaseUrl}/orders/count`);
  const { data: products, loading: productsLoading, error: productsError } = useFetch(`${apiBaseUrl}/products/count`);
  const { data: users, loading: usersLoading, error: usersError } = useFetch(`${apiBaseUrl}/client/count`);

  // Mock percentage changes - in a real app these would come from your API
  const percentageChanges = {
    revenue: 12.5,
    clients: 8.2,
    orders: -3.4,
    products: 5.7
  };

  // Stats card component
  const StatCard = ({ icon, title, value, loading, error, color, change }) => (
    <div className={`flex flex-col w-full h-full bg-white rounded-xl shadow-sm p-3 border-l-4 ${color} hover:shadow-md transition-all duration-200`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          {loading ? (
            <Skeleton className="h-8 w-24 mt-2" />
          ) : error ? (
            <span className="text-red-500 text-sm mt-2">Error loading data</span>
          ) : (
            <span className="text-2xl font-bold text-gray-800 mt-1">
              {title.includes('Revenue') ? `${value} Dhs` : value}
            </span>
          )}
        </div>
        <div className={`p-1 rounded-lg ${color.replace('border-', 'bg-').replace('-500', '-50')}`}>
          {icon}
        </div>
      </div>
      
      {!loading && !error && (
        <div className="flex items-center mt-4">
          <span className={`text-sm font-medium ${
            change >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {change >= 0 ? (
              <FiTrendingUp className="inline mr-1" />
            ) : (
              <FiTrendingDown className="inline mr-1" />
            )}
            {Math.abs(change)}%
          </span>
          <span className="text-xs text-gray-500 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full  space-y-6">

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          icon={<FaChartLine className={`text-green-500 text-xl`} />}
          title="Total Revenue"
          value={rev}
          loading={revLoading}
          error={revError}
          color="border-green-500"
          change={percentageChanges.revenue}
        />
        
        <StatCard
          icon={<FaUser className={`text-blue-500 text-xl`} />}
          title="Total Clients"
          value={users}
          loading={usersLoading}
          error={usersError}
          color="border-blue-500"
          change={percentageChanges.clients}
        />
        
        <StatCard
          icon={<FaFileAlt className={`text-red-500 text-xl`} />}
          title="Total Orders"
          value={orders}
          loading={ordersLoading}
          error={ordersError}
          color="border-red-500"
          change={percentageChanges.orders}
        />
        
        <StatCard
          icon={<FaShoppingCart className={`text-amber-500 text-xl`} />}
          title="Total Products"
          value={products}
          loading={productsLoading}
          error={productsError}
          color="border-amber-500"
          change={percentageChanges.products}
        />
      </div>

      {/* Charts Section */}
      <div className="flex justify-around items-center gap-2 w-full h-[450px]">
         <RevenueChart />
        
        <OrderStatusChart />  
      </div>
    </div>
  );
};

export default DashHome;