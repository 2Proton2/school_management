const knexfile =  require('knex')(require('../db/knexfile'));
const bookshelf = require('bookshelf')(knexfile);

const schoolClassStudent = bookshelf.model('SchoolClassStudent', {
  tableName: 'school_class_student',
  school() {
    return this.belongsTo('School', 'school_id');
  },
  class() {
    return this.belongsTo('Class', 'class_id');
  },
  User() {
    return this.belongsTo('User', 'user_id');
  }
});

module.exports = schoolClassStudent;