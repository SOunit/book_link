import Sequelize from 'sequelize';
import sequelize from '../../util/database';

const User = sequelize.define('user', {
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
});

export default User;
