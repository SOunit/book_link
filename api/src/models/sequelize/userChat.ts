import { Model, DataTypes } from 'sequelize';
import { db } from '../../config/database.config';

interface UserChatAttributes {
  UserId: string;
  ChatId: string;
}

export class UserChat extends Model<UserChatAttributes> {}

UserChat.init(
  {
    UserId: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    ChatId: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'Chats',
        key: 'id',
      },
    },
  },
  { sequelize: db, modelName: 'UserChat' },
);
