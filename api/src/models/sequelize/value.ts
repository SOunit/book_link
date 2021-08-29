import Sequelize from 'sequelize';

import sequelize from '../../util/database';

// single form
const Value = sequelize.define('value', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

export default Value;
