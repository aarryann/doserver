const mysql = require('mysql2/promise');
const bluebird = require('bluebird');

const test = async(ms) => {
  const conn =  await ms.createConnection({host:'localhost', user: 'appuser', password: 'appuserpw', database: 'doapp'});
  const [rows, fields] =  await conn.execute('SELECT id, first_name as firstName, last_name as lastName, email FROM `users` WHERE `id` = ? ', [1]);
  conn.close();
  return rows;
}

test(mysql).then(console.log);
