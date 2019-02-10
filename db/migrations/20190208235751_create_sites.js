// prettier-ignore
//knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex) => {
  return knex.schema
    .createTable('Site', (table) => {
      table.increments('id').unsigned().primary('sitePK');
      table.integer('tenantId').notNullable().unsigned()
        .references('id', 'siteTenantFK')
        .inTable('Tenant');
      table.string('name', 80).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.unique(['tenantId', 'name'], 'siteNameTenantUK');
      table.integer('updatedBy').notNullable().unsigned()
        .references('id', 'siteUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
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
    });
};

exports.down = knex => {
  return knex.schema.dropTableIfExists('Site');
};
