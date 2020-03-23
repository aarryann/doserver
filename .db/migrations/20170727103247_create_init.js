// prettier-ignore
// knex migrate:make filename; knex migrate:latest; knex migrate:rollback
// CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

exports.up = knex => {
  return knex.schema
    .createTable('FirstNames', (table) => {
      table.increments('id').unsigned().primary('firstNamePK');
      table.string('name', 100).notNullable();
      table.string('gender', 10).notNullable();
      table.string('race', 50).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('LastNames', (table) => {
      table.increments('id').unsigned().primary('lastNamePK');
      table.string('name', 100).notNullable().unique('lastNameUK');
      table.string('race', 50).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('LastNames')
    .dropTableIfExists('FirstNames');
};
