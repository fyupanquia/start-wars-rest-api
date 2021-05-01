# STAR-WARS-API

<p align="center">
  <a href="https://www.serverless.com/" target="blank"><img src="https://www.serverless.com/static/serverless-framework-235f7e57983d270320cba8f86ec0ea65.svg" width="320" alt="Serverless Logo" /></a>
</p>
<p align="center">
  <a href="https://www.mysql.com/" target="blank"><img src="https://www.mysql.com/common/logos/mysql-logo.svg?v2" width="420" alt="mysql Logo" /></a>
</p>

## Description

An REST API with [NODEJS](https://nodejs.org/en/) and [MYSQL](https://www.mysql.com/)

## Installation

```bash
$ npm install
```

PRODUCTION
```bash
$ npm install --production
```

## Configuration

- copy .env.example and paste .env.development.local and .env.production.local
- Set .env.development.local and .env.production.local vars
- There is a only table called 'users' in db

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prd
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
## Lint

```bash
# lint
$ npm run lint

# lint fixer
$ npm run lint:fix
```

## Documentation
- The routes are in /postman

<img src="assets/postman.PNG" width="420" alt="POSTMAN" />

- GET /doc/
<img src="assets/swagger.PNG" width="420" alt="SWAGGER" />

## Stay in touch
- Author - [Yupanqui Allcca Frank](https://fyupanquia.github.io/portfolio/)

## License

MIT [MIT licensed](LICENSE).