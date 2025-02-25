import { Link } from "react-router-dom";
import "./HeroSlider.css";
import tshirt from '/imgWebpage/2.png'

const PrimaryHero = () => {
    return (

        <div className="relative bg-gradient-to-r from-gray-400/70 to-gray-200 w-[95%] h-[250px] md:h-[450px] md:w-[93%] lg:w-full rounded-2xl shadow-lg overflow-hidden flex items-center justify-center hover:scale-105 duration-100">
            {/* Large Title Background */}

            {/* T-Shirt Image */}
            <img src={tshirt} alt="T-shirt" className="absolute -right-10 md:right-0 lg:right-6 z-10 w-[230px] md:w-[450px] lg:w-[500px]  max-w-full rotate-12 drop-shadow-xl" />

            {/* Foreground Content */}
            <div className="absolute top-1/2 -translate-y-1/2 left-5 md:left-8 lg:left-6 z-30 flex flex-col justify-start items-start gap-2 md:gap-4 lg:gap-4 text-black">
                <p className="text-light text-sm md:text-xl lg:text-xl w-[200px] md:w-[300px] lg:w-[500px] font-normal">
                    CREATE, LIVE & PROUD
                </p>
                <h3 className="font-semibold md:font-bold lg:font-bold text-2xl md:text-3xl lg:text-5xl">With Your Passion</h3>

                <h1 className="text-white/50 font-black text-5xl md:text-7xl lg:text-9xl uppercase"> Epic Tshirt</h1>

                <Link to="/shop" className="relative bg-red-600 text-white px-4 py-3 lg:px-5 lg:py-4 rounded-full text-sm md:text-lg lg:text-xl font-semibold hover:scale-110 hover:bg-white  hover:text-red-500 duration-100">
                    Show shop
                </Link>
            </div>
        </div>



    );
}

export default PrimaryHero;