import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext.jsx';
import { HiMiniHome, HiShoppingCart } from "react-icons/hi2";
import { FaFileAlt, FaUser } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";


const NavDashboard = () => {

    const navLinks = [
        { path: '', text: 'Dashboard', icon: <HiMiniHome className="text-2xl" /> },
        { path: 'products', text: 'Products', icon: <HiShoppingCart className="text-2xl" /> },
        { path: 'orders', text: 'Orders', icon: <FaFileAlt className="text-2xl" /> },
        { path: 'analytics', text: 'Analytics', icon: <FaChartSimple className="text-2xl" /> },
        { path: 'clients', text: 'Clients', icon: <FaUser className="text-2xl" /> },
    ];

    const { user, logout } = useAuth();

    return (
        <nav className='flex flex-col justify-around items-center px-4 py-2 h-[650px] w-[250px] bg-blue-500 text-white rounded-xl shadow-lg'>

            <Link to="/" className='text-4xl font-semibold italic '>Epic7ata</Link>

            <div className='flex flex-col gap-3 w-full h-[350px] '>

                {navLinks.map((link) => (

                    <NavLink
                        key={link.path}
                        to={link.path}
                        end
                        className={({ isActive }) => 
                            `flex flex-row items-center justify-start gap-3 px-4 py-3 w-full hover:bg-white hover:text-blue-500 hover:scale-105 duration-150 rounded-lg transition ${
                              isActive ? 'bg-white text-blue-500' : 'text-white'
                            }`
                        }
                    >
                        {link.icon}
                        <span className='text-lg font-medium'>{link.text}</span>
                    </NavLink>

                ))}

            </div>

            <button onClick={logout} aria-label="Logout" className="flex justify-center items-center text-lg font-semibold px-4 py-3 rounded-lg w-full  hover:scale-105 hover:bg-red-500 duration-150"> <TbLogout className='text-2xl' /> <span>Logout</span></button>

        </nav>
    )
}

export default NavDashboard