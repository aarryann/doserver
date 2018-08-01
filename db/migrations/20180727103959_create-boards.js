//knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex, Promise) => {
    return knex.schema
    .createTable('boards', (table) => {
      table.increments('id').unsigned().primary();
      table.string('name').notNullable();
      table.string('slug').unique().notNullable();
      table.integer('user_id').notNullable().unsigned()
        .references('id')
        .inTable('users');
      table.integer('updated_user_id').notNullable().unsigned()
        .references('id')
        .inTable('users');
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('user_boards', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('user_id').notNullable().unsigned()
        .references('id')
        .inTable('users');
      table.integer('board_id').notNullable().unsigned()
        .references('id')
        .inTable('boards');
      table.unique(['user_id', 'board_id']);
      table.integer('updated_user_id').notNullable().unsigned()
        .references('id')
        .inTable('users');
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('lists', (table) => {
      table.increments('id').unsigned().primary();
      table.string('name').notNullable();
      table.integer('position').notNullable().unsigned();
      table.integer('board_id').notNullable().unsigned()
        .references('id')
        .inTable('boards');
      table.unique(['name', 'board_id']);
      table.integer('updated_user_id').notNullable().unsigned()
        .references('id')
        .inTable('users');
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('cards', (table) => {
      table.increments('id').unsigned().primary();
      table.string('name').notNullable();
      table.string('description');
      table.integer('position').notNullable().unsigned();
      table.string('tags');
      table.integer('list_id').notNullable().unsigned()
        .references('id')
        .inTable('lists');
      table.unique(['name', 'list_id']);
      table.integer('updated_user_id').notNullable().unsigned()
        .references('id')
        .inTable('users');
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('card_members', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('card_id').notNullable().unsigned()
        .references('id')
        .inTable('cards');
      table.integer('user_board_id').notNullable().unsigned()
        .references('id')
        .inTable('cards');
      table.unique(['user_board_id', 'card_id']);
      table.integer('updated_user_id').notNullable().unsigned()
        .references('id')
        .inTable('users');
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('comments', (table) => {
      table.increments('id').unsigned().primary();
      table.string('text').notNullable();
      table.integer('user_id').notNullable().unsigned()
        .references('id')
        .inTable('users');
      table.integer('card_id').notNullable().unsigned()
        .references('id')
        .inTable('cards');
      table.integer('updated_user_id').notNullable().unsigned()
        .references('id')
        .inTable('users');
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = (knex, Promise) => {
    return knex.schema
    .dropTableIfExists('comments')
    .dropTableIfExists('card_members')
    .dropTableIfExists('cards')
    .dropTableIfExists('lists')
    .dropTableIfExists('user_boards')
    .dropTableIfExists('boards');
};
