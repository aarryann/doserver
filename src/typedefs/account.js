const Account = `
  type AppVersions {
    id: Int!
    appVersion: String
    dbVersion: String
    upgradeMode: String
    status: String
    updated: String
  }

  type User {
    id: Int!
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type UserAuth {
    token: String
    user: User!
  }

  # the schema allows the following query:
  type Query {
    user(id: Int!): User
  }

  # this schema allows the following mutation:
  type Mutation {
    login ( email: String!, password: String! ): UserAuth
  }
`;

module.exports = Account;