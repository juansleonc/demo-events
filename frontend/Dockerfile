FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install mobx mobx-react

COPY . .

RUN mkdir -p /app/node_modules/.cache && chown -R node:node /app/node_modules/.cache

EXPOSE 3000

CMD ["npm", "start"]
