FROM node:18-alpine as builder
ENV NODE_ENV=development
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "run", "start"]