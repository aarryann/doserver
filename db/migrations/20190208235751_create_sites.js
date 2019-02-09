// prettier-ignore
//knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex) => {
  return knex.schema
    .createTable('Site', (table) => {
      table.increments('id').unsigned().primary('sitePK');
      table.integer('tenantId').notNullable().unsigned()
        .references('id', 'siteTenantFK')
        .inTable('Tenant');
      table.string('siteName', 80).notNullable();
      table.string('siteStatus', 20).notNullable().defaultTo('Active');
      table.unique(['tenantId', 'siteName'], 'siteNameTenantUK');
      table.integer('updatedBy').notNullable().unsigned()
        .references('id', 'siteUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('Site');
};
