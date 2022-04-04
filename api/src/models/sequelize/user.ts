import Sequelize, { Model } from 'sequelize';
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
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    about: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: 'users',
  },
);
