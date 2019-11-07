// prettier-ignore
//knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex) => {
  return knex.schema
    .createTable('boards', (table) => {
      table.increments('id').unsigned().primary();
      table.string('name').notNullable();
      table.string('slug').unique().notNullable();
      table.integer('owner').notNullable().unsigned()
        .references('id')
        .inTable('User');
      table.integer('updatedBy').notNullable().unsigned()
        .references('id')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('user_boards', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('userId').notNullable().unsigned()
        .references('id')
        .inTable('User');
      table.integer('boardId').notNullable().unsigned()
        .references('id')
        .inTable('boards');
      table.unique(['userId', 'boardId']);
      table.integer('updatedBy').notNullable().unsigned()
        .references('id')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('lists', (table) => {
      table.increments('id').unsigned().primary();
      table.string('name').notNullable();
      table.integer('position').notNullable().unsigned();
      table.integer('boardId').notNullable().unsigned()
        .references('id')
        .inTable('boards');
      table.unique(['name', 'boardId']);
      table.integer('updatedBy').notNullable().unsigned()
        .references('id')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('cards', (table) => {
      table.increments('id').unsigned().primary();
      table.string('name').notNullable();
      table.string('description');
      table.integer('position').notNullable().unsigned();
      table.string('tags');
      table.integer('listId').notNullable().unsigned()
        .references('id')
        .inTable('lists');
      table.unique(['name', 'listId']);
      table.integer('updatedBy').notNullable().unsigned()
        .references('id')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('card_members', (table) => {
      table.increments('id').unsigned().primary();
      table.integer('cardId').notNullable().unsigned()
        .references('id')
        .inTable('cards');
      table.integer('userBoardId').notNullable().unsigned()
        .references('id')
        .inTable('cards');
      table.unique(['userBoardId', 'cardId']);
      table.integer('updatedBy').notNullable().unsigned()
        .references('id')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('comments', (table) => {
      table.increments('id').unsigned().primary();
      table.string('text').notNullable();
      table.integer('userId').notNullable().unsigned()
        .references('id')
        .inTable('User');
      table.integer('cardId').notNullable().unsigned()
        .references('id')
        .inTable('cards');
      table.integer('updatedBy').notNullable().unsigned()
        .references('id')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('comments')
    .dropTableIfExists('card_members')
    .dropTableIfExists('cards')
    .dropTableIfExists('lists')
    .dropTableIfExists('user_boards')
    .dropTableIfExists('boards');
};