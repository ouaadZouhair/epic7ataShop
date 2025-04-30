// NavDashboard.jsx
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext.jsx';
import { HiMiniHome, HiShoppingCart } from "react-icons/hi2";
import { FaFileAlt, FaUser } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const NavDashboard = () => {
    const navigate = useNavigate();
    const handleNavigation = () => navigate('/shop');
    const { user, logout } = useAuth();

    const navLinks = [
        { path: '', text: 'Dashboard', icon: <HiMiniHome className="text-2xl" /> },
        { path: 'products', text: 'Products', icon: <HiShoppingCart className="text-2xl" /> },
        { path: 'orders', text: 'Orders', icon: <FaFileAlt className="text-2xl" /> },
        { path: 'analytics', text: 'Analytics', icon: <FaChartSimple className="text-2xl" /> },
        { path: 'clients', text: 'Clients', icon: <FaUser className="text-2xl" /> },
    ];

    return (
        <nav className='h-full flex flex-col justify-between  py-6 px-4 bg-blue-500 text-white shadow-lg'>
            <div>
                <Link to="/" className='text-4xl font-normal text-center block mb-8'>Epic7ata</Link>

                <div className='flex flex-col gap-3'>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end
                            className={({ isActive }) =>
                                `flex flex-row items-center justify-start gap-3 px-4 py-3 w-full hover:bg-white hover:text-blue-500 hover:scale-105 duration-150 rounded-lg transition ${isActive ? 'bg-white text-blue-500' : 'text-white'
                                }`
                            }
                        >
                            {link.icon}
                            <span className='text-lg font-medium'>{link.text}</span>
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <button 
                    onClick={handleNavigation} 
                    aria-label="shop" 
                    className="flex justify-start items-center text-lg font-semibold p-2 rounded-lg w-full gap-2 hover:scale-105 hover:bg-green-500 duration-150"
                >
                    <HiShoppingCart className='text-2xl' />
                    <span>Shop</span>
                </button>
                <button 
                    onClick={logout} 
                    aria-label="Logout" 
                    className="flex justify-start items-center text-lg font-semibold p-2 rounded-lg w-full hover:scale-105 gap-2 hover:bg-red-500 duration-150"
                >
                    <TbLogout className='text-2xl' />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    )
}

export default NavDashboard;