# Rock Paper Scissors Rest API

## Features

* Input validation (through class-validator)
* Auth validation
* Pseudo Authorization, just for the sake of having the building blocks, where complex logic could be implemented for
  generating and validating tokens.
* OpenAPI Docs found under (http://localhost:3000/api)
* MongoDB through the native mongodb driver
* Seeds
* Attempt to support multiple players, and more complex variations of the Rock Paper Scissors game with more than 3
  elements

## Start up

The server expects the `MONGO_URL` variable available in the environment at startup. It will use this connection
string to access the database. Alternatively one can run from the project root

`cp .env.default .env` and update the connection string if needed.

* `npm install`
* `npm run seed` (only on the first start)
* `npm start`

## Tests

Some unit tests are available. Specifically for the [auth.service](./src/auth/auth.service.spec.ts)
They can be run with `npm test`