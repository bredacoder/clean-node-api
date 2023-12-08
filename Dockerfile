FROM node:14
RUN mkdir -p /usr/src/clean-node-api
WORKDIR /usr/src/clean-node-api
COPY ./package.json .
RUN npm install --omit=dev
COPY ./dist ./dist
EXPOSE 5000
CMD npm start 