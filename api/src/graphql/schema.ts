import { buildSchema } from 'graphql';

export default buildSchema(`
    type RootQuery {
        values: [Int!]!
        items(title: String): [Item!]!
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
    }

    type Item {
        id: String!
        title: String!
        author: String!
    }    
`);
