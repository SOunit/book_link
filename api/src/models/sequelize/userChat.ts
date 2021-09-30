import Sequelize from 'sequelize';
import sequelize from '../../util/database';
import Chat from './chat';
import User from './user';

const UserChat = sequelize.define('userChat', {
  userId: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: 'id',
    },
  },
  chatId: {
    type: Sequelize.STRING,
    references: {
      model: Chat,
      key: 'id',
    },
  },
});

export default UserChat;
