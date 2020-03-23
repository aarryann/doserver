// prettier-ignore
const bcrypt =  require('bcryptjs');

// eslint-disable-next-line
exports.seed = async function(knex, Promise) {
  // Deletes ALL existing entries
  const encyptedSeedPassword = await bcrypt.hash('12345678', 10);
  return knex('User')
    .then(() =>
      knex('AppVersion').insert([
        { id: 1, appVersion: '0.1', dbVersion: '0.1', upgradeMode: 'Full' }
      ])
    )
    .then(() =>
      knex('Tenant').insert([{ id: 1, tenantName: 'First', appVersionId: 1 }])
    )
    .then(() => {
      return knex('User').insert([
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@be.com',
          password: encyptedSeedPassword
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@be.com',
          password: encyptedSeedPassword
        }
      ]);
    });
};
