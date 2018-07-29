const Book = `
  type Book {
    title: String
    author: String
  }

  # the schema allows the following query:
  type Query {
    books: [Book]
  }
`;

module.exports = Book;
