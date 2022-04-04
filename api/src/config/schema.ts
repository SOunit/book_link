import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { merge } from 'lodash';
import {
  itemTypeDefs,
  userTypeDefs,
  followTypeDefs,
  chatTypeDefs,
  itemsResolvers,
  usersResolvers,
  chatsResolvers,
  followsResolvers,
  schemaTypeDefs,
} from '../graphql';

export const getSchema = (): GraphQLSchema => {
  const mergedResolvers = merge(
    itemsResolvers,
    usersResolvers,
    chatsResolvers,
    followsResolvers,
  );

  const typeDefsArray = [
    schemaTypeDefs,
    itemTypeDefs,
    userTypeDefs,
    followTypeDefs,
    chatTypeDefs,
  ];

  const schema = makeExecutableSchema({
    typeDefs: typeDefsArray,
    resolvers: mergedResolvers,
  });

  return schema;
};
