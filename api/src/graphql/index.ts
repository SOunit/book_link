import schemaTypeDefs from './schema.graphql';
import itemTypeDefs from './items/items.graphql';
import userTypeDefs from './users/users.graphql';
import followTypeDefs from './follows/follows.graphql';
import chatTypeDefs from './chats/chats.graphql';

import itemsResolvers from './items/items.resolvers';
import usersResolvers from './users/users.resolvers';
import followsResolvers from './follows/follows.resolvers';
import chatsResolvers from './chats/chats.resolvers';

export {
  schemaTypeDefs,
  itemTypeDefs,
  userTypeDefs,
  followTypeDefs,
  chatTypeDefs,
  itemsResolvers,
  usersResolvers,
  followsResolvers,
  chatsResolvers,
};
