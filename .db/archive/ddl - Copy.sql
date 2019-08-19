type AppVersion {
  id: ID!
  appVersion: String
  dbVersion: String
  upgradeMode: String
  status: String
  updatedOn: String
}

type Tenant {
  id: ID!
  tenantName: String
  appVersion: AppVersion
  status: String
  updatedOn: String
}

type User {
  id: ID!
  firstName: String
  lastName: String
  email: String
  password: String
  status: String
  updatedBy: User
  updatedOn: String
}

type ActivityStep {
  id: ID!
  stepCode: String
  stepName: String
  description: String
  status: String
  updatedBy: User
  updatedOn: String
}

type Test {
  id: ID!
  code: String
  name: String
  status: String
  updatedBy: User
  updatedOn: String
}

type Medication {
  id: ID!
  code: String
  description: String
  status: String
  updatedBy: User
  updatedOn: String
}

type Referral {
  id: ID!
  code: String
  description: String
  status: String
  updatedBy: User
}

type QuestionLibrary {
  id: ID!
  tenant: Tenant
  libraryName: String
  description: String
  status: String
  updatedBy: User
  updatedOn: String
}



type Study {
  id: ID!
  tenant: Tenant
  name: String
  title: String
  status: String
  updatedBy: User
  updatedOn: String
}

type StudyVersion {
  id: ID!
  study: Study
  version: String
  status: String
  updatedBy: User
  updatedOn: String
}

type StudyEvent {
  id: ID!
  study: Study
  eventCode: String
  eventName: String
  eventOrder: Int
  duration: Int
  durationUnit: String
  status: String
  updatedBy: User
  updatedOn: String
}

type StudyConsent {
  id: ID!
  study: Study
  version: StudyVersion
  url: String
  status: String
  updatedBy: User
  updatedOn: String
}



type Site {
  id: ID!
  tenant: Tenant
  name: String
  status: String
  updatedBy: User
  updatedOn: String
}

type SiteRegisteredStudy {
  id: ID!
  study: Study
  version: StudyVersion
  site: Site
  registeredOn: String
  isCurrent: String
  updatedBy: User
  updatedOn: String
}



type Screening {
  id: ID!
  tenant: Tenant
  mrn: String
  firstName: String
  middleInitial: String
  lastName: String
  currentGender: String
  dob: String
  screenedOn: String
  updatedBy: User
  updatedOn: String
}

type Subject {
  id: ID!
  tenant: Tenant
  mrn: String
  pid: String
  firstName: String
  middleInitial: String
  lastName: String
  currentGender: String
  dob: String
  status: String
  updatedBy: User
  updatedOn: String
}

type StudySubject {
  id: ID!
  subject: Subject
  screening: Screening
  site: Site
  study: Study
  sitePid: String
  enrollmentDate: String
  enrollmentStatus: String
  enrollmentStatusDate: String
  updatedBy: User
  updatedOn: String
}

type SubjectVisit {
  id: ID!
  studySubject: StudySubject
  version: StudyVersion
  eventCode: String
  eventName: String
  isUnscheduled: String
  visitDate: String
  visitReason: String
  updatedBy: User
  updatedOn: String
}

type SubjectConsent {
  id: ID!
  studySubject: StudySubject
  studyConsent: StudyConsent
  consentedOn: String
  updatedBy: User
  updatedOn: String
}

type EventStep {
  id: ID!
  study: Study
  eventCode: String
  groupName: String
  stepCode: String
  groupId: EventStep
  status: String
  updatedBy: User
  updatedOn: String
}

type VisitSummary {
  subjectVisit: SubjectVisit
  issueCount: Int
  updatedOn: String
}

type VisitDetail {
  id: ID!
  subjectVisit: SubjectVisit
  stepCode: String
  issueCount: Int
  updatedOn: String
}

type Demographic {
  studySubject: StudySubject
  birthGender: String
  race: String
  ethnicity: String
  birthCountry: String
  updatedOn: String
}

type VisitTest {
  id: ID!
  studySubject: StudySubject
  test: Test
  placedOn: String
  effectiveOn: String
  updatedBy: User
  updatedOn: String
}

type VisitOrder {
  id: ID!
  studySubject: StudySubject
  orderCode: String
  orderDate: String
  updatedBy: User
  updatedOn: String
}

type VisitReferral {
  id: ID!
  studySubject: StudySubject
  referral Referral
  referredOn: String
  updatedBy: User
  updatedOn: String
}


type TenantAddress {
  id: ID!
  tenant: Tenant
  url: String
  type: String
  isPrimary: String
  status: String
  updatedBy: User
  updatedOn: String
}

type TenantUser {
  id: ID!
  tenant: Tenant
  user: User
  lastLoginOn: String
  status: String
  updatedBy: User
  updatedOn: String
}

type TenantStudy {
  id: ID!
  tenant: Tenant
  study: Study
  status: String
  updatedBy: User
  updatedOn: String
}

type TenantStep {
  id: ID!
  tenant: Tenant
  stepCode: String
  status: String
  updatedBy: User
  updatedOn: String
}

type TenantSite {
  id: ID!
  tenant: Tenant
  site: Site
  status: String
  updatedBy: User
  updatedOn: String
}

type TenantTest {
  id: ID!
  tenant: Tenant
  test: Test
  status: String
  updatedBy: User
  updatedOn: String
}

type TenantMedication {
  id: ID!
  tenant: Tenant
  medication: Medication
  status: String
  updatedBy: User
  updatedOn: String
}

type TenantReferral {
  id: ID!
  tenant: Tenant
  referral: Referral
  status: String
  updatedBy: User
  updatedOn: String
}

