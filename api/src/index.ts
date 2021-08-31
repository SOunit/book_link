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

const setupDummyData = async () => {
  const rebecca = await User.create({
    id: '2',
    name: 'Rebecca',
    about: 'test about',
  });

  await rebecca.createItem({
    id: '10',
    title: 'Majo',
    author: 'Igarashi Daisuke',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/518NRzHLRUL._SX349_BO1,204,203,200_.jpg',
  });

  await rebecca.createItem({
    id: '20',
    title: 'Majo2',
    author: 'Igarashi Daisuke',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71gDhFdvIcL.jpg',
  });

  const kevin = await User.create({
    id: '3',
    name: 'Kevin',
    about: 'test about',
  });

  await kevin.createItem({
    id: '30',
    title: 'Kunitori Monogatari',
    author: 'Ryotaro Shiba',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/511LCOghq2L.jpg',
  });
};

// create table using model by sync command
sequelize
  .sync({ force: true })
  .then(() => {
    return User.findByPk('1');
  })
  .then((user: any) => {
    if (!user) {
      return User.create({ id: '1', name: 'Jack', about: 'test about' });
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
