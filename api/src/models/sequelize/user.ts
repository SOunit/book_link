import { Model, DataTypes } from 'sequelize';
import { db } from '../../config/database.config';

interface UserAttributes {
  id: string;
  name: string;
  about?: string;
  imageUrl?: string;
}

export class User extends Model<UserAttributes> {}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: 'User',
  },
);
