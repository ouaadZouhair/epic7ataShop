// Dashboard.jsx
import { NavDashboard } from '../imports';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { useEffect, useState } from 'react';
import { IoNotifications } from "react-icons/io5";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [formattedDate, setFormattedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Format date nicely
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormattedDate(new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
      setIsLoading(false);
    }, 500); // Simulate loading

    return () => clearTimeout(timer);
  }, []);

  // Dynamic title based on route
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    return path ? `${path.charAt(0).toUpperCase()}${path.slice(1)}` : 'Dashboard';
  };

  // Protect against undefined user
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-blue-50 overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-[250px]">
        <NavDashboard />
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 ml-[250px] overflow-y-auto">
        <main className="min-h-screen flex flex-col">
          {/* Fixed Header */}
          <header className="sticky top-0 z-10 flex justify-between items-center w-full h-[90px] bg-white shadow-sm p-5">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800">
                {getPageTitle()}
              </h1>
              {isLoading ? (
                <span className="text-sm text-gray-500 animate-pulse">
                  Loading date...
                </span>
              ) : (
                <span className="text-sm text-gray-500">
                  {formattedDate}
                </span>
              )}
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <button className='relative group'>
                <IoNotifications className="text-gray-400 text-2xl group-hover:text-blue-600 group-hover:scale-105 duration-100" />
                <span className='absolute -top-2 -right-1 p-2 w-2 h-2 text-xs mx-auto flex items-center justify-center rounded-full bg-red-500 text-white font-nedium'>1</span>
              </button>
              {isLoading ? (
                <>
                  <span className="text-sm text-gray-500 animate-pulse">
                    Loading date...
                  </span>
                </>
              ) : (
                <>
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 text-xl font-semibold">
                        {user.fullName.charAt(0)}
                      </span>
                    </div>
                    {user && (
                      <span className="absolute bottom-0 right-1 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-700">
                      {user.fullName}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {user.role}
                    </p>
                  </div>
                </>
              )}
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 p-3">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;