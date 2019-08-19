// prettier-ignore
// knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex) => {
  return knex.schema
    .createTable('Study', (table) => {
      table.increments('id').unsigned().primary('studyPK');
      table.integer('tenantId').unsigned().notNullable()
        .references('id', 'studyTenantFK')
        .inTable('Tenant');
      table.string('name', 80).notNullable();
      table.string('title', 255).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'studyUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'name'], 'studyUK');
    })
    .createTable('StudyVersion', (table) => {
      table.increments('id').unsigned().primary('studyVersionPK');
      table.integer('studyId').unsigned().notNullable()
        .references('id', 'versionStudyFK')
        .inTable('Study');
      table.string('studyVersion', 10).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'studyVersionUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['studyId', 'studyVersion'], 'studyVersionUK');
    })
    .createTable('StudyEvent', (table) => {
      table.increments('id').unsigned().primary('studyEventPK');
      table.integer('studyId').unsigned().notNullable()
        .references('id', 'eventStudyFK')
        .inTable('Study');
      table.string('eventCode', 20).notNullable();
      table.string('eventName', 50).notNullable();
      table.integer('eventOrder').unsigned().notNullable();
      table.integer('duration').unsigned().notNullable();
      table.string('durationUnit', 20).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'eventUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['studyId', 'eventName'], 'studyEventNameUK');
      table.unique(['studyId', 'eventCode'], 'studyEventCodeUK');
    })
    .createTable('StudyConsent', (table) => {
      table.increments('id').unsigned().primary('studyConsentPK');
      table.integer('studyId').unsigned().notNullable()
        .references('id', 'consentStudyFK')
        .inTable('Study');
      table.integer('versionId').unsigned().notNullable()
        .references('id', 'consentStudyVersionFK')
        .inTable('StudyVersion');
      table.string('url', 500).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'consentUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['studyId', 'versionId'], 'studyConsentUK');
    })
    .createTable('EventStep', (table) => {
      table.increments('id').unsigned().primary('eventStepPK');
      table.integer('studyId').unsigned().notNullable()
        .references('id', 'eventStepStudyFK')
        .inTable('Study');
      table.string('eventCode', 20).notNullable();
      table.string('groupName', 50);
      table.string('stepCode', 20)
        .references('stepCode', 'eventStepFK')
        .inTable('ActivityStep');
      table.integer('groupId').unsigned()
        .references('id', 'eventStepGroupFK')
        .inTable('EventStep');
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'eventStepUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.foreign(['studyId','eventCode'], 'stepEventCodeFK')
        .references(['studyId','eventCode'])
        .on('StudyEvent');	
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('EventStep')
    .dropTableIfExists('StudyConsent')
    .dropTableIfExists('StudyEvent')
    .dropTableIfExists('StudyVersion')
    .dropTableIfExists('Study');
};
