// prettier-ignore
// knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex) => {
  return knex.schema
    .createTable('Site', (table) => {
      table.increments('id').unsigned().primary('sitePK');
      table.integer('tenantId').unsigned().notNullable()
        .references('id', 'siteTenantFK')
        .inTable('Tenant');
      table.string('name', 200).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'siteUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'name'], 'siteUK');
    })
    .createTable('SiteRegisteredStudy', (table) => {
      table.increments('id').unsigned().primary('siteRegisteredStudyPK');
      table.integer('studyId').unsigned().notNullable()
        .references('id', 'siteRegisteredStudyFK')
        .inTable('Study');
      table.integer('versionId').unsigned().notNullable()
        .references('id', 'siteRegisteredStudyVersionFK')
        .inTable('StudyVersion');
      table.integer('siteId').unsigned().notNullable()
        .references('id', 'siteRegisteredStudySiteFK')
        .inTable('Site');
      table.timestamp('registeredOn').notNullable();
      table.string('isCurrent', 3).notNullable();
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'siteRegisteredStudyUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['siteId', 'studyId', 'versionId'], 'siteRegisteredStudyUK');
    })
    .createTable('PidCounter', (table) => {
      table.integer('siteRegisteredStudyId').unsigned().primary()
        .references('id', 'pidCounterRegisteredStudyFK')
        .inTable('SiteRegisteredStudy');
      table.integer('minPid').unsigned();
      table.integer('maxPid').unsigned();
      table.integer('lastPid').unsigned().notNullable();
      table.integer('minSitePid').unsigned();
      table.integer('maxSitePid').unsigned();
      table.integer('lastSitePid').unsigned().notNullable();
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('PidCounter')
    .dropTableIfExists('SiteRegisteredStudy')
    .dropTableIfExists('Site');
};
