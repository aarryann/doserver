// eslint-disable-next-line
exports.seed = async function(knex, Promise) {
  return knex('Tenant')
    .then(function() {
      return knex('AppVersion').insert([
        {
          id: 1,
          appVersion: '0.1',
          dbVersion: '0.1',
          upgradeMode: 'Full' // incremental vs Full
        }
      ]);
    })
    .then(function() {
      return knex('Tenant').insert([
        {
          id: 1,
          tenantName: 'First',
          appVersionId: 1
        }
      ]);
    })
    .then(function() {
      return knex('TenantUser').insert([
        {
          id: 1,
          tenantId: 1,
          userId: 1,
          updatedBy: 1
        }
      ]);
    })
    .then(function() {
      return knex('TenantAddress').insert([
        {
          id: 1,
          tenantId: 1,
          url: 'http://localhost:3000',
          type: 'application',
          isPrimary: 'Yes',
          updatedBy: 1
        }
      ]);
    });
};
