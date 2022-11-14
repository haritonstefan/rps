FROM node:hydrogen-alpine as dev

WORKDIR /app

ENV MONGO_URL="mongodb://rps:rps_database@mongo/rps?authSource=rps"

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "start:dev"]