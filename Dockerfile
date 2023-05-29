FROM node:18.15-alpine

WORKDIR /inovations-store

COPY package*.json ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "dev"]
