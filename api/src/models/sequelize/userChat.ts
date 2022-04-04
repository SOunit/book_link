import { Model, DataTypes } from 'sequelize';
import { db } from '../../config/database.config';
import { Chat } from './chat';
import { User } from './user';

interface UserChatAttributes {
  UserId: string;
  ChatId: string;
}

export class UserChat extends Model<UserChatAttributes> {}

UserChat.init(
  {
    userId: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: 'id',
      },
    },
    chatId: {
      type: DataTypes.STRING,
      references: {
        model: Chat,
        key: 'id',
      },
    },
  },
  { sequelize: db, tableName: 'userChats' },
);
