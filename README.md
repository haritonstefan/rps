# Rock Paper Scissors

More information on each part can be found:

* [Client](./rps-client/README.md)
* [Back](./rps-back/README.md)

### Features

* Dockerized (with a separate user with limited privileges for the needed database only [link](./mongo/init-mongo.js))
* [Angular Client](rps-client/README.md)
* [NestJS Backend](./rps-back/README.md)
* Mongodb through the native mongo driver.
* Swagger api docs found under `/api` route.
* Client api generation (having the backend running at localhost:3000)`cd rps-client && npm i && npm codegen`

### Instructions

Having docker and docker-compose installed,
starting up the application should not be more complex than running:

For the first start

* `cp .env.default .env`
* `cp rps-back/.env.default rps-back/.env`
* `docker-compose up --build`
* `cd rps-back && npm i && npm run seed`

For subsequent starts it would be enough to run `docker-compose up`

Separate instructions if willing to start outside of docker are found in each project