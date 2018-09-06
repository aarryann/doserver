//import { PubSub } from "apollo-server";
import { PubSub } from 'graphql-subscriptions';
//import _ from "lodash";

// import { withFilter } from 'apollo-server';
// import Board from '../../models/board.js';
const pubsub = new PubSub();

const BoardSubscription = {
  boardCreated: {
    subscribe: () => pubsub.asyncIterator('boardCreated')
  }
};

//module.exports = { BoardSubscription };
export { BoardSubscription };
