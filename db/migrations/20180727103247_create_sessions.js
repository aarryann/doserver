// prettier-ignore
//knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex) => {
  return knex.schema
    .createTable('AppVersion', (table) => {
      table.increments('id').unsigned().primary();
      table.string('appVersion').notNullable();
      table.string('dbVersion').notNullable();
      table.string('upgradeMode').notNullable();
      table.string('status').notNullable();
      table.unique(['appVersion', 'dbVersion']);
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('Tenant', (table) => {
      table.increments('id').unsigned().primary('tenantPK');
      table.string('tenantName', 80).unique('tenantNameUK').notNullable();
      table.string('tenantStatus', 20).notNullable().defaultTo('Active');
      table.integer('appVersionId').notNullable().unsigned()
        .references('id', 'tenantAppVersionFK')
        .inTable('AppVersion');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('User', (table) => {
      table.increments('id').unsigned().primary();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('userStatus', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned()
        .references('id', 'userUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('User')
    .dropTableIfExists('Tenant')
    .dropTableIfExists('AppVersion');
};
