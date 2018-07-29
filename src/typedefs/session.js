const Session = `
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
    boards: [Board] # the list of Boards by this User
  }

  type UserAuth {
    token: String
    user: User!
  }

  type Board {
    id: Int!
    name: String
    slug: String
    user: User
  }

  # the schema allows the following query:
  type Query {
    boards: [Board]
    user(id: Int!): User
    getAuth(email: String!, password: String!): UserAuth
  }

  # this schema allows the following mutation:
  type Mutation {
    upvoteBoard (
      boardId: Int!
    ): Board
  }
`;

module.exports = Session;