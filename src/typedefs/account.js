export default `
  extend type Query {
    user(id: ID!): User
    currentUser: UserAuth
  }

  type AppVersions {
    id: ID!
    appVersion: String
    dbVersion: String
    upgradeMode: String
    versionStatus: String
    updated: String
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    userStatus: String
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
