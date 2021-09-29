import Sequelize from 'sequelize';
import sequelize from '../../util/database';
import Chat from './chat';
import User from './user';

const Message = sequelize.define('message', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  chatId: {
    type: Sequelize.STRING,
    references: {
      model: Chat,
      key: 'id',
    },
  },
  userId: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: 'id',
    },
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

export default Message;
