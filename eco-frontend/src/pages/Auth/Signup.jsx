import brandLogo from "../../assets/epic7ata-logo.png";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa6";

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
      setMessage({ type: "success", text: "Registered successfully!" });
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMessage({ type: "error", text: "Failed to sign up" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600"
            >
              <FaArrowLeft className="text-sm" />
              <span>Home</span>
            </button>
            <img src={brandLogo} alt="Brand Logo" className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-sm text-gray-600 mb-6">Get started with your free account</p>

          {message && (
            <div className={`mb-4 p-3 text-sm rounded-lg border-l-4 ${
              message.type === "error" 
                ? "bg-red-50 border-red-500 text-red-700" 
                : "bg-green-50 border-green-500 text-green-700"
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
              <input
                {...register('fullName', { required: 'Name required' })}
                type="text"
                placeholder="John Doe"
                className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
                  errors.fullName 
                    ? "border-red-300 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input
                {...register('email', { 
                  required: "Email required", 
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } 
                })}
                type="email"
                placeholder="your@email.com"
                className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
                  errors.email 
                    ? "border-red-300 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <input
                {...register('password', { 
                  required: 'Password required', 
                  minLength: { value: 6, message: "Min 6 characters" } 
                })}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
                  errors.password 
                    ? "border-red-300 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-7 text-gray-400 hover:text-blue-600 text-sm"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
            </div>

            <div className="relative">
              <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                {...register('confirmPassword', {
                  required: 'Confirm password',
                  validate: value => value === getValues('password') || "Passwords don't match"
                })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
                  errors.confirmPassword 
                    ? "border-red-300 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-7 text-gray-400 hover:text-blue-600 text-sm"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>}
            </div>

            <label className="flex items-start mt-2">
              <input 
                type="checkbox" 
                className="h-3 w-3 mt-1 text-blue-600 rounded" 
                required 
              />
              <span className="ml-2 text-xs text-gray-600">
                I agree to the <span className="text-blue-600 hover:underline">Terms</span> and <span className="text-blue-600 hover:underline">Privacy Policy</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg text-sm font-medium text-white ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;