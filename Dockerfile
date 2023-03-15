FROM node:16-alpine
WORKDIR /usr/app

COPY package*.json nodemon.json ./
RUN yarn install
COPY tsconfig.json ./
COPY src src/
RUN yarn build

CMD [ "node", "dist/index.js" ]