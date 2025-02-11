import { FaTshirt } from "react-icons/fa";
import { GiHoodie, GiBilledCap } from "react-icons/gi";
import { ImMug } from "react-icons/im";



const Products = () => {
  return (
    <>
      <h1 className="flex justify-center items-center text-3xl lg:text-5xl font-bold w-full pt-14 pb-4">Our Products</h1>
      <div className="flex flex-wrap lg:flex-nowrap justify-around items-center gap-8 py-5 w-full lg:w-[55%] mx-auto">
        <div className="flex justify-center items-center w-[120px] h-w-[120px] lg:w-[150px] lg:h-[150px] text-white border-4 border-gray-900 bg-gray-900 p-1 rounded-full cursor-pointer hover:scale-110 duration-100 shadow-lg">
          <FaTshirt className="text-4xl lg:text-7xl" />
        </div>
        <div className="flex justify-center items-center  w-[120px] h-w-[120px] lg:w-[150px] lg:h-[150px] text-white border-4 border-gray-900 bg-gray-900 p-1 rounded-full cursor-pointer hover:scale-110 duration-100 shadow-lg">
          <GiHoodie className= "text-5xl lg:text-8xl" />
        </div>
        <div className="flex justify-center items-center  w-[120px] h-w-[120px] lg:w-[150px] lg:h-[150px] text-white border-4 border-gray-900 bg-gray-900 p-1 rounded-full cursor-pointer hover:scale-110 duration-100 shadow-lg">
          <GiBilledCap className="text-4xl lg:text-7xl" />
        </div>
        <div className="flex justify-center items-center  w-[120px] h-w-[120px] lg:w-[150px] lg:h-[150px] text-white border-4 border-gray-900 bg-gray-900 p-1 rounded-full cursor-pointer hover:scale-110 duration-100 shadow-lg">
          <ImMug className="text-4xl lg:text-7xl" />
        </div>
      </div>
    </>

  )
}

export default Products 