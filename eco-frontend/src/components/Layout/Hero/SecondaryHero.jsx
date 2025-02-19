import Hoodie from '/imgWebpage/1.png'
import Mug from '/imgWebpage/3.png'
import Mug2 from '/imgWebpage/5.png'
import Cap from '/imgWebpage/4.png'

const SecondaryHero = () => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center gap-6 w-full">

        <div className="relative bg-gradient-to-r from-amber-400 to-amber-300 w-[95%] md:w-[350px] lg:w-1/3 h-64 rounded-2xl shadow-lg text-white hover:scale-105 duration-100">
        <div className='absolute flex flex-col justify-center items-start gap-2 top-5 p-4 z-10'>
            <p className='font-light text-2xl'>Proud</p>
            <p className='font-bold text-lg'>With</p>
            <h1 className='text-white/60 text-4xl font-black uppercase'>Epic Hoodie</h1>
            <button className='bg-white font-semibold text-lg text-amber-400 py-3 px-4 rounded-full hover:shadow-lg hover:bg-blue-500 hover:text-white hover:scale-105 duration-100'>Take a Look</button>
        </div>
        <img src={Hoodie} alt="hoodie" className='absolute w-[250px] z-0 -right-4 top-2 rotate-12'/>
        </div>

        <div className=" relative bg-gradient-to-r from-blue-600 to-blue-500 w-[95%] md:w-[350px] lg:w-1/3 h-64 rounded-2xl shadow-lg text-white hover:scale-105 duration-100">
        <div className='absolute flex flex-col justify-center items-start gap-2 top-5 p-4 z-10'>
            <p className='font-light text-2xl'>Enjoy</p>
            <p className='font-bold text-lg'>With</p>
            <h1 className='text-white/60 text-4xl font-black uppercase'>Epic Mug</h1>
            <button className='bg-white font-semibold text-lg text-blue-500 py-3 px-4 rounded-full hover:shadow-lg hover:bg-red-500 hover:text-white hover:scale-105 duration-100'>Take a Look</button>
        </div>
        <img src={Mug} alt="hoodie" className='absolute w-[230px] z-0 -right-7 top-6 rotate-12'/>        
        </div>

        <div className="relative bg-gradient-to-r from-red-600 to-red-500 w-[93%] lg:w-1/3 h-64 md:h-[300px] lg:h-64 rounded-2xl shadow-lg text-white hover:scale-105 duration-100">
        <div className='absolute flex flex-col justify-center items-start gap-2 md:gap-4 lg:gap-2 top-5 p-4 z-10'>
            <p className='font-light text-2xl md:text-3xl lg:text-2xl'>Live</p>
            <p className='font-bold text-lg md:text-xl lg:text-lg'>With</p>
            <h1 className='text-white/60 text-4xl md:text-6xl lg:text-4xl font-black uppercase'>Epic cap</h1>
            <button className='bg-white font-semibold text-lg text-red-500 py-3 px-4 rounded-full hover:shadow-lg hover:bg-amber-400 hover:text-white hover:scale-105 duration-100'>Take a Look</button>
        </div>
        <img src={Cap} alt="hoodie" className='absolute w-[280px] md:w-[450px] lg:w-[230px] z-0 -right-2 -top-7 md:-top-20 lg:-top-3 rotate-12'/>
        </div>
        
    </div>
  )
}

export default SecondaryHero