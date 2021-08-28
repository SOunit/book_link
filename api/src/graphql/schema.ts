import { buildSchema } from 'graphql';

export default buildSchema(`
    type RootQuery {
        values: [Int!]!
    }

    schema {
        query: RootQuery
    }
`);
