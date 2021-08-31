import Sequelize from 'sequelize';
import sequelize from '../../util/database';

const UserItem = sequelize.define('userItem', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

export default UserItem;
