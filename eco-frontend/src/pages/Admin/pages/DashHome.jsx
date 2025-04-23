import { RevenueChart, OrderStatusChart } from "../../../components/imports"
import { FaUser, FaChartLine, FaShoppingCart,FaFileAlt } from "react-icons/fa";


const DashHome = () => {
  return (
    <section className="w-full h-[600px] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent overflow-y-scroll">
      
      <div className="flex justify-between items-center gap-1 w-full h-[120px] my-2 pr-1">
        <div className="flex flex-col items-center justify-center w-1/4 h-[115px] bg-white rounded-lg shadow-sm p-5">
          <div className="flex justify-center items-center gap-2 mb-4">
            <FaChartLine className="text-green-500 text-2xl" />
            <h1 className="text-lg font-semibold text-gray-800">Total Revenue</h1>
          </div>
          <p className="text-2xl font-bold text-gray-800">12,345 Dhs</p>
        </div>

        <div className="flex flex-col items-center justify-center w-1/4 h-[115px] bg-white rounded-lg shadow-sm p-5">
          <div className="flex justify-center items-center gap-2 mb-4">
            <FaUser className="text-blue-500 text-2xl" />
            <h1 className="text-lg font-semibold text-gray-800">Total Users</h1>
          </div>
          <p className="text-2xl font-bold text-gray-800">456</p>
        </div>

        <div className="flex flex-col items-center justify-center w-1/4 h-[115px] bg-white rounded-lg shadow-sm p-5">
          <div className="flex justify-center items-center gap-2 mb-4">
            <FaFileAlt className="text-red-500 text-2xl" />
            <h1 className="text-lg font-semibold text-gray-800 ">Total Orders</h1>
          </div>

          <p className="text-2xl font-bold text-gray-800">123</p>
        </div>

        <div className="flex flex-col items-center justify-center w-1/4 h-[115px] bg-white rounded-lg shadow-sm p-5">
          <div className="flex justify-center items-center gap-2 mb-4">
            <FaShoppingCart className="text-amber-400 text-2xl" />
            <h1 className="text-lg font-semibold text-gray-800">Total Products</h1>
          </div>
          <p className="text-2xl font-bold text-gray-800">789</p>
        </div>
      </div>

      <div className="flex justify-around items-center gap-2 w-full h-[450px] my-2 pr-1">
        <RevenueChart />
        <OrderStatusChart />
      </div>
    </section>
  )
}

export default DashHome