FROM node:20-alpine
WORKDIR /usr/src/clean-node-api
COPY ./package.json .
RUN npm install --omit=dev