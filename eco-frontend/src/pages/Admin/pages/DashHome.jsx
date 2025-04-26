import { RevenueChart, OrderStatusChart, Skeleton } from "../../../components/imports";
import { FaUser, FaChartLine, FaShoppingCart, FaFileAlt } from "react-icons/fa";
import useFetch from '../../../Hooks/useFetch.jsx';
// import { formatCurrency } from '../../../utils/format'; // Add a currency formatter utility

const DashHome = () => {
  const apiBaseUrl = 'http://localhost:3000/api/v1/analytics';
  
  const { data: rev, loading: revLoading, error: revError } = useFetch(`${apiBaseUrl}/revenue`);
  const { data: orders, loading: ordersLoading, error: ordersError } = useFetch(`${apiBaseUrl}/orders/count`);
  const { data: products, loading: productsLoading, error: productsError } = useFetch(`${apiBaseUrl}/products/count`);
  const { data: users, loading: usersLoading, error: usersError } = useFetch(`${apiBaseUrl}/client/count`);

  // Stats card component to reduce repetition
  const StatCard = ({ icon, title, value, loading, error, color }) => (
    <div className={`flex flex-col items-center justify-center w-1/4 h-[115px] bg-white rounded-lg shadow-sm p-5 border-t-4 ${color}`}>
      <div className="flex justify-center items-center gap-2 mb-4">
        {icon}
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      </div>
      {loading ? (
         <Skeleton className="h-8 w-20" />
      ) : error ? (
        <p className="text-red-500 text-sm">Error loading data</p>
      ) : (
        <p className="text-2xl font-bold text-gray-800">
          {title.includes('Revenue') ? `${value} Dhs` : value}
        </p>
      )}
    </div>
  );

  return (
    <section className="w-full h-[600px] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent overflow-y-scroll">
      <div className="flex justify-between items-center gap-1 w-full h-[120px] my-2 pr-1">
        <StatCard
          icon={<FaChartLine className="text-green-500 text-2xl" />}
          title="Total Revenue"
          value={rev} // Access the data property from response
          loading={revLoading}
          error={revError}
          color="border-green-500"
        />
        
        <StatCard
          icon={<FaUser className="text-blue-500 text-2xl" />}
          title="Total Clients"
          value={users}
          loading={usersLoading}
          error={usersError}
          color="border-blue-500"
        />
        
        <StatCard
          icon={<FaFileAlt className="text-red-500 text-2xl" />}
          title="Total Orders"
          value={orders}
          loading={ordersLoading}
          error={ordersError}
          color="border-red-500"
        />
        
        <StatCard
          icon={<FaShoppingCart className="text-amber-500 text-2xl" />}
          title="Total Products"
          value={products}
          loading={productsLoading}
          error={productsError}
          color="border-amber-500"
        />
      </div>

      <div className="flex justify-around items-center gap-2 w-full h-[450px] my-2 pr-1">
        
          <RevenueChart />
       
        
          <OrderStatusChart />
        
      </div>
    </section>
  );
};

export default DashHome;