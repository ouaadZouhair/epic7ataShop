import axios from "axios";
import brandLogo from "../assets/epic7ata-logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaGoogle, FaApple, FaEye, FaEyeSlash } from "react-icons/fa6";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const API_URL = 'http://localhost:3000/api/v1/auth/signUp'

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!validateEmail(email)) {
      setMessage({ type: "error", text: "Invalid email format!" });
      return;
    }
    if (password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters!" });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/auth/signUp', {
        fullName,
        email,
        password,
      });

      setMessage({ type: "success", text: "User registered successfully!" });

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.message || "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-fixed min-h-screen w-full flex items-center justify-center">
      <nav className="absolute top-0 w-full h-16 flex justify-between items-center px-4">
        <button className="flex items-center gap-2 text-black hover:text-blue-500 transition">
          <FaArrowLeft className="text-xl hover:scale-110" />
          <Link to="/" className="text-lg font-medium hover:underline">Go back to Home</Link>
        </button>
        <img src={brandLogo} alt="Brand Logo" className="w-12 h-12 object-cover" />
      </nav>

      <div className="bg-gradient-to-t from-white to-gray-100 rounded-2xl shadow-lg p-8 w-96 flex flex-col items-center">
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
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 text-gray-500">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
