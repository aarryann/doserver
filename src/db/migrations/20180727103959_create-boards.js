//knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex, Promise) => {
    return knex.schema
    .createTable('boards', (table) => {
      table.increments('id').unsigned().primary();
      table.string('name');
      table.string('slug');
      table.integer('user_id').unsigned()
        .references('id')
        .inTable('users');
      table.timestamps();
    })
    .createTable('user_boards', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('user_id').unsigned()
        .references('id')
        .inTable('users');
      table.integer('board_id').unsigned()
        .references('id')
        .inTable('boards');
      table.timestamps();
    })
    .createTable('lists', (table) => {
      table.increments('id').unsigned().primary();
      table.string('name');
      table.integer('position').unsigned();
      table.integer('board_id').unsigned()
        .references('id')
        .inTable('boards');
      table.timestamps();
    })
    .createTable('cards', (table) => {
      table.increments('id').unsigned().primary();
      table.string('name');
      table.string('description');
      table.integer('position').unsigned();
      table.string('tags');
      table.integer('list_id').unsigned()
        .references('id')
        .inTable('lists');
      table.timestamps();
    })
    .createTable('card_members', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('card_id').unsigned()
        .references('id')
        .inTable('cards');
      table.integer('user_board_id').unsigned()
        .references('id')
        .inTable('cards');
      table.timestamps();
    })
    .createTable('comments', (table) => {
      table.increments('id').unsigned().primary();
      table.string('text');
      table.integer('user_id').unsigned()
        .references('id')
        .inTable('users');
      table.integer('card_id').unsigned()
        .references('id')
        .inTable('cards');
      table.timestamps();
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
