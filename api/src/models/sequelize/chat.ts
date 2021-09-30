import Sequelize from 'sequelize';
import sequelize from '../../util/database';

const Chat = sequelize.define('chat', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
});

export default Chat;
