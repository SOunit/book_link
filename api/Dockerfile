FROM node:14.14.0-alpine

WORKDIR "/app"

COPY ./package.json ./
RUN npm install
COPY . .
RUN npm install -g typescript ts-node
RUN tsc

CMD ["npm", "run", "start"]