import { TbTruckDelivery } from "react-icons/tb";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLogoTiktok } from "react-icons/io5";
import { FiInstagram } from "react-icons/fi";
import { IoMdMail } from "react-icons/io";


const TopNav = () => {
    return (
        <div className="bg-black/90 w-full h-auto py-3 md:py-0 md:h-14 flex flex-col md:flex-row justify-start md:justify-between items-center px-0 md:px-12 gap-2">
            <div>
                <span className="flex justify-between items-center gap-2">
                    <TbTruckDelivery className="text-2xl md:text-3xl text-white" />
                    <h3 className="text-sm md:text-lg text-white font-light">Fast and reliable delivery in all cities of Morocco</h3>
                </span>
            </div>
            <div>
                <ul className="flex justify-between items-center text-2xl text-white gap-3">
                    <li className=" cursor-pointer hover:scale-125 duration-100"><IoLogoWhatsapp /></li>
                    <li className=" cursor-pointer hover:scale-125 duration-100" ><IoLogoTiktok /></li>
                    <li className=" cursor-pointer hover:scale-125 duration-100"><FiInstagram /></li>
                    <li className=" cursor-pointer hover:scale-125 duration-100"><IoMdMail /></li>
                </ul>
            </div>
        </div>
    );
}

export default TopNav;