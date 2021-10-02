const socketIo = require('socket.io');

const socketServer = (server: any) => {
  const io = socketIo(server);
  io.on('connection', (socket: any) => {
    console.log('socket io connect');
    console.log('on connection socket', socket);

    socket.on('client:connect', () => {
      console.log('client:connect');
      io.to(socket.id).emit('notify:api:accept:client:connect');
    });
  });
};

module.exports = socketServer;
