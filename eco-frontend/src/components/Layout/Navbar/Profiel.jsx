import React from 'react'
import { useAuth } from '../../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'



export const Profiel = ({data}) => {
    
    const navigate = useNavigate()

    const handleNavigation = (path) => {
        navigate(path)
    }


    const { logout } = useAuth()
    return (
        <div className="absolute top-16 right-16 z-50 bg-white shadow-lg rounded-md w-60 overflow-hidden">
            <p className=" font-semibold px-4 py-2"> {data.fullName}</p>
            <span className='text-base text-gray-700 px-4 capitalize' >{data.role}</span>
            <p className="text-sm text-gray-500 px-4 py-2">{data.email}</p>
            { data.role === 'admin' ? (
                <button
                className="text-white font-semibold mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 duration-100"
                onClick={() => handleNavigation('/dashboard')}
            >
                My Dashboard
            </button>
            ) : (
                <button
                className="text-white font-semibold mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 duration-100"
                onClick={() => handleNavigation('/orders')}
            >
                My Orders
            </button>
            )}
            
            <button
                className="text-white font-semibold  w-full py-2 bg-red-600 hover:bg-red-700 duration-100"
                onClick={logout}
            >
                Logout
            </button>
        </div>
    )
}