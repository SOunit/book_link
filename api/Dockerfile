FROM node:14.14.0-alpine

WORKDIR "/app"

COPY ./package.json ./
RUN npm install
COPY . .
RUN npx sequelize-cli init
RUN npm install -g webpack webpack-cli
RUN webpack --config webpack.config.prod.js

CMD ["npm", "run", "start"]