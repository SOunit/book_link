// Express App Setup
import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import { graphqlHTTP } from 'express-graphql';
import graphqlSchema from './graphql/schema';
import graphqlResolver from './graphql/resolvers';
import setupRouter from './routes/setup';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHTTP({ schema: graphqlSchema, rootValue: graphqlResolver })
);

// route setup
// app.use(setupRouter);

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
