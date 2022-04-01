FROM node:14.14.0-alpine

WORKDIR "/app"

COPY ./package.json ./
RUN npm install
COPY . .
RUN npx sequelize-cli init
RUN npm install -g typescript ts-node
RUN webpack


CMD ["npm", "run", "start"]