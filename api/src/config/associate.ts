import {
  Chat,
  Follow,
  Item,
  Message,
  User,
  UserChat,
  UserItem,
} from '../models/sequelize';

export const associate = () => {
  // setup association, add functions
  User.belongsToMany(Item, { through: 'userItems' });
  Item.belongsToMany(User, { through: 'userItems' });
  User.belongsToMany(User, {
    as: 'followingUser',
    through: 'follows',
  });
  Chat.belongsToMany(User, { through: 'userChats' });
  User.belongsToMany(Chat, { through: 'userChats' });
  Message.belongsTo(Chat);
  Chat.hasMany(Message);

  Message.belongsTo(User);
};
