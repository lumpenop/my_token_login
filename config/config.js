require('dotenv').config();
const env = process.env;

const development = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: env.DB_NAME,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  port: env.DB_PORT
};

const production = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: env.DB_NAME,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  port: env.DB_PORT
};

const test = {
  username: env.DB_USER,
  password: env.DB_PW,
  database: env.DB_NAME,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
  port: env.DB_PORT
};

module.exports = { development, production, test };