import axios from "axios";
import brandLogo from "../../assets/epic7ata-logo.png";
import pic from "../../assets/pic3.jpg"
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaGoogle, FaApple, FaEye, FaEyeSlash } from "react-icons/fa6";

const Signup = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const { register, handleSubmit, getValues, formState: { errors } } = useForm();


  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setMessage(null);

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/signUp', data);

      setMessage({ type: "success", text: "You're registered successfully!" });

      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {

      setMessage({ type: "error", text: "Failed to Sign up. Please try again" });
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-2xl font-medium text-center text-gray-800 mb-2">Create an Account</h2>
          <div className="relative w-full">
            <label htmlFor="fullName" className="text-base font-medium">Fullname:</label>
            <input
              {...register('fullName', { required: 'Name is required' })}
              type="text"
              placeholder="Enter your Fullname"
              className="w-full px-4 py-3 border rounded-lg focus:ring-4 focus:ring-blue-500 mt-1 "
            />
            {errors.fullName && <p className="text-red-500 text-sm font-medium">* {errors.fullName.message}</p>}
          </div>

          <div className="relative w-full">
            <label htmlFor="email" className="text-base font-medium">Email:</label>
            <input
              {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid Email' } })}
              type="email"
              placeholder="Enter your Email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-4 focus:ring-blue-500 mt-1 "


            />
            {errors.email && <p className="text-red-500 text-sm font-medium">* {errors.email.message}</p>}
          </div>


          <div className="relative w-full">
            <label htmlFor="password" className="text-base font-medium">Password:</label>

            <input
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: "At least 6 characters" } })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              className="w-full px-4 py-3 border rounded-lg focus:ring-4 focus:ring-blue-500 mt-1 "
            />
            {errors.password && <p className="text-red-500 text-sm font-medium">* {errors.password.message}</p>}

            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-11 text-xl text-gray-400 hover:text-blue-500 duration-100">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative w-full">

            <label htmlFor="confirmPassword" className="text-base font-medium">Confirm password:</label>
            <input
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: (value) => value === getValues('password') || "Passwords do not match"
              })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter your Password again"
              className="w-full px-4 py-3 border rounded-lg focus:ring-4 focus:ring-blue-500 mt-1 "
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm font-medium">* {errors.confirmPassword.message}</p>}

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-11 text-xl text-gray-400 hover:text-blue-500 duration-100">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 duration-150 mt-3 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-sm text-gray-600 mt-4 text-center w-[300px]">
            Aready have an account
            <Link to="/login" className="text-blue-600 mx-1 font-semibold hover:underline hover:font-bold hover:underline-offset-2"> Log In </Link>
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

        {/* <p className="text-sm text-gray-600 mt-4">Or log in with:</p>

        <div className="flex justify-center items-center gap-4 mt-2">
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

export default Signup;
