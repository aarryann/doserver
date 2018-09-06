//{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.oM7HJV9tjc0TSdiVdS6jje0QgejmKa-uoPSdm1JVNJ4"}
import express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema';
import config from './config.js';
import { PubSub } from 'apollo-server';

const app = express();
const pubsub = new PubSub();
const PORT = 4000;

// Start the server
const server = new ApolloServer({
  cors: true,
  schema,
  context: ({ req }) => {
    //eslint-disable-next-line
    const queryBody = req.body.query;
    let userId = 0;
    let token;
    //if ( queryBody.indexOf("login") === -1 && queryBody.indexOf("signup") === -1) { ({ userId, token } = utils.getUserId(null, req)); }
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

server.applyMiddleware({ app, path: '/graphql' });
//server.applyMiddleware({ app });
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  //eslint-disable-next-line
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  //eslint-disable-next-line
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${
      server.subscriptionsPath
    }`
  );
});
/*
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
*/
