//{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.oM7HJV9tjc0TSdiVdS6jje0QgejmKa-uoPSdm1JVNJ4"}
const { ApolloServer } = require('apollo-server');
const { schema } = require('./schema');
const config = require('./config.js');
const utils = require('./helpers/utils.js');

// Start the server
const server = new ApolloServer({
  cors: true,
  schema,
  context: ({ req }) => {
    const queryBody = req.body.query;
    let userId = 0;
    let token;
    if (
      queryBody.indexOf('login') === -1 &&
      queryBody.indexOf('signup') === -1
    ) {
      ({ userId, token } = utils.getUserId(null, req));
    }
    return {
      userId,
      token,
      conn: {
        knex: config.knex
      }
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
