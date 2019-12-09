// prettier-ignore
// knex migrate:make filename; knex migrate:latest; knex migrate:rollback

exports.up = (knex) => {
  return knex.schema
    .createTable('Subject', (table) => {
      table.increments('id').unsigned().primary('subjectPK');
      table.integer('tenantId').unsigned().notNullable()
        .references('id', 'subjectTenantFK')
        .inTable('Tenant');
      table.string('mrn', 50);
      table.string('pid', 50).notNullable();
      table.string('firstName', 200).notNullable();
      table.string('middleInitial', 10);
      table.string('lastName', 200).notNullable();
      table.string('currentGender', 50).notNullable();
      table.timestamp('dob').notNullable();
      table.string('isDobApprox', 5).notNullable().defaultTo('No');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'subjectUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['tenantId', 'mrn'], 'subjectTenantMrnUK');
      table.unique(['tenantId', 'pid'], 'subjectTenantPidUK');
    })
    .createTable('StudySubject', (table) => {
      table.increments('id').unsigned().primary('studySubjectPK');
      table.integer('subjectId').unsigned()
        .references('id', 'studySubjectFK')
        .inTable('Subject');
      table.integer('siteId').unsigned().notNullable()
        .references('id', 'studySubjectSiteFK')
        .inTable('Site');
      table.integer('studyId').unsigned().notNullable()
        .references('id', 'studySubjectStudyFK')
        .inTable('Study');
      table.string('sitePid', 20);
      table.timestamp('enrollmentDate');
      table.string('enrollmentStatus', 50).notNullable();
      table.timestamp('enrollmentStatusDate').notNullable();
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'studySubjectUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['studyId', 'subjectId'], 'studySubjectUK');
    })
    .createTable('SubjectVisit', (table) => {
      table.increments('id').unsigned().primary('subjectVisitPK');
      table.integer('studySubjectId').unsigned().notNullable()
        .references('id', 'visitSubjectFK')
        .inTable('StudySubject');
      table.integer('versionId').unsigned().notNullable();
      table.string('eventCode', 20).notNullable();
      table.string('eventName', 200).notNullable();
      table.string('isUnscheduled', 3);
      table.timestamp('visitDate').notNullable();
      table.string('visitReason', 200);
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'subjectVisitUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['studySubjectId', 'code', 'eventName'], 'subjectVisitUK');
    })
    .createTable('SubjectConsent', (table) => {
      table.increments('id').unsigned().primary('subjectConsentPK');
      table.integer('studySubjectId').unsigned().notNullable()
        .references('id', 'subjectConsentSiteSubjectFK')
        .inTable('StudySubject');
      table.integer('studyConsentId').unsigned().notNullable()
        .references('id', 'subjectConsentFK')
        .inTable('StudyConsent');
      table.timestamp('consentedOn').notNullable();
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'subjectConsentUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['studySubjectId', 'studyConsentId'], 'subjectConsentUK');
    })
    .createTable('VisitSummary', (table) => {
      table.integer('subjectVisitId').unsigned().primary()
        .references('id', 'visitSummarySubjectFK')
        .inTable('SubjectVisit');
      table.integer('issueCount').unsigned().notNullable();
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('VisitDetail', (table) => {
      table.increments('id').unsigned().primary('visitDetailPK');
      table.integer('subjectVisitId').unsigned()
        .references('id', 'visitDetailSubjectFK')
        .inTable('SubjectVisit');
      table.string('stepCode', 20).notNullable()
        .references('stepCode', 'visitDetailStepFK')
        .inTable('ActivityStep');
      table.integer('issueCount').unsigned().notNullable();
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
      table.unique(['subjectVisitId', 'stepCode'], 'visitDetailUK');
    })
    .createTable('Demographic', (table) => {
      table.integer('studySubjectId').unsigned().primary()
        .references('id', 'demographicsSubjectFK')
        .inTable('StudySubject');
      table.string('birthGender', 20).notNullable();
      table.string('race', 50).notNullable();
      table.string('ethnicity', 20).notNullable();
      table.string('birthCountry', 2).notNullable();
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'demographicUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('VisitTest', (table) => {
      table.increments('id').unsigned().primary('visitTestPK');
      table.integer('studySubjectId').unsigned().notNullable();
      table.string('testCode', 20).notNullable()
        .references('code', 'visitTestFK')
        .inTable('Test');
      table.timestamp('placedOn').notNullable();
      table.timestamp('effectiveOn');
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'visitTestUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('VisitOrder', (table) => {
      table.increments('id').unsigned().primary('visitOrderPK');
      table.integer('studySubjectId').unsigned().notNullable();
      table.string('orderCode', 200).notNullable();
      table.timestamp('orderDate').notNullable();
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'visitOrderUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('VisitReferral', (table) => {
      table.increments('id').unsigned().primary('visitReferralPK');
      table.integer('studySubjectId').unsigned().notNullable();
      table.string('referralCode', 20).notNullable()
        .references('code', 'visitReferralCodeFK')
        .inTable('Referral');
      table.timestamp('referredOn').notNullable();
      table.integer('updatedBy').unsigned().notNullable()
        .references('id', 'visitReferralUpdatedByFK')
        .inTable('User');
      table.timestamp('updatedOn').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('VisitReferral')
    .dropTableIfExists('VisitOrder')
    .dropTableIfExists('VisitTest')
    .dropTableIfExists('Demographic')
    .dropTableIfExists('VisitDetail')
    .dropTableIfExists('VisitSummary')
    .dropTableIfExists('SubjectConsent')
    .dropTableIfExists('SubjectVisit')
    .dropTableIfExists('StudySubject')
    .dropTableIfExists('Subject')
};
