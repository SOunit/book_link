import MessageType from '../models/ts/Message';
const socketIo = require('socket.io');

// to save sockets for login user
const loginUserIdToUserIdWithSockets = new Map();
// to delete sockets when user logout
// when user logout, api get socket only
const socketIdToLoginUserId = new Map();

const socketServer = (server: any) => {
  const io = socketIo(server);

  const emitUpdateChat = (userId: string, message: MessageType) => {
    if (loginUserIdToUserIdWithSockets.has(userId)) {
      console.log('userId is in map');
      const userSockets = loginUserIdToUserIdWithSockets.get(userId).sockets;
      userSockets.forEach((socketId: any) => {
        console.log('emit "update:chat" to', socketId);
        io.to(socketId).emit('update:chat', message);
      });
    } else {
      console.log('no socket is open');
    }
  };

  io.on('connection', (socket: any) => {
    socket.on('join', (loginUserId: string) => {
      console.log('loginUserId', loginUserId);

      console.log('before join');
      console.log(
        'loginUserIdToUserIdWithSockets',
        loginUserIdToUserIdWithSockets
      );
      console.log('socketIdToLoginUserId', socketIdToLoginUserId);

      if (loginUserIdToUserIdWithSockets.has(loginUserId)) {
        // if user exists(one user login by different browser)

        // update existing user data by adding new socket
        const existingUser = loginUserIdToUserIdWithSockets.get(loginUserId);
        existingUser.sockets = [...existingUser.sockets, socket.id];
        loginUserIdToUserIdWithSockets.set(loginUserId, existingUser);
        socketIdToLoginUserId.set(socket.id, loginUserId);
      } else {
        // if user is new
        loginUserIdToUserIdWithSockets.set(loginUserId, {
          loginUserId,
          sockets: [socket.id],
        });
        socketIdToLoginUserId.set(socket.id, loginUserId);
      }

      console.log('after join');
      console.log(
        'loginUserIdToUserIdWithSockets',
        loginUserIdToUserIdWithSockets
      );
      console.log('socketIdToLoginUserId', socketIdToLoginUserId);
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
      console.log('before disconnect');
      console.log(
        'loginUserIdToUserIdWithSockets',
        loginUserIdToUserIdWithSockets
      );
      console.log('socketIdToLoginUserId', socketIdToLoginUserId);

      // if socket exists
      if (socketIdToLoginUserId.has(socket.id)) {
        const userIdWithSockets = loginUserIdToUserIdWithSockets.get(
          socketIdToLoginUserId.get(socket.id)
        );
        console.log('userIdWithSockets', userIdWithSockets);

        if (userIdWithSockets.sockets.length > 1) {
          // update user sockets
          userIdWithSockets.sockets = userIdWithSockets.sockets.filter(
            (socketId: any) => {
              if (socketId !== socket.id) return true;

              // delete
              socketIdToLoginUserId.delete(socketId);
              return false;
            }
          );
        } else {
          // delete
          loginUserIdToUserIdWithSockets.delete(userIdWithSockets.loginUserId);
          socketIdToLoginUserId.delete(socket.id);
        }
      }

      console.log('after disconnect');
      console.log(
        'loginUserIdToUserIdWithSockets',
        loginUserIdToUserIdWithSockets
      );
      console.log('socketIdToLoginUserId', socketIdToLoginUserId);
    });

    socket.on(
      'create:message',
      ({
        loginUserId,
        userId,
        message,
      }: {
        loginUserId: string;
        userId: string;
        message: MessageType;
      }) => {
        // update login user chat screen
        emitUpdateChat(loginUserId, message);

        // update chat user chat screen
        emitUpdateChat(userId, message);
      }
    );
  });
};

module.exports = socketServer;
