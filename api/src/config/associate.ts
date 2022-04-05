import { Chat, Item, Message, User } from '../models/sequelize';

export const associate = () => {
  // setup association, add functions
  User.belongsToMany(Item, { through: 'UserItems' });
  Item.belongsToMany(User, { through: 'UserItems' });
  User.belongsToMany(User, {
    as: 'followingUser',
    through: 'Follows',
  });
  Chat.belongsToMany(User, { through: 'UserChats' });
  User.belongsToMany(Chat, { through: 'UserChats' });
  Message.belongsTo(Chat);
  Chat.hasMany(Message);

  Message.belongsTo(User);
};
