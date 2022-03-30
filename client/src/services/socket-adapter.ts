import { useEffect, useState } from 'react';
import socketIoClient from 'socket.io-client';

export const useSocketAdapter = () => {
  // fixme:any
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    // path without docker is like this
    // { path: 'http://127.0.0.1:3000' }
    const socket = socketIoClient({ path: '/socket.io' });
    setSocket(socket);
  }, []);

  return { socket };
};
