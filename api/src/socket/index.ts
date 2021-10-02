const socketIo = require('socket.io');

const socketServer = (server: any) => {
  const io = socketIo(server);
  io.on('connection', (socket: any) => {
    console.log('socket io connect');
  });
};

module.exports = socketServer;
