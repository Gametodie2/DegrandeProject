# Examenopdracht Web Services

- Student: Yani Degrande
- Studentennummer: 202185045
- E-mailadres: yani.degrande@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- ...

# Degrande API

First install the dependencies using `yarn install`.

To start this API, create a `.env` file in the root of this folder with this content

```sh
NODE_ENV="development"
PORT=9000
AUTH_JWKS_URI
AUTH_AUDIENCE
AUTH_ISSUER
AUTH_USER_INFO
NODEMAILER_HOST
NODEMAILER_PASS
DATABASE_HOST
DATABASE_PORT
DATABASE_USERNAME
DATABASE_PASSWORD
DATABASE_NAME
```

Update the variables with the credentials of your database and Auth0 Application.

## How to start

Run the app in development mode with `yarn start`.

Run the app in production mode with `yarn start:prod`. We then assume all necessary environment variables are set, no `.env` file is ever read with this command.

## How to test

Create a `.env.test` file in the root of this folder with this content

```sh
NODE_ENV=test
DATABASE_HOST
DATABASE_PORT
DATABASE_USERNAME
DATABASE_PASSWORD
AUTH_JWKS_URI
AUTH_AUDIENCE
AUTH_ISSUER
AUTH_USER_INFO
AUTH_TEST_USER_USER_ID
AUTH_TEST_USER_USERNAME
AUTH_TEST_USER_PASSWORD
AUTH_TOKEN_URL
AUTH_CLIENT_ID
AUTH_CLIENT_SECRET
```

Update the variables with the credentials of your database (use another database) and Auth0 Application.

Run the tests with `yarn test`. To get coverage run `yarn test:coverage`.
