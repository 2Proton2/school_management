const knexfile =  require('knex')(require('../db/knexfile'));
const bookshelf = require('bookshelf')(knexfile);

const User = bookshelf.model('User', {
  tableName: 'users',
});

module.exports = User;