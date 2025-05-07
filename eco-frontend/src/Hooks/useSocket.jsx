// Hooks/useSocket.js
import { useEffect } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (userId) => {
  useEffect(() => {
    if (!userId) return;

    const socket = io('http://localhost:3000', {
      withCredentials: true,
    });

    socket.on('connect', () => {
      console.log('Connected to socket server');
      socket.emit('join_admin_room', userId);
    });

    socket.on('new_notification', (notification) => {
      // This will be handled in Dashboard component
      const event = new CustomEvent('new_notification', { detail: notification });
      window.dispatchEvent(event);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);
};