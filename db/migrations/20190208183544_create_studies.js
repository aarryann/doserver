// prettier-ignore
//knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex) => {
  return knex.schema
    .createTable('Study', (table) => {
      table.increments('id').unsigned().primary('studyPK');
      table.integer('tenantId').notNullable().unsigned()
        .references('id', 'studyTenantFK')
        .inTable('Tenant');
      table.string('name', 80).notNullable();
      table.string('title').notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.unique(['tenantId', 'studyName'], 'studyNameTenantUK');
      table.integer('updatedBy').notNullable().unsigned()
        .references('id', 'studyUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('StudyVersion', (table) => {
      table.increments('id').unsigned().primary('studyVersionPK');
      table.integer('studyId').notNullable().unsigned()
        .references('id', 'versionStudyFK')
        .inTable('Study');
      table.string('studyVersion', 10).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.unique(['studyId', 'studyVersion'], 'studyVersionUK');
      table.integer('updatedBy').notNullable().unsigned()
        .references('id', 'studyVersionUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('StudyEvent', (table) => {
      table.increments('id').unsigned().primary('studyEventPK');
      table.integer('studyId').notNullable().unsigned()
        .references('id', 'eventStudyFK').inTable('Study');
      table.string('eventCode', 4).notNullable();
      table.string('eventName', 50).notNullable();
      table.integer('eventOrder').notNullable().unsigned();
      table.integer('duration').notNullable().unsigned();
      table.string('durationUnit', 20).notNullable();
      table.string('status', 20).unique().notNullable().defaultTo('Active');
      table.unique(['studyId', 'eventCode'], 'studyEventCodeUK');
      table.unique(['studyId', 'eventName'], 'studyEventNameUK');
      table.integer('updatedBy').notNullable().unsigned()
        .references('id', 'eventUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('StudyConsent', (table) => {
      table.increments('id').unsigned().primary('studyConsentPK');
      table.integer('studyId').notNullable().unsigned()
        .references('id', 'consentStudyFK').inTable('Study');
      table.integer('versionId').notNullable().unsigned()
        .references('id', 'consentStudyVersionFK').inTable('Study');
      table.string('url', 500).notNullable();
      table.string('status', 20).unique().notNullable().defaultTo('Active');
      table.unique(['studyId', 'versionId'], 'consentStudyVersionUK');
      table.integer('updatedBy').notNullable().unsigned()
        .references('id', 'consentUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('StudyConsent')
    .dropTableIfExists('StudyEvent')
    .dropTableIfExists('StudyVersion')
    .dropTableIfExists('Study');
};
