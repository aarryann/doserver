exports.knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : 'localhost',
    user : 'appuser',
    password : 'appuserpw',
    database : 'doapp'
  }
});
