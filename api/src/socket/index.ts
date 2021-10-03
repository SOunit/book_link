const socketIo = require('socket.io');

const loginUserIdToSockets = new Map();

const socketServer = (server: any) => {
  const io = socketIo(server);
  io.on('connection', (socket: any) => {
    console.log('socket io connect');
    console.log('on connection socket', socket);

    socket.on('client:connect', () => {
      console.log('client:connect');
      io.to(socket.id).emit('notify:api:accept:client:connect');
    });

    socket.on('join', (loginUserId: string) => {
      console.log('before join', loginUserIdToSockets);
      console.log('loginUserId', loginUserId);

      if (loginUserIdToSockets.has(loginUserId)) {
        // if user exists(one user login by different browser)

        // update existing user data by adding new socket
        const existingUser = loginUserIdToSockets.get(loginUserId);
        existingUser.sockets = [...existingUser.sockets, socket.id];
        loginUserIdToSockets.set(loginUserId, existingUser);
      } else {
        // if user is new
        loginUserIdToSockets.set(loginUserId, {
          loginUserId,
          sockets: [socket.id],
        });
      }

      console.log('after join', loginUserIdToSockets);
    });
  });
};

module.exports = socketServer;
