import { Model, DataTypes } from 'sequelize';
import { db } from '../../config/database.config';

interface MessageAttributes {
  id: string;
  ChatId: string;
  UserId: string;
  text: string;
}

export class Message extends Model<MessageAttributes> {}

Message.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    ChatId: {
      type: DataTypes.STRING,
      references: {
        model: 'Chats',
        key: 'id',
      },
    },
    UserId: {
      type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  { sequelize: db, modelName: 'Message' },
);
