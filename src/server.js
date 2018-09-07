import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { schema } from './schema';
import { getMe, knex, pubsub } from './helpers/utils';

import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

const PORT = 4000;
const server = express();

server.use('*', cors({ origin: 'http://localhost:3000' }));

server.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => {
    const rbq = req.body.query;
    let userId = 0;
    let token;
    if (
      rbq.indexOf('login') === -1 &&
      rbq.indexOf('signup') === -1 &&
      rbq.indexOf('IntrospectionQuery') === -1
    ) {
      ({ userId, token } = getMe(req));
    }
    return {
      schema,
      formatError: error => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path
      }),
      context: {
        userId,
        token,
        conn: {
          knex,
          pubsub
        }
      }
    };
  })
);

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: 'ws://localhost:4000/subscriptions'
  })
);

// We wrap the express server so that we can attach the WebSocket for subscriptions
const ws = createServer(server);

ws.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);

  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server: ws,
      path: '/subscriptions'
    }
  );
});
