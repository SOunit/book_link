import Sequelize from 'sequelize';
import { sequelize } from '../../util';

export const Chat = sequelize.define('chat', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
});
