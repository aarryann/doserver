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
    createBoard ( name: String!, owner: Int! ): Board
    createList ( name: String!, boardId: Int! ): List
    createCard ( name: String!, description: String, tags: String, 
      listId:Int! ): Card
    addCardComment ( text: String!, userId: Int!, cardId: Int! ): Card
    addBoardMember ( email: String!, boardId: Int! ): User
    addCardMember ( userId: Int!, boardId: Int!, cardId: Int! ): Card
    removeCardMember ( userId: Int!, boardId: Int!, cardId: Int! ): Card
  }
`;

module.exports = Board;