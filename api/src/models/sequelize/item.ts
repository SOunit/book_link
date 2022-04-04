import { Model, DataTypes } from 'sequelize';
import { db } from '../../config/database.config';

interface ItemAttributes {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
}

export class Item extends Model<ItemAttributes> {}

Item.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: 'Item' },
);
