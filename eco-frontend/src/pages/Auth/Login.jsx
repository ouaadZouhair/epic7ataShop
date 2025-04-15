import brandLogo from '../../assets/epic7ata-logo.png';
import pic from "../../assets/pic1.jpg"
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { FaGoogle, FaApple } from "react-icons/fa";


const Login = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(user)
  //   if (user && user.role === 'admin') {
  //     navigate('/dashboard');
  //   }else {
  //     navigate('/')
  //   }
  // }, [user]);

  // const onSubmit = async (data) => {
  //   setMessage(null);
  //   setLoading(true);

  //   try {
  //     const success = await login(data);
  //     if (success) {
  //       setMessage({ type: "success", text: "Logged in successfully!" });
  //       setTimeout(() => {
  //         console.log(user)
  //         navigate("/dashboard")
  //       }, 1000);
  //     } else {
  //       setMessage({ type: "error", text: "Invalid email or password!" });
  //     }
  //   } catch (err) {
  //     setMessage({ type: "error", text: err.message || "Login failed!" });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onSubmit = async (data) => {
    setMessage(null);
    setLoading(true);

    try {
      await login(data); 
      setMessage({ type: "success", text: "Logged in successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Login failed!" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  return (
    <div className="bg-gray-50 h-screen w-full flex items-center justify-center">

      <nav className='absolute top-0 w-full h-16 flex justify-between items-center text-gray-800 px-4'>
        <button className='flex items-center group gap-2 bg-transparent hover:text-blue-500 group duration-100' onClick={() => navigate('/')}>
          <FaArrowLeft className='text-xl group-hover:text-3xl duration-100' />
          <span className='text-xl font-base group-hover:font-bold duration-100 '>Go back to Home page</span>
        </button>
        <img src={brandLogo} alt="brand Logo" className='w-12 h-12 object-cover' />
      </nav>


      <section className="bg-white rounded-3xl shadow-lg w-[1000px] h-auto flex flex-row justify-center items-center overflow-hidden">

        <form className="w-[400px] flex flex-col justify-center items-center gap-1 p-8" onSubmit={handleSubmit(onSubmit)}>
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
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 duration-150 mt-3 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-sm text-gray-600 mt-4 w-[300px] text-center">
            Don't have an account?
            <Link
              to="/signup"
              className="text-blue-600 mx-1 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>

        <div className="relative w-[600px] h-[550px] bg-cover bg-center" style={{ backgroundImage: `url(${pic})` }} >
          {message && (
            <p
              className={`absolute w-80 top-5 -left-0 translate-x-1/2 text-lg font-semibold p-3 border-l-8 rounded-xl ${message.type === "error" ? "text-red-500 border-red-500 bg-red-200" : "text-green-500 border-green-500 bg-green-200"} mb-2`}
              role="alert"
              aria-live="assertive"
            >
              {message.text}
            </p>
          )}
        </div>

        {/* <p className="text-sm text-gray-600 mt-4">Or log in with:</p> */}

        {/* <div className="flex justify-center items-center gap-4 mt-2">
          <button className="flex items-center justify-center gap-2 w-12 h-12 bg-red-500 text-white text-xl border-2 border-red-500 p-2 mx-auto rounded-full text-semibold hover:text-white hover:bg-red-600 hover:border-red-600 hover:scale-105 transition">
            <FaGoogle />
          </button>
          <button className="flex items-center justify-center gap-2 w-12 h-12 bg-gray-950 text-white border-2 border-gray-950 p-2 mx-auto rounded-full text-xl text-semibold hover:text-white hover:bg-gray-800 hover:border-gray-800 hover:scale-105 transition">
            <FaApple />
          </button>
        </div> */}


      </section>
    </div>
  );
};

export default Login;
