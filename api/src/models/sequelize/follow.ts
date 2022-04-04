import { Model, DataTypes } from 'sequelize';
import { db } from '../../config/database.config';
import { User } from './user';

// export const Follow = sequelize.define('follow');

interface FollowAttributes {
  UserId: string;
  followingUserId: string;
}

export class Follow extends Model<FollowAttributes> {}

Follow.init(
  {
    UserId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    followingUserId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, tableName: 'follows' },
);
