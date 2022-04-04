import { Model, DataTypes } from 'sequelize';
import { db } from '../../config/database.config';

interface ChatAttributes {
  id: string;
}

export class Chat extends Model<ChatAttributes> {}

Chat.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize: db, modelName: 'Chat' },
);
