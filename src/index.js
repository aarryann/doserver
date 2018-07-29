//{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.oM7HJV9tjc0TSdiVdS6jje0QgejmKa-uoPSdm1JVNJ4"}
require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { schema } = require('./schema');
const config = require('./config.js');
const utils = require('./helpers/utils.js');

// Start the server
//const server = new ApolloServer({ typeDefs: [Schema, Query, 
//...schemaTypeDefs], resolvers, context: ({ req, res }) => {
const server = new ApolloServer({ schema , context: ({ req }) => {
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