const bcrypt = require('bcryptjs')

exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  const encyptedSeedPassword = await bcrypt.hash('12345678', 10);
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@be.com', password: encyptedSeedPassword },
        { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@be.com', password: encyptedSeedPassword }
      ]);
    });
};
