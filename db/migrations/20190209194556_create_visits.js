// prettier-ignore
//knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex) => {
  return knex.schema
    .createTable('Screening', (table) => {
      table.increments('id').unsigned().primary('screeningPK');
      table.integer('tenantId').notNullable().unsigned()
        .references('id', 'screeningTenantFK')
        .inTable('Tenant');
      table.string('mrn', 50);
      table.string('firstName', 200).notNullable();
      table.string('middleInitial', 10);
      table.string('lastName', 200).notNullable();
      table.string('currentGender', 50).notNullable();
      table.timestamp('dob').notNullable();
      table.timestamp('screenedOn').notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').notNullable().unsigned()
        .references('id', 'screeningUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'mrn'], 'screeningTenantMrnUK');
    })
    .createTable('Subject', (table) => {
      table.increments('id').unsigned().primary('screeningPK');
      table.integer('tenantId').notNullable().unsigned()
        .references('id', 'subjectTenantFK')
        .inTable('Tenant');
      table.string('mrn', 50);
      table.string('pid', 50);
      table.string('firstName', 200).notNullable();
      table.string('middleInitial', 10);
      table.string('lastName', 200).notNullable();
      table.string('currentGender', 50).notNullable();
      table.timestamp('dob').notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').notNullable().unsigned()
        .references('id', 'subjectUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'mrn'], 'subjectTenantMrnUK');
    })
    .createTable('StudySubject', (table) => {
      table.increments('id').unsigned().primary('sitePK');
      table.integer('subjectId').notNullable().unsigned()
        .references('id', 'siteRegisteredStudyFK')
        .inTable('Subject');
      table.integer('screeningId').notNullable().unsigned()
        .references('id', 'siteRegisteredStudyFK')
        .inTable('Screening');
      table.integer('studyId').notNullable().unsigned()
        .references('id', 'siteRegisteredStudyFK')
        .inTable('Study');
      table.integer('versionId').notNullable().unsigned()
        .references('id', 'siteRegisteredStudyVersionFK')
        .inTable('StudyVersion');
      table.integer('siteId').notNullable().unsigned()
        .references('id', 'siteRegisteredStudySiteFK')
        .inTable('Site');
      table.timestamp('registeredOn').notNullable();
      table.string('isCurrent', 3).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').notNullable().unsigned()
        .references('id', 'siteRegisteredStudyUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'mrn'], 'screeningTenantMrnUK');
    })
    .createTable('SiteRegisteredStudy', (table) => {
      table.increments('id').unsigned().primary('sitePK');
      table.integer('studyId').notNullable().unsigned()
        .references('id', 'siteRegisteredStudyFK')
        .inTable('Study');
      table.integer('versionId').notNullable().unsigned()
        .references('id', 'siteRegisteredStudyVersionFK')
        .inTable('StudyVersion');
      table.integer('siteId').notNullable().unsigned()
        .references('id', 'siteRegisteredStudySiteFK')
        .inTable('Site');
      table.timestamp('registeredOn').notNullable();
      table.string('isCurrent', 3).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').notNullable().unsigned()
        .references('id', 'siteRegisteredStudyUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'mrn'], 'screeningTenantMrnUK');
    });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('Site');
};
