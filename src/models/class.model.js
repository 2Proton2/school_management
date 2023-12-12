const knexfile =  require('knex')(require('../db/knexfile'));
const bookshelf = require('bookshelf')(knexfile);

const Class = bookshelf.model('Class', {
  tableName: 'school_class',
  school() {
    return this.belongsTo('School', 'school_id');
  },
  class() {
    return this.belongsTo('Class', 'class_id');
  }
});

module.exports = Class;