// Dashboard.jsx
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../Context/AuthContext';
import { useSocket } from '../../Hooks/useSocket';
import { useEffect, useState } from 'react';
import { NavDashboard } from '../imports';
import { Outlet, useLocation } from 'react-router-dom';
import { IoNotifications, IoChevronDown } from "react-icons/io5";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [formattedDate, setFormattedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useSocket(user?.id);

  useEffect(() => {
    const handleNewNotification = (event) => {
      const notification = event.detail;
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);

      // Optional: Show toast notification
      toast.success(`New notification: ${notification.message}`);
    };

    window.addEventListener('new_notification', handleNewNotification);
    return () => window.removeEventListener('new_notification', handleNewNotification);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const [countRes, notificationsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/v1/notification/count'),
          axios.get('http://localhost:3000/api/v1/notification')
        ]);

        setUnreadCount(countRes.data.count);
        setNotifications(notificationsRes.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (user?.role === 'admin') {
      fetchNotifications();
    }
  }, [user]);

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

  const markAsRead = async (notificationId) => {
    try {
      await axios.patch('http://localhost:3000/api/v1/notification/markAsRead', { notificationId });
      setNotifications(prev =>
        prev.map(n =>
          n._id === notificationId ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch('http://localhost:3000/api/v1/notification/allMarkAsRead');

      // Update local state
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, isRead: true }))
      );

      // Reset unread count
      setUnreadCount(0);

      // Close dropdown (optional)
      setIsNotificationsOpen(false);

    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }

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


  const NotificationsDropdown = () => (
    <div className="absolute top-10 right-0 mt-2 w-96 h-auto bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 ease-out">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
          <button
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">No new notifications</p>
          ) : (
            notifications.map(notification => (
              <div
                key={notification._id}
                className={`p-3 mb-2 rounded-lg cursor-pointer transition-colors duration-200 ${!notification.isRead
                  ? 'bg-blue-50 hover:bg-blue-100'
                  : 'hover:bg-gray-50'
                  }`}
                onClick={() => !notification.isRead && markAsRead(notification._id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${!notification.isRead ? 'bg-blue-500' : 'bg-transparent'
                    }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 font-medium">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-blue-100 overflow-hidden">
      <ToastContainer position="top-right" autoClose={5000} />
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-[200px]">
        <NavDashboard />
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 ml-[200px] overflow-y-auto">
        <main className="min-h-screen flex flex-col">
          {/* Fixed Header */}
          <header className="sticky top-0 z-10 flex justify-between items-center w-full h-[90px] bg-white p-5">
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
            <div className="flex items-center gap-6">
              <div className="relative group">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative"
                >
                  <IoNotifications className="w-6 h-6 text-gray-600 transition-transform hover:scale-105" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {isNotificationsOpen && <NotificationsDropdown />}
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors cursor-pointer">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-md">
                    <span className="text-white font-medium text-lg">
                      {user.fullName.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {user.fullName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user.role}
                  </p>
                </div>
                <IoChevronDown className="w-4 h-4 text-gray-400 transition-transform" />
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 p-3 ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;