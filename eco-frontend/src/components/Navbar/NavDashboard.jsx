import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext.jsx';
import { HiMiniHome } from "react-icons/hi2";
import { HiShoppingCart } from "react-icons/hi2";
import { FaFileAlt } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";



const NavDashboard = () => {

    const { user, logout } = useAuth();

    return (
        <nav className='flex flex-col justify-around items-center px-4 py-2 h-[500px] w-[250px] bg-blue-500 text-white rounded-xl'>

            <a href="" className='text-4xl font-bold'>Epic7ata</a>

            <ul className='flex flex-col gap-5 h-[350px] text-lg font-medium'>
                <li>
                    <Link className='flex flex-row items-center justify-start gap-1' to="">
                        <HiMiniHome className='text-2xl'/>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link className='flex flex-row items-center justify-start gap-1' to="products">
                        <HiShoppingCart className='text-2xl'/>
                        <span>Products</span>
                    </Link>
                </li>
                <li>
                    <Link className='flex flex-row items-center justify-start gap-1' to="orders">
                        <FaFileAlt className='text-2xl'/>
                        <span>Orders</span>
                    </Link>
                </li>
                <li>
                    <Link className='flex flex-row items-center justify-start gap-1' to="analytics">
                        <FaChartSimple className='text-2xl'/>
                        <span>Analytics</span>
                    </Link>
                </li>
                <li>
                    <Link className='flex flex-row items-center justify-start gap-1' to="clients">
                        <FaUser className='text-2xl'/>
                        <span>Clients</span>
                    </Link>
                </li>
            </ul>

            <button onClick={logout} className="flex justify-start items-center text-lg font-semibold hover:scale-105 hover:text-red-500 duration-150"> <TbLogout className='text-2xl'/> <span>Logout</span></button>
            
        </nav>
    )
}

export default NavDashboard