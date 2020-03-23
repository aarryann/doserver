// eslint-disable-next-line
exports.seed = async function (knex, Promise) {
  return knex('TenantSite')
    .then(() =>
      knex('TenantUser').insert([
        { id: 1, tenantId: 1, userId: 1, updatedBy: 1 }
      ])
    )
    .then(() =>
      knex('TenantAddress').insert([
        {
          id: 1,
          tenantId: 1,
          url: 'http://localhost:4812',
          type: 'application',
          isPrimary: 'Yes',
          updatedBy: 1
        }
      ])
    );
};
