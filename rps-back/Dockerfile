FROM node:hydrogen-alpine as dev

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "start:dev"]