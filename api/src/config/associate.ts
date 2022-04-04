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
  User.belongsToMany(Item, { through: UserItem });
  Item.belongsToMany(User, { through: UserItem });
  User.belongsToMany(User, {
    as: 'followingUser',
    through: Follow,
  });
  Chat.belongsToMany(User, { through: UserChat });
  User.belongsToMany(Chat, { through: UserChat });
  Message.belongsTo(Chat);
  Chat.hasMany(Message);
  Message.belongsTo(User);
};
