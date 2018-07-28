exports.knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'appuser',
    password : 'appuserpw',
    database : 'doapp'
  }
});