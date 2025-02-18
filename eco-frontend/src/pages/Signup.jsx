import axios from 'axios';
import brandLogo from '../assets/epic7ata-logo.png';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaArrowLeft, FaGoogle, FaApple, FaMeta } from "react-icons/fa6";

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null); // ✅ To show success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/signUp', {
        fullName,
        email,
        password,
      });

      setMessage({ type: "success", text: "User registered successfully!" });
      Navigate()
      console.log("User Created:", response.data);
    } catch (err) {
      setMessage({ type: "error", text: "Something went wrong. Try again!" });
      console.error("API Error:", err);
    }
  };

  return (
    <div className="relative bg-fixed min-h-screen w-full bg-white bottom-0 flex items-center justify-center">
      <nav className='absolute top-0 w-full h-16 flex justify-between items-center text-white px-4'>
        <button className='flex items-center group gap-2 bg-transparent text-black group'>
          <FaArrowLeft className='text-xl group-hover:text-3xl hover:text-blue-500 duration-100' />
          <Link to='/' className='text-lg font-base group-hover:font-semibold duration-100 '>Go back to Home page</Link>
        </button>
        <img src={brandLogo} alt="brand Logo" className='w-12 h-12 object-cover' />
      </nav>


      <div className="bg-gradient-to-t from-white to-gray-100 rounded-2xl shadow-lg shadow-gray-300 p-8 w-96 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create an Account</h2>

        {message && (
          <p className={`text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"} mb-2`}>
            {message.text}
          </p>
        )}

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="flex justify-center items-center w-full bg-blue-700 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
            <Link to="/">Sign Up</Link>
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">Or sign up with:</p>
        <div className="flex justify-center items-center  gap-4 mt-2">
          <button className="flex items-center justify-center gap-2 w-12 h-12 bg-red-500 text-white text-xl border-2 border-red-500 p-2 mx-auto rounded-full text-semibold hover:text-white hover:bg-red-600 hover:border-red-600 hover:scale-105 transition">
            <FaGoogle />
          </button>
          <button className="flex items-center justify-center gap-2 w-12 h-12 bg-gray-950 text-white border-2 border-gray-950 p-2 mx-auto rounded-full text-xl text-semibold hover:text-white hover:bg-gray-800 hover:border-gray-800 hover:scale-105 transition">
            <FaApple />
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Already have an account ?
          <Link
            to="/login"
            className="text-blue-600 mx-1 font-semibold hover:underline"
          >Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
