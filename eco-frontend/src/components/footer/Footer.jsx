import logo from '../../assets/epic7ata-logo-white.png'
import { FaFacebook } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { IoLogoTiktok } from "react-icons/io5";
import { FiInstagram } from "react-icons/fi";
import { FaCcVisa, FaCcPaypal  } from "react-icons/fa";
import { SiMastercard } from "react-icons/si";




const Footer = () => {
    return (
        <footer className='relative flex flex-col gap-2 items-center bg-black/95 text-white w-full pt-6 h-auto -bottom-10'>
            <div className=' flex flex-col md:flex-row justify-around items-start w-full pb-4 px-4'>
                <div className='flex flex-col justify-between items-start w-1/2 md:w-80'>
                    <img src={logo} alt="brand logo" className='w-16 h-16 rounded-lg' />
                    <ul className='flex flex-col justify-between items-start gap-4 text-lg mt-2'>
                        <li className='text-sm lg:text-lg w-[180px] lg:w-[250px]'>07, Rue Resistence Ocean Rabat Maroc</li>
                        <li className='text-sm lg:text-lg font-semibold'>epic7ata@gmail.com</li>
                        <li className='text-lg lg:text-xl font-bold'>+212 716 486 381</li>
                        <li>
                            <ul className='flex justify-between items-center gap-5 text-lg md:text-xl lg:text-2xl'>
                                <li className='hover:scale-125 duration-100 cursor-pointer'><FaFacebook /></li>
                                <li className='hover:scale-125 duration-100 cursor-pointer'><FiInstagram /></li>
                                <li className='hover:scale-125 duration-100 cursor-pointer'><IoLogoWhatsapp /></li>
                                <li className='hover:scale-125 duration-100 cursor-pointer'><IoLogoTiktok /></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className='flex realtive flex-col justify-between items-start mt-4 w-80'>
                    <h1 className="relative text-lg lg:text-2xl md:text-xl font-light after:content-[''] after:absolute after:bg-white after:-bottom-3 after:left-0 after:w-2/4 rounded-sm after:h-[3px]">Website pages</h1>
                    <ul className='text-sm lg:text-lg font-normal flex flex-col gap-2 mt-6'>
                        <li>Home</li>
                        <li>Print</li>
                        <li>Shop</li>
                        <li>About</li>

                    </ul>
                </div>
                <div className='flex realtive flex-col justify-between items-start mt-4 w-80'>
                    <h1 className="relative text-lg lg:text-2xl md:text-xl font-light after:content-[''] after:absolute after:bg-white after:-bottom-3 after:left-0 after:w-2/4 rounded-sm after:h-[3px]">Help & Information</h1>
                    <ul className='text-sm lg:text-lg font-normal flex flex-col gap-2 mt-6'>
                        <li>FAQs</li>
                        <li>Help Center</li>
                        <li>Contact</li>
                    </ul>
                </div>
                <div className='flex realtive flex-col justify-between items-start mt-4 w-80'>
                    <h1 className="relative text-lg lg:text-2xl md:text-xl font-light after:content-[''] after:absolute after:bg-white after:-bottom-3 after:left-0 after:w-2/4 rounded-sm after:h-[3px]">Terms & Conditions</h1>
                    <ul className='text-sm lg:text-lg font-normal flex flex-col gap-2 mt-6'>
                        <li>Privacy Policy</li>
                        <li>Products returns</li>
                    </ul>
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center w-full px-10 py-4 border-t border-gray-600'>
                <p className='font-semibold text-center text-sm md:text-start text-normal md:text-normal'>© 2025 Created by <a href="https://zouhairod.netlify.app/" className='font-bold text-normal hover:text-blue-500 hover:scale-110 hover:underline duration-100'>Zouhair Ouaad</a>. All rights reserved.</p>
                <ul className='flex justify-between items-center gap-2 text-white text-lg md:text-xl lg:text-2xl'>
                    <li><FaCcVisa/></li>
                    <li><SiMastercard/></li>
                    <li><FaCcPaypal/></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer 