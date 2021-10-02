import { useEffect } from 'react';
import socketIoClient from 'socket.io-client';

const useSocket = () => {
  useEffect(() => {
    // path without docker is like this
    // { path: 'http://127.0.0.1:3000' }
    const socket = socketIoClient({ path: '/socket.io' });

    socket.emit('client:connect');

    socket.on('notify:api:accept:client:connect', () => {
      console.log('received from api!');
    });
  }, []);
};

export default useSocket;
