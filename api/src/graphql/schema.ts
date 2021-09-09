import { buildSchema } from 'graphql';

export default buildSchema(`
    type RootQuery {
        itemsByTitle(title: String): [Item!]!
        getUsersByItems(itemIds: [String!]!, userId: String!): [User!]!
        user(id: ID!): User!
        item(id: ID!): Item!
        getUserCount(id: ID!): Int!
    }

    type RootMutation {
        createItem(data: CreateItemInput!): Item!
        createUser(id: ID!): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }

    input CreateItemInput {
        title: String!
        author: String!
        imageUrl: String
    }

    type Item {
        id: ID!
        title: String!
        author: String!
        imageUrl: String
        users: [User]
    }

    type User {
        id: ID!
        name: String!
        about: String
        imageUrl: String
        items: [Item]
    }

`);
