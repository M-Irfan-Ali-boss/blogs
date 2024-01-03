FROM node:21-alpine3.18 AS Development

WORKDIR /usr/app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 5200

CMD [ "yarn", "start:dev" ]

FROM node:21-alpine3.18 AS Production

WORKDIR /usr/app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5200

CMD [ "yarn", "start:prod" ]