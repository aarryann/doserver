const Client = require('knex/lib/dialects/mysql2');
const Formatter = require('knex/lib/formatter');
Client.prototype.wrapIdentifier = (value) => {
  //console.log(value);
//  return value;
  if (value === '*') return value;
  //const matched = value.match(/(.*?)(\[[0-9]\])/);
  //if (matched) return Client.prototype.wrapIdentifier.wrapIdentifier(matched[1]) + matched[2];
  let returnValue = value;
  returnValue = `${value.replace(/([A-Z])/g, (_, s) => `_${s.toLowerCase()}`).replace(/"/g, '""')}`;
  //console.log(`Value ${value} - ${returnValue}`);
  //return `"${value.replace(/([A-Z])/g, (_, s) => `_${s.toLowerCase()}`).replace(/"/g, '""')}"`;
  return returnValue;
};
Formatter.prototype.wrapAsIdentifier = value => {
  let returnValue = value;
  returnValue = `${(value || '').replace(/"/g, '""')}`;
  console.log(`Formatter Value ${value} - ${returnValue}`);
  return returnValue;
};

exports.knex = require('knex')({
  client: Client,
//  client: 'mysql2',
//  wrapIdentifier: (value, origImpl, queryContext) => origImpl(convertToSnakeCase(value)),
  connection: {
    host : 'localhost',
    user : 'appuser',
    password : 'appuserpw',
    database : 'doapp'
  }
});
