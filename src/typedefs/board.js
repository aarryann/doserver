const Board = `
  type User {
    id: Int!
    firstName: String
    lastName: String
    email: String
    password: String
    ownedBoards: [Board] 
    userBoards: [Board] 
    otherBoards: [Board] 
  }

  type Board {
    id: Int!
    name: String
    slug: String
    user: User
    lists: [List]
  }

  type List {
    id: Int!
    name: String
    position: Int
    board: Board
    cards: [Card]
  }

  type Card {
    id: Int!
    name: String
    description: String
    tags: String
    position: Int
    list: List
    comments: [Comment]
  }

  type Comment {
    id: Int!
    text: String
    user: User
    card: Card
  }

  # the schema allows the following query:
  type Query {
    ownedBoards(userId: Int!): [Board]
  }

  # this schema allows the following mutation:
  type Mutation {
    createBoard ( boardName: String!): Board
  }
`;

module.exports = Board;