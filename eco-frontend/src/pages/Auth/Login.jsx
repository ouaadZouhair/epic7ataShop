import brandLogo from '../../assets/epic7ata-logo.png';
import authBg from "../../assets/pic1.jpg"
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
      } else if (user.role === 'client') {
        navigate("/");
      }
    }
  }, [user, navigate]);

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

          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-600 mb-6">Log in to your account</p>

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

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <input
                {...register('password', { required: 'Password required' })}
                type="password"
                placeholder="••••••••"
                className={`w-full px-3 py-2 text-sm rounded-lg border focus:ring-2 focus:outline-none ${
                  errors.password 
                    ? "border-red-300 focus:ring-red-200" 
                    : "border-gray-300 focus:ring-blue-200"
                }`}
              />
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center">
                <input type="checkbox" className="h-3 w-3 text-blue-600 rounded" />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg text-sm font-medium text-white ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;