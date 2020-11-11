if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/* prettier-ignore */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      port: 1334,
      host: '127.0.0.1',
      database: 'nptdb',
      user: 'admin',
      password: 'oblivion'
    }
  },
  production: {
    client: 'pg',
    connection: {
      port: process.env.PORT,
      host: process.env.HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    }
  }
};
