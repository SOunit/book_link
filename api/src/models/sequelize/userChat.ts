import Sequelize from 'sequelize';
import { sequelize } from '../../util';
import { Chat } from './chat';
import { User } from './user';

export const UserChat = sequelize.define('userChat', {
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
