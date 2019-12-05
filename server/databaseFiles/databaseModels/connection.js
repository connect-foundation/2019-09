const Sequelize = require('sequelize');

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
      max: 10000,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

module.exports = connection;
