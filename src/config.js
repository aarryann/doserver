exports.connection = require('mysql2').createConnection({
    host     : 'localhost',
    user     : 'appuser',
    password : 'appuserpw',
    database : 'doapp'
});

exports.knex = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    user : 'appuser',
    password : 'appuserpw',
    database : 'doapp'
  }
});