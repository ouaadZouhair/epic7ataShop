import {Link} from 'react-router-dom'
import Mockup from '/imgWebpage/7.png'
import './PrintingS.css'

const PrintingS = () => {
    return (
        <section className='relative flex flex-wrap md:flex-nowrap flex-col md:flex-row justify-center items-center rounded-3xl w-[95%] h-[580px] md:h-[400px] mx-auto shadow-xl bg-black bg-gradient-to-l from-black to-white/10 hover:scale-105 my-24 duration-150 '>
            <div className=" absolute -left-10 -bottom-32 md:bottom-0 md:-left-2 lg:left-14 h-full w-72 flex flex-col justify-center items-center">
                <div className='flex flex-col text-red-600/80 text-5xl md:text-6xl lg:text-7xl font-black gap-4 items-end justify-start uppercase text-start z-10'>
                    <h1>Create</h1>
                    <h1>Live</h1>
                    <h1>Proud</h1>
                </div>
            </div>
                <img src={Mockup} alt="mockup" className=' absolute w-[300px] md:w-[400px] lg:w-[400px] left-1/2 -translate-x-1/2 md:translate-x-0 md:left-14 lg:left-48 bottom-0 z-0'/>

            <div className=" absolute right-0 top-1 w-full h-[200px] md:w-1/2 md:h-full flex flex-col justify-center items-center gap-2 md:gap-10 text-white">
                
                <h1 className='text-lg md:text-3xl lg:text-4xl font-bold uppercase'>"Wear Your Passion"</h1>
                <p className='text-sm md:text-lg lg:text-xl font-light text-justify mx-8 leading-loose'>Create your designs on t-shirts, hoodies, caps and mugs that speak to who you are. <br /> Make a statement, live your passion and wear it proudly.</p>
                <Link className='designBtn bg-red-600 text-white hover:bg-white hover:text-red-500 hover:shadow-lg hover:shadow-red-600 font-semibold' to='/print'>Get in touch </Link>
        
            </div>


        </section>
    )
}

export default PrintingS