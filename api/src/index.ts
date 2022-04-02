import express from 'express';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import sequelize from './util/database';
import {
  User,
  Item,
  UserItem,
  Follow,
  Chat,
  UserChat,
  Message,
} from './models/sequelize';
import { setupDummyData } from './setup';
import keys from './util/keys';
const { v4: uuid } = require('uuid');
const AWS = require('aws-sdk');
const cors = require('cors');
const { makeExecutableSchema } = require('@graphql-tools/schema');
import {
  itemTypeDefs,
  userTypeDefs,
  followTypeDefs,
  chatTypeDefs,
  itemsResolvers,
  usersResolvers,
  chatsResolvers,
  followsResolvers,
  schemaTypeDefs,
} from './graphql';
import { merge } from 'lodash';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
  },
  region: keys.region,
});

app.get('/upload', (req, res, next) => {
  const userId = 'test_user_id';
  const key = `${userId}/${uuid()}.jpeg`;

  s3.getSignedUrl(
    'putObject',
    {
      Bucket: 'image-upload-sample-blog-app-123',
      ContentType: 'image/jpeg',
      Key: key,
    },
    (err: any, url: string) => res.send({ key, url }),
  );
});

const mergedResolvers = merge(
  itemsResolvers,
  usersResolvers,
  chatsResolvers,
  followsResolvers,
);

const typeDefsArray = [
  schemaTypeDefs,
  itemTypeDefs,
  userTypeDefs,
  followTypeDefs,
  chatTypeDefs,
];

const schema = makeExecutableSchema({
  typeDefs: typeDefsArray,
  resolvers: mergedResolvers,
});

// route setup
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    // http://localhost:3050/api/graphql
    graphiql: true,
  }),
);

// setup association, add functions
User.belongsToMany(Item, { through: UserItem });
Item.belongsToMany(User, { through: UserItem });
User.belongsToMany(User, { as: 'followingUser', through: Follow });
Chat.belongsToMany(User, { through: UserChat });
User.belongsToMany(Chat, { through: UserChat });
Message.belongsTo(Chat);
Chat.hasMany(Message);
Message.belongsTo(User);

const http = require('http');
const server = http.createServer(app);
const SocketServer = require('./socket');
SocketServer(server);

// create table using model by sync command
sequelize
  .sync({ force: true })
  .then(() => {
    setupDummyData();

    server.listen(5000, () => {
      console.log('Listening on port 5000');
    });
  })
  .catch((err: any) => {
    console.log('err in sync of sequelize', err);
  });
