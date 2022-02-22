// Express App Setup
import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import { graphqlHTTP } from 'express-graphql';
const { v4: uuid } = require('uuid');
const AWS = require('aws-sdk');
import keys from './util/keys';

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

// route setup
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    // http://localhost:3050/api/graphql
    graphiql: true,
  }),
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
