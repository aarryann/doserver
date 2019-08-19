// prettier-ignore
// knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = knex => {
  return knex.schema
    .createTable('AppVersion', (table) => {
      table.increments('id').unsigned().primary('appVersionPK');
      table.string('appVersion', 100).notNullable();
      table.string('dbVersion', 100).notNullable();
      table.string('upgradeMode', 100).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['appVersion', 'dbVersion'], 'appVersionUK');
    })
    .createTable('Tenant', (table) => {
      table.increments('id').unsigned().primary('tenantPK');
      table.string('tenantName', 100).notNullable().unique('tenantUK');
      table.integer('appVersionId').unsigned().notNullable()
        .references('id', 'tenantAppVersionFK')
        .inTable('AppVersion');
      table.string('status', 20).notNullable().defaultTo('Active');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('User', (table) => {
      table.increments('id').unsigned().primary('userPK');
      table.string('firstName', 50).notNullable();
      table.string('lastName', 50).notNullable();
      table.string('email', 100).notNullable().unique('userUK');
      table.string('password', 500).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned()
        .references('id', 'userUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('ActivityStep', (table) => {
      table.increments('id').unsigned().primary('activityStepPK');
      table.string('stepCode', 20).notNullable().unique('activityStepUK');
      table.string('stepName', 50).notNullable();
      table.string('description', 500).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'activityStepUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('Test', (table) => {
      table.increments('id').unsigned().primary('testPK');
      table.string('code', 20).notNullable().unique('testUK');
      table.string('name', 200).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'testUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('Medication', (table) => {
      table.increments('id').unsigned().primary('medicationPK');
      table.string('code', 20).notNullable().unique('medicationUK');
      table.string('description', 200).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'medicationUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('Referral', (table) => {
      table.increments('id').unsigned().primary('referralPK');
      table.string('code', 20).notNullable().unique('referralUK');
      table.string('description', 200).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'referralUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('QuestionLibrary', (table) => {
      table.increments('id').unsigned().primary('questionLibraryPK');
      table.integer('tenantId').unsigned().notNullable();
      table.string('libraryName', 50).notNullable();
      table.string('description', 1000).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'questionLibraryUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'libraryName'], 'questionLibraryTenantUK');
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('QuestionLibrary')
    .dropTableIfExists('Referral')
    .dropTableIfExists('Medication')
    .dropTableIfExists('Test')
    .dropTableIfExists('ActivityStep')
    .dropTableIfExists('User')
    .dropTableIfExists('Tenant')
    .dropTableIfExists('AppVersion');
};
