export default `
  extend type Query {
    user(id: ID!): User
    currentUser: UserAuth
  }

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

  type UserAuth {
    userId: ID!
    token: String!
    user: User
  }

  extend type Mutation {
    login(email: String!, password: String!): UserAuth
  }
`;
