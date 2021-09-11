// Express App Setup
import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import { graphqlHTTP } from 'express-graphql';

import graphqlSchema from './graphql/schema';
import graphqlResolver from './graphql/resolvers';
import sequelize from './util/database';
import User from './models/sequelize/user';
import Item from './models/sequelize/item';
import UserItem from './models/sequelize/userItem';
import { setupDummyData } from './setup';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// route setup
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    // http://localhost:3050/api/graphql
    graphiql: true,
  })
);

User.belongsToMany(Item, { through: UserItem });
Item.belongsToMany(User, { through: UserItem });

// create table using model by sync command
sequelize
  .sync({ force: true })
  .then(() => {
    return User.findByPk('1');
  })
  .then((user: any) => {
    if (!user) {
      return User.create({
        id: '1',
        name: 'Jack For Test',
        about: `hi, I'm jack. Jack for test play!! You can edit my profile. My profile will be re-created when this app start. This is only for me, because I'm a test user!`,
        imageUrl:
          'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80',
      });
    }
    return user;
  })
  .then((user: any) => {
    console.log('sequelize sync, user', user);

    setupDummyData();

    app.listen(5000, () => {
      console.log('Listening on port 5000');
    });
  })
  .catch((err: any) => {
    console.log('err in sync of sequelize', err);
  });
