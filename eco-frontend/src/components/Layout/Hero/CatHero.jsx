import { MdOutlineSupportAgent, MdOutlinePayment } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { GiStarFormation } from "react-icons/gi";
import { BsStars } from "react-icons/bs";


const CatHero = () => {
    return (
        <div className="flex flex-wrap flex-col md:flex-row gap-4 lg:flex-nowrap justify-around items-center md:gap-0 lg:gap-8 py-5 w-[100%]  bg-transprent">
            <div className="flex justify-center items-center gap-3 w-full md:w-1/2 lg:w-1/3 text-black">
                <MdOutlineSupportAgent className="text-5xl md:text-5xl lg:text-6xl text-blue-700" />
                <h3 className="text-gray-600 font-normal text-xl w-2/3 lg:w-32">Support 24/7</h3>
            </div>

            <div className="flex justify-center items-center gap-3 w-full md:w-1/2 lg:w-1/3 text-black">
                <TbTruckDelivery  className="text-5xl md:text-5xl lg:text-6xl text-blue-700" />
                <h3 className="text-gray-600 font-normal text-xl w-2/3 lg:w-32">Delivery over all Morocoo cites</h3>
            </div>

            <div className="flex justify-center items-center gap-3 w-full md:w-1/2 lg:w-1/3 text-black">
                <MdOutlinePayment  className="text-5xl md:text-5xl lg:text-6xl text-blue-700" />
                <h3 className="text-gray-600 font-normal text-xl w-2/3 lg:w-32">Secure Payment</h3>
            </div>

            <div className="flex justify-center items-center gap-3 w-full md:w-1/2 lg:w-1/3 text-black">
                <BsStars  className="text-5xl md:text-5xl lg:text-6xl text-blue-700" />
                <h3 className="text-gray-600 font-normal text-xl w-2/3 lg:w-32">Higth quality products</h3>
            </div>

        </div>
    )
}

export default CatHero