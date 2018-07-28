const mysql = require('mysql2/promise');
const bluebird = require('bluebird');

exports.getUser = async(id) => {
  const conn =  await mysql.createConnection({host:'localhost', user: 'appuser', password: 'appuserpw', database: 'doapp', Promise: bluebird});
  const [rows, fields] =  await conn.execute('SELECT id, first_name as firstName, last_name as lastName, email FROM `users` WHERE `id` = ? ', [id]);
  console.log(rows[0]);
  return rows[0];
} 

exports.getUserDetails = async(knex, id) => {
  const rows = await knex.select({
      id: 'id',
      firstName: 'first_name', 
      lastName: 'last_name', 
      email: 'email'
    })
  .from('users').where('id', id);
  return rows[0];
} 