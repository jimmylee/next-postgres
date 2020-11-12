if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

/* prettier-ignore */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      port: process.env.PORT,
      host: process.env.HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
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
