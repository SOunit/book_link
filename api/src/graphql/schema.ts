import { buildSchema } from 'graphql';

export default buildSchema(`
    type RootQuery {
        values: [Int!]!
    }

    type RootMutation {
        createValue(value: Int!): Int!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
