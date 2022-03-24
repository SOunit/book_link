# to avoid build error, node v17 has build error
# https://github.com/facebook/create-react-app/issues/11565
FROM node:16-alpine as builder

WORKDIR /app
COPY ./package.json ./
# to solve node-sass install error
# RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python3
# RUN npm install --quiet node-gyp -g
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html