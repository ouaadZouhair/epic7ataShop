import brandLogo from '../assets/epic7ata-logo.png';
import bg1 from '../assets/bg1.jpg'
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { FaGoogle, FaApple } from "react-icons/fa";


const Login = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/'); // Redirect if already logged in
    }
  }, [user]);

  const onSubmit = async (data) => {
    setMessage(null);
    setLoading(true);

    try {
      const success = await login(data);
      if (success) {
        setMessage({ type: "success", text: "Logged in successfully!" });
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage({ type: "error", text: "Invalid email or password!" });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Login failed!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${bg1})` }} className="bg-cover bg-top h-screen w-full flex items-center justify-end">
      {message && (
        <p
          className={`absolute w-80 top-16 right-1/2 -translate-x-1/2  text-lg font-semibold p-3 border-l-8 rounded-xl ${message.type === "error" ? "text-red-500 border-red-500 bg-red-200" : "text-green-500 border-green-500 bg-green-200"} mb-2`}
          role="alert"
          aria-live="assertive"
        >
          {message.text}
        </p>
      )}
      <nav className='absolute top-0 w-full h-16 flex justify-between items-center text-white px-4'>
        <button className='flex items-center group gap-2 bg-transparent group duration-100' onClick={() => navigate('/')}>
          <FaArrowLeft className='text-xl group-hover:text-3xl duration-100' />
          <span className='text-xl font-base group-hover:font-bold duration-100 '>Go back to Home page</span>
        </button>
        <img src={brandLogo} alt="brand Logo" className='w-12 h-12 object-cover' />
      </nav>


      <div className="bg-white rounded-bl-full shadow-lg p-10 w-[700px] h-full flex flex-col justify-start items-end pr-28 ">


        <form className="w-[300px] flex flex-col justify-center items-center gap-1 mt-20" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Log in to Account</h2>
          <div className="relative w-full">
            <label htmlFor="email" className='text-base font-medium'>Email:</label>
            <input
              {...register('email', { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid Email' } })}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-4 focus:ring-blue-500 mt-1 "
            />
            {errors.email && <p className='text-red-500 text-sm font-medium'>* {errors.email.message}</p>}

          </div>

          <div className="relative w-full">
            <label htmlFor="password" className='text-base font-medium'>Password:</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-4 focus:ring-blue-500 mt-1 "
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className='text-red-500 text-sm font-medium'>* {errors.password.message}</p>}
          </div>

          <button
            className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg text-lg font-semibold mt-4 hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* <p className="text-sm text-gray-600 mt-4">Or log in with:</p> */}

        {/* <div className="flex justify-center items-center gap-4 mt-2">
          <button className="flex items-center justify-center gap-2 w-12 h-12 bg-red-500 text-white text-xl border-2 border-red-500 p-2 mx-auto rounded-full text-semibold hover:text-white hover:bg-red-600 hover:border-red-600 hover:scale-105 transition">
            <FaGoogle />
          </button>
          <button className="flex items-center justify-center gap-2 w-12 h-12 bg-gray-950 text-white border-2 border-gray-950 p-2 mx-auto rounded-full text-xl text-semibold hover:text-white hover:bg-gray-800 hover:border-gray-800 hover:scale-105 transition">
            <FaApple />
          </button>
        </div> */}

        <p className="text-sm text-gray-600 mt-4 w-[300px] text-center">
          Don't have an account?
          <Link
            to="/signup"
            className="text-blue-600 mx-1 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
