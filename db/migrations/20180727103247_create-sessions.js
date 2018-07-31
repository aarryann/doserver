//knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex, Promise) => {
    return knex.schema
    .createTable('app_versions', (table) => {
      table.increments('id').unsigned().primary();
      table.string('app_version').notNullable();
      table.string('db_version').notNullable();
      table.string('upgrade_mode').notNullable();
      table.string('status').notNullable();
      table.unique(['app_version', 'db_version']);
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('users', (table) => {
      table.increments('id').unsigned().primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = (knex, Promise) => {
    return knex.schema
    .dropTableIfExists('app_versions')
    .dropTableIfExists('users');
};
