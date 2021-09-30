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
import Following from './models/sequelize/following';
import Chat from './models/sequelize/chat';
import UserChat from './models/sequelize/userChat';
import Message from './models/sequelize/message';

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

// setup association, add functions
User.belongsToMany(Item, { through: UserItem });
Item.belongsToMany(User, { through: UserItem });
User.belongsToMany(User, { as: 'targets', through: Following });
Chat.belongsToMany(User, { through: UserChat });
User.belongsToMany(Chat, { through: UserChat });
Message.belongsTo(Chat);
Chat.hasMany(Message);
Message.belongsTo(User);

// create table using model by sync command
sequelize
  .sync({ force: true })
  .then(() => {
    setupDummyData();

    app.listen(5000, () => {
      console.log('Listening on port 5000');
    });
  })
  .catch((err: any) => {
    console.log('err in sync of sequelize', err);
  });
