const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const knexfile = require('./db/knexfile');

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes/routes'));

// Initialize Knex
const knex = require('knex')(knexfile);

// Check the database connection
knex.raw('SELECT 1')
  .then(() => {
    console.log('Database connection established successfully');

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Handle SIGINT (Ctrl+C) to gracefully close the connection pool
    process.on('SIGINT', () => {
      server.close(async () => {
        try {
          await knex.destroy();
          console.log('Server and database connection closed successfully');
          process.exit(0);
        } catch (error) {
          console.error('Error connecting to the database:', error);
        }
      });
    });
  });
