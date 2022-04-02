import MessageType from '../models/ts/Message';
import { Server } from 'socket.io';

// to save sockets for login user
const loginUserIdToUserIdWithSockets = new Map();
// to delete sockets when user logout
// when user logout, api get socket only
const socketIdToLoginUserId = new Map();

export const socketServer = (server: any) => {
  const io = new Server(server);

  const emitUpdateChat = (userId: string, message: MessageType) => {
    console.log('emitUpdateChat');

    if (loginUserIdToUserIdWithSockets.has(userId)) {
      console.log('userId is in map');
      const userSockets = loginUserIdToUserIdWithSockets.get(userId).sockets;
      console.log('userSockets', userSockets);

      Object.keys(userSockets).forEach((socketId: any) => {
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
      if (!loginUserId) {
        return;
      }

      console.log('before join');
      console.log(
        'loginUserIdToUserIdWithSockets',
        loginUserIdToUserIdWithSockets,
      );
      console.log('socketIdToLoginUserId', socketIdToLoginUserId);

      if (loginUserIdToUserIdWithSockets.has(loginUserId)) {
        // if user exists(one user can login from different browser)

        // update existing user object by adding new socket
        const existingUserIdWithSockets =
          loginUserIdToUserIdWithSockets.get(loginUserId);
        existingUserIdWithSockets.sockets = {
          ...existingUserIdWithSockets.sockets,
          [socket.id]: socket.id,
        };
        loginUserIdToUserIdWithSockets.set(
          loginUserId,
          existingUserIdWithSockets,
        );
        socketIdToLoginUserId.set(socket.id, loginUserId);
      } else {
        // if user is new
        loginUserIdToUserIdWithSockets.set(loginUserId, {
          loginUserId,
          sockets: { [socket.id]: socket.id },
        });
        socketIdToLoginUserId.set(socket.id, loginUserId);
      }

      console.log('after join');
      console.log(
        'loginUserIdToUserIdWithSockets',
        loginUserIdToUserIdWithSockets,
      );
      console.log('socketIdToLoginUserId', socketIdToLoginUserId);
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
      console.log('before disconnect');
      console.log(
        'loginUserIdToUserIdWithSockets',
        loginUserIdToUserIdWithSockets,
      );
      console.log('socketIdToLoginUserId', socketIdToLoginUserId);

      // if socket exists
      if (socketIdToLoginUserId.has(socket.id)) {
        const userIdWithSockets = loginUserIdToUserIdWithSockets.get(
          socketIdToLoginUserId.get(socket.id),
        );
        console.log('userIdWithSockets', userIdWithSockets);

        if (userIdWithSockets.sockets && userIdWithSockets.sockets.length > 1) {
          // update user sockets
          delete userIdWithSockets.sockets[socket.id];
        } else {
          // delete user info from socket
          loginUserIdToUserIdWithSockets.delete(userIdWithSockets.loginUserId);
          socketIdToLoginUserId.delete(socket.id);
        }
      }

      console.log('after disconnect');
      console.log(
        'loginUserIdToUserIdWithSockets',
        loginUserIdToUserIdWithSockets,
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
      },
    );
  });
};
