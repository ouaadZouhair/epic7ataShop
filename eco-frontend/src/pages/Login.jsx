import brandLogo from '../assets/epic7ata-logo-white.png';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { FaGoogle, FaApple  } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";


const Signup = () => {
  return (
    <div className="relative bg-fixed h-screen w-full bg-gradient-to-bl from-blue-700 to-blue-500 flex items-center justify-center">
      <nav className='absolute top-0 w-full h-16 flex justify-between items-center text-white px-4'>
        <div className='flex items-center group gap-2'>
          <FaArrowLeft className='text-xl text-white group-hover:text-2xl duration-100'/>
          <Link to='/' className='text-xl font-normal '>Home</Link>
        </div>
        <img src={brandLogo} alt="brand Logo" className='w-12 h-12 object-cover' />
      </nav>

      <div className="bg-white rounded-2xl shadow-lg p-8 w-96 flex flex-col items-center">
        <form className="w-full flex flex-col gap-4">
          <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button className="w-full bg-gray-950 text-white py-2 rounded-lg hover:bg-blue-700 transition">Log In</button>
        </form>
        <p className="text-sm text-gray-600 mt-4">Or log in with:</p>
        <div className="flex gap-4 mt-2">
          <button className="flex items-center justify-center gap-2 bg-white text-gray-700 border-2 border-gray-200 px-4 py-2 mx-auto rounded-lg text-lg text-semibold hover:text-white hover:bg-red-600 hover:border-red-600 transition">
            <FaGoogle /> Gmail
          </button>
          <button className="flex items-center justify-center gap-2 bg-white text-gray-700 border-2 border-gray-200 px-4 py-2 mx-auto rounded-lg text-lg text-semibold hover:text-white hover:bg-gray-950 hover:border-white transition">
            <FaApple  /> Apple
          </button>
          <button className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg text-lg text-semibold hover:bg-blue-700 hover:border-blue-700 hover:text-white transition">
            <FaMeta /> Meta
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-4">Don't have an account?  <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Signup;
