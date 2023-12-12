const knexfile =  require('knex')(require('../db/knexfile'));
const bookshelf = require('bookshelf')(knexfile);

const ApiCredential = bookshelf.model('ApiCredential', {
  tableName: 'user_api',
  user() {
    return this.belongsTo('User', 'user_id');
  },
});

module.exports = ApiCredential;
