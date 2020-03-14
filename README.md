# next-postgres

This setup is using:

- [NextJS 9.3.0](https://nextjs.org/)
- [Postgres 11](https://github.com/brianc/node-postgres)
- [Express 4.17.1](https://github.com/expressjs/express)
- [Emotion CSS-in-JS 9.2.11](https://5bb1495273f2cf57a2cf39cc--emotion.netlify.com/)
- [GoogleAPIs 47.0.0](https://github.com/googleapis/google-api-nodejs-client#readme)
- [Knex 0.20.10](https://knexjs.org/)

It is for:

- Running a website with users.
- Using [Google web browser OAuth](https://developers.google.com/identity).
- Replacing my old work with [next-postgres-sequelize](https://github.com/jimmylee/next-postgres-sequelize).
- Deploying with [https://render.com](https://render.com) or something like it.

## Setup

#### Step 1

Clone this repository!

#### Step 2

Create an `.env` file at your project root.

```sh
CLIENT_ID=GET_ME_FROM_GOOGLE
CLIENT_SECRET=GET_ME_FROM_GOOGLE
JWT_SECRET=74b8b454-29a6-4282-bdec-7e2895c835eb
PASSWORD_SECRET=$2b$10$CVMCvJeC9vco2MwAAlEbBO

```

- Generate your own `PASSWORD_SECRET` with `BCrypt.genSaltSync(10)`.
- Generate your own `JWT_SECRET`.
- Obtain `CLIENT_ID` and `CLIENT_SECRET` from [https://console.developers.google.com](https://console.developers.google.com) after you setup your application.
- Use `CMD+F` to find `REDIRECT_URIS` in `~/common/credentials`. Google needs this string for the **Authorized redirect URIs** setting. The default is: `http://localhost:1337/sign-in-confirm`.

#### Step 3

Enable [People API](https://console.developers.google.com/apis/api/people.googleapis.com/overview).

## Setup: Running the website (OSX)

All steps assume you have [Homebrew](https://brew.sh/) installed on your machine. You might want to install [iTerm](https://iterm2.com/) since you need multiple terminal windows open as well.

Using another version of Postgres? That may be okay. I use Postgres 11 to share versions with [Render](https://render.com/) but I have tried these steps with Postgres 9 as well.

#### Installing Postgres 11

Mileage may vary with a different version.

```sh
brew uninstall postgresql
brew install postgresql@11
brew link postgresql@11 --force
```

#### Installing Node

Make sure NodeJS version 10+ is installed on your machine.

```sh
brew install node
```

#### Installing nodemon

We use `nodemon` to reload the site whenever changes are made locally.

```sh
npm install -g nodemon
```

#### Installing Node packages

Once you have Postgres and Node, run these commands:

```sh
npm install
npm run dev
```

#### Run Postgres

In a seperate terminal tab run your postgres version, in this case the command below is referencing Postgres 11.

```sh
postgres -D /usr/local/var/postgresql@11 -p 1334
```

#### Create a new database

- Start with creating an admin user.
- Finish with creating a database for testing.

```sh
# Enter Postgres console
psql postgres -p 1334

# Create a new user for yourself
CREATE ROLE admin WITH LOGIN PASSWORD 'oblivion';

# Allow yourself to create databases
ALTER ROLE admin CREATEDB;

# Or just go ham and become a super user
ALTER USER admin WITH SUPERUSER;

# Exit Postgres console
\q

# Log in as your new user.
psql postgres -p 1334 -U admin

# Create a database named: nptdb.
# If you change this, update knexfile.js
CREATE DATABASE nptdb;

# Give your self privileges
GRANT ALL PRIVILEGES ON DATABASE nptdb TO admin;

# List all of your databases
\list

# Connect to your newly created DB as a test
\connect nptdb

# Exit Postgres console
\q
```

## Setup: Fill database with tables

Run the following commands:

```sh
npm run do-setup-database
npm run do-seed-database
```

## View the website

View `http://localhost:1337` in your browser.

## Setup: Production deploy

Coming soon.

## Questions?

Feel free to slang any feels to [@wwwjim](https://twitter.com/wwwjim).
