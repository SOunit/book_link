import Sequelize from 'sequelize';
import sequelize from '../../util/database';

const Item = sequelize.define('item', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Item;
