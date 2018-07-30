const Board = `
  type User {
    id: Int!
    firstName: String
    lastName: String
    email: String
    password: String
    boards: [Board] # the list of Boards by this User
  }

  type Board {
    id: Int!
    name: String
    slug: String
    user: User
  }

  # the schema allows the following query:
  type Query {
    ownedBoards(id: Int!): [Board]
  }

  # this schema allows the following mutation:
  type Mutation {
    upvoteBoard ( boardId: Int!): Board
    createBoard ( boardName: String!): Board
  }
`;

module.exports = Board;