// prettier-ignore
// knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex) => {
  return knex.schema
    .createTable('TenantAddress', (  table) => {
      table.increments('id').unsigned().primary('tenantAddressPK');
      table.integer('tenantId').unsigned().notNullable()
        .references('id', 'tenantAddressFK')
        .inTable('Tenant');
      table.string('url', 500).notNullable().unique('tenantAddressUK');
      table.string('type', 20).notNullable();
      table.string('isPrimary', 3).notNullable();
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'tenantAddressUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('TenantUser', (  table) => {
      table.increments('id').unsigned().primary('tenantUserPK');
      table.integer('tenantId').unsigned().notNullable()
        .references('id', 'tenantUserTenantFK')
        .inTable('Tenant');
      table.integer('userId').unsigned().notNullable()
        .references('id', 'tenantUserFK')
        .inTable('User');
      table.timestamp('lastLoginOn');
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'tenantUserUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'userId'], 'tenantUserUK');
    })
    .createTable('TenantStudy', (  table) => {
      table.increments('id').unsigned().primary('tenantStudyPK');
      table.integer('tenantId').unsigned().notNullable()
        .references('id', 'tenantStudyTenantFK')
        .inTable('Tenant');
      table.integer('studyId').unsigned().notNullable()
        .references('id', 'tenantStudyFK')
        .inTable('Study');
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'tenantStudyUptedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'studyId'], 'tenantStudyUK');
    })
    .createTable('TenantSite', (  table) => {
      table.increments('id').unsigned().primary('tenantSitePK');
      table.integer('tenantId').unsigned().notNullable()
        .references('id', 'tenantSiteTenantFK')
        .inTable('Tenant');
      table.integer('siteId').unsigned().notNullable()
        .references('id', 'tenantSiteFK')
        .inTable('Site');
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'tenantSiteUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'siteId'], 'tenantSiteUK');
    })
    .createTable('TenantStep', (  table) => {
      table.increments('id').unsigned().primary('tenantStepPK');
      table.integer('tenantId').unsigned().notNullable()
        .references('id', 'tenantStepTenantFK')
        .inTable('Tenant');
      table.string('stepCode', 20).notNullable()
        .references('stepCode', 'tenantStepFK')
        .inTable('ActivityStep');
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'updatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'stepCode'], 'tenantStepUK');
    })
    .createTable('TenantTest', (  table) => {
      table.increments('id').unsigned().primary('tenantTestPK');
      table.integer('tenantId').unsigned().notNullable()
        .references('id', 'tenantTestTenantFK')
        .inTable('Tenant');
      table.string('code', 20).notNullable().unique('tenantTestUK')
        .references('code', 'tenantTestFK')
        .inTable('Test');
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'tenantTestUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'code'], 'tenantTestCodeUK');
    })
    .createTable('TenantMedication', (  table) => {
      table.increments('id').unsigned().primary('tenantMedicationPK');
      table.integer('tenantId').unsigned().notNullable()
        .references('id', 'tenantMedicationTenantFK')
        .inTable('Tenant');
      table.string('code', 20).notNullable().unique('tenantMedicationUK')
        .references('code', 'tenantMedicationCodeFK')
        .inTable('Medication');
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'tenantMedicationUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'code'], 'tenantMedicationCodeUK');
    })
    .createTable('TenantReferral', (  table) => {
      table.increments('id').unsigned().primary('tenantReferralPK');
      table.integer('tenantId').unsigned().notNullable()
        .references('id', 'tenantReferralTenantFK')
        .inTable('Tenant');
      table.string('code', 20).notNullable()
        .references('code', 'tenantReferralCodeFK')
        .inTable('Referral');
      table.string('status', 20).notNullable().defaultTo('Active');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'tenantReferralUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'code'], 'tenantReferralUK');
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('TenantReferral')
    .dropTableIfExists('TenantMedication')
    .dropTableIfExists('TenantTest')
    .dropTableIfExists('TenantStep')
    .dropTableIfExists('TenantSite')
    .dropTableIfExists('TenantStudy')
    .dropTableIfExists('TenantUser')
    .dropTableIfExists('TenantAddress');
};
