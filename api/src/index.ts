// import syntax for type support
import express from 'express';
import { json } from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import http from 'http';
import { socketServer } from './socket';
import { router } from './routes/upload';
import { db, getSchema, associate } from './config';
import { createTestData } from './data';

const app = express();

// middleware
app.use(cors());
app.use(json());

// route setup
app.use('/upload', router);
app.use(
  '/graphql',
  graphqlHTTP({
    schema: getSchema(),
    // http://localhost:3050/api/graphql
    graphiql: true,
  }),
);

// socket
const server = http.createServer(app);
socketServer(server);

// sequelize
associate();

// create table using model by sync command
db.sync({ force: true })
  .then(() => {
    createTestData();

    server.listen(5000, () => {
      console.log('Listening on port 5000');
    });
  })
  .catch((err: any) => {
    console.log('err in sync of sequelize', err);
  });
