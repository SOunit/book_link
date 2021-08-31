import { buildSchema } from 'graphql';

export default buildSchema(`
    type RootQuery {
        values: [Int!]!
        items(title: String): [Item!]!
        getUsersByItems(ids: [String!]!): [User!]!
    }

    type RootMutation {
        createValue(value: Int!): Int!
        createItem(data: CreateItemInput!): Item!
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
        id: String!
        title: String!
        author: String!
        imageUrl: String
    }

    type User {
        id: String!
        name: String!
        about: String
        imageUrl: String
    }

`);
