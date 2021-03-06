/* eslint-disable no-console */
//{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.oM7HJV9tjc0TSdiVdS6jje0QgejmKa-uoPSdm1JVNJ4"}
import express from "express";
import { createServer } from "http";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import typeDefs from "./typedefs";
import { getMe, knex, pubsub } from "./helpers/utils";
import cors from "cors";

/*
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
*/
const whitelist = ['http://localhost:3000', 'http://localhost:4812', 'http://localhost:4811']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error(`Not allowed by CORS - Origin - ${origin}`))
    }
  },
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
const app = express();
app.options('*', cors()) // include before other routes
app.use("*", cors(corsOptions));
const PORT = process.env.PORT || 4811;

//console.log(`process.env.APP_SECRET:${process.env.APP_SECRET}`);
// Start the server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split("\n") : [],
    path: error.path
  }),
  context: async ({ req }) => {
    let rbq = "";
    if (req && req.body && req.body.query) {
      rbq = req.body.query;
    }
    let userId = 0;
    let token;
    if (
      rbq.length > 1 &&
      rbq.indexOf("login") === -1 &&
      rbq.indexOf("tenantByUrl") === -1 &&
      rbq.indexOf("signup") === -1 &&
      rbq.indexOf("IntrospectionQuery") === -1
    ) {
      ({ userId, token } = await getMe(req));
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
server.applyMiddleware({ app, path: "/graphql" });
const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
/*
server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
*/
