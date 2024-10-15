FROM node:18-alpine as builder
ENV NODE_ENV development
WORKDIR /app
COPY ./package.json /app
RUN yarn install
COPY . /app
COPY yarn.lock .
COPY . .
CMD ["yarn", "run", "start"]