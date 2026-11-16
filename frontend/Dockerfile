FROM node:18-alpine
ENV NODE_ENV=development
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 600000
COPY . .

# CRA dev server reads REACT_APP_* at startup. They can be set as build args
# or, as docker-compose.yml does, as runtime env (env_file / environment).
ARG REACT_APP_API_URL=http://localhost:8080
ARG REACT_APP_GOOGLE_MAPS_API_KEY=
ENV REACT_APP_API_URL=$REACT_APP_API_URL \
    REACT_APP_GOOGLE_MAPS_API_KEY=$REACT_APP_GOOGLE_MAPS_API_KEY

EXPOSE 3000
CMD ["yarn", "run", "start"]
