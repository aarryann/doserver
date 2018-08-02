//knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex, Promise) => {
    return knex.schema
    .createTable('app_versions', (table) => {
      table.increments('id').unsigned().primary();
      table.string('appVersion').notNullable();
      table.string('dbVersion').notNullable();
      table.string('upgradeMode').notNullable();
      table.string('status').notNullable();
      table.unique(['appVersion', 'dbVersion']);
      table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('users', (table) => {
      table.increments('id').unsigned().primary();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = (knex, Promise) => {
    return knex.schema
    .dropTableIfExists('app_versions')
    .dropTableIfExists('users');
};
