const Board = `
  type User {
    id: Int!
    firstName: String
    lastName: String
    email: String
    password: String
    ownedBoards: [Board] 
    memberBoards: [Board] 
    otherBoards: [Board] 
  }

  type Board {
    id: Int!
    name: String
    slug: String
    owner: User
    members: [User]
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
    members: [User]
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
    ownedBoards ( userId: Int! ): [Board]
    otherBoards ( userId: Int! ): [Board]
  }

  # this schema allows the following mutation:
  type Mutation {
    createBoard ( boardName: String! ): Board
    createList ( listName: String!, boardId: Int! ): List
    createCard ( cardName: String!, description: String, tags: String, listId:Int! ): Card
  }
`;

module.exports = Board;