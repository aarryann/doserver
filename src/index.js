//{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.oM7HJV9tjc0TSdiVdS6jje0QgejmKa-uoPSdm1JVNJ4"}
require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const resolvers1 = require('./resolvers');
const config = require('./config.js');
const Session = require('./models/Session.js');
const utils = require('./helpers/utils.js');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    user(id: Int!): User
  }

  type User {
    id: Int!
    firstName: String
    lastName: String
    email: String
  }

`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    user: async (_, { id }, ctx) => {
      //console.log(ctx);
      return Session.getUserDetails(ctx.conn.knex, id);
    },
  },
};

// Start the server
const server = new ApolloServer({ typeDefs, resolvers, context: ({ req, res }) => {
  const user = utils.getUserId(null, req);
  return {
    user,
    conn: {
      knex: config.knex 
    }
  };
}});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});