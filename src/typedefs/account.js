import { gql } from 'apollo-server-express';

export default `
  extend type Query {
    user(id: Int!): User
    currentUser: UserAuth
  }

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
    userId: Int!
    token: String!
    user: User
  }

  extend type Mutation {
    login(email: String!, password: String!): UserAuth
  }
`;
