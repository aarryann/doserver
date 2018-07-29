//knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex, Promise) => {
    return knex.schema
    .createTable('app_versions', (table) => {
      table.increments('id').unsigned().primary();
      table.string('app_version');
      table.string('db_version');
      table.string('upgrade_mode');
      table.string('status');
      table.timestamps();
    })
    .createTable('users', (table) => {
      table.increments('id').unsigned().primary();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
      table.timestamps();
    });
};

exports.down = (knex, Promise) => {
    return knex.schema
    .dropTableIfExists('app_versions')
    .dropTableIfExists('users');
};

