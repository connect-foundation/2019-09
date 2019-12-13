const Sequelize = require('sequelize');

const {
  MAXIMUM_CONNECTION_COUNT,
  MINIMUM_CONNECTION_COUNT,
  MAXIMUM_WAITING_TIME,
  MAXIMUM_IDLE_TIME,
} = require('../config');

const { env } = process;

const connection = new Sequelize.Sequelize(
  env.MYSQL_DATABASE,
  env.MYSQL_USER,
  env.MYSQL_PASSWORD,
  {
    host: env.DATABASE_HOST,
    dialect: env.DATABASE_DIALECT,
    charset: env.DATABASE_CHARSET,
    collate: env.DATABASE_COLLATE,
    pool: {
      max: MAXIMUM_CONNECTION_COUNT,
      min: MINIMUM_CONNECTION_COUNT,
      acquire: MAXIMUM_WAITING_TIME,
      idle: MAXIMUM_IDLE_TIME,
    },
  },
);

module.exports = connection;
