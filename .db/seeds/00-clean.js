// eslint-disable-next-line
exports.seed = async function(knex, Promise) {
  return knex('TenantSite')
    .del()
    .then(() => knex('TenantStudy').del())
    .then(() => knex('TenantUser').del())
    .then(() => knex('TenantAddress').del())
    .then(() => knex('Tenant').del())
    .then(() => knex('User').del())
    .then(() => knex('AppVersion').del());
};
