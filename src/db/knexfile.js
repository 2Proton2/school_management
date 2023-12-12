require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  // connection: {
  //   host: 'localhost',
  //   port: '5432',
  //   user: 'postgres',
  //   password: '123',
  //   database: 'appschool',
  // },
  
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
};