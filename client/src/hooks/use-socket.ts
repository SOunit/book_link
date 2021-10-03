import { useContext, useEffect, useState } from 'react';
import socketIoClient from 'socket.io-client';
import AuthContext from '../store/auth-context';

const useSocket = () => {
  // fixme:any
  const [socket, setSocket] = useState<any>();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    // path without docker is like this
    // { path: 'http://127.0.0.1:3000' }
    const socket = socketIoClient({ path: '/socket.io' });
    setSocket(socket);

    socket.emit('join', authCtx.token);

    socket.on('notify:api:accept:client:connect', () => {
      console.log('received from api!');
    });
  }, []);

  return { socket };
};

export default useSocket;
