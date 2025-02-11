import './Categories.css'
import { IoCarSport } from "react-icons/io5";
import { IoMusicalNotes } from "react-icons/io5";
import { BiSolidCameraMovie } from "react-icons/bi";
import animeLogo from "../../assets/anime-logo.png"


import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const Categories = () => {
    return (
        <>
        <h1 className='text-4xl lg:text-5xl font-bold text-center py-14'>Categories</h1>
        <div className='flex justify-between items-center gap-3 pb-16'>
            <div className="card">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="card-inner flex justify-center items-center">
                <div className='w-40 h-40 flex justify-center items-center'>
                    <img src={animeLogo} alt="" />
                </div>
                </div>
            </div>

            <div className="card">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="card-inner flex justify-center items-center">
                <div className='text-8xl font-bold text-blue-500'><IoMusicalNotes/></div>
                </div>
            </div>

            <div className="card">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="card-inner flex justify-center items-center">
                <div className='text-8xl font-bold text-blue-500'><IoCarSport/></div>
                </div>
            </div>

            <div className="card">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="card-inner flex justify-center items-center">
                    <div className=' text-8xl font-bold text-blue-500'>
                    <BiSolidCameraMovie/>
                    </div>
                </div>
            </div>

        </div>
        
        </>
        
    )
}

export default Categories