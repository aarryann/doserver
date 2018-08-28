//{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.oM7HJV9tjc0TSdiVdS6jje0QgejmKa-uoPSdm1JVNJ4"}
const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server');
const { schema } = require('./schema');
const config = require('./config.js');
const utils = require('./helpers/utils.js');
const { PubSub } = require('apollo-server');

const app = express();
const pubsub = new PubSub();
const PORT = 4000;

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
        knex: config.knex,
        pubsub: pubsub
      }
    };
  }
});

/*
//server.applyMiddleware({ app, path: '/graphql' });
server.applyMiddleware({ app });
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${
      server.subscriptionsPath
    }`
  );
});
*/

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
