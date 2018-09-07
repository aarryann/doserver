//{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.oM7HJV9tjc0TSdiVdS6jje0QgejmKa-uoPSdm1JVNJ4"}
//import express from 'express';
//import { createServer } from 'http';
//import { ApolloServer } from 'apollo-server-express';
import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './typedefs';
import { getMe, knex, pubsub } from './helpers/utils';
//import cors from 'cors';

//const app = express();
//app.use('*', cors({ origin: 'http://localhost:3000' }));
//const PORT = 5000;

// Start the server
const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path
  }),
  context: ({ req }) => {
    let rbq = '';
    if (req && req.body && req.body.query) {
      rbq = req.body.query;
    }
    let userId = 0;
    let token;
    if (
      rbq.length > 1 &&
      rbq.indexOf('login') === -1 &&
      rbq.indexOf('signup') === -1 &&
      rbq.indexOf('IntrospectionQuery') === -1
    ) {
      ({ userId, token } = getMe(req));
    }
    return {
      userId,
      token,
      conn: {
        knex,
        pubsub
      }
    };
  }
});
/*
server.applyMiddleware({ app, path: '/graphql' });
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
*/

server.listen().then(({ url, subscriptionsUrl }) => {
  //eslint-disable-next-line
  console.log(`🚀 Server ready at ${url}`);
  //eslint-disable-next-line
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
