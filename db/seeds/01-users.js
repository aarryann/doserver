const bcrypt = require('bcryptjs')

exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  const encyptedSeedPassword = await bcrypt.hash('12345678', 10);
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, first_name: 'John', last_name: 'Doe', email: 'john@be.com', password: encyptedSeedPassword, created_at: '2018-07-29'},
        {id: 2, first_name: 'Jane', last_name: 'Doe', email: 'jane@be.com', password: encyptedSeedPassword, created_at: '2018-07-29'}
      ]);
    });
};
