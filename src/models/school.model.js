const knexfile =  require('knex')(require('../db/knexfile'));
const bookshelf = require('bookshelf')(knexfile);

const school = bookshelf.model('School', {
  tableName: 'schools',
});

module.exports = school;