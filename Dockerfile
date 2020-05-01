FROM node:12 AS builder

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install

CMD [ "npm", "run","start" ]