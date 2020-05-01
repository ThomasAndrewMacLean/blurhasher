FROM node:12

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production
RUN npm build
COPY . .

CMD [ "npm", "run","start" ]