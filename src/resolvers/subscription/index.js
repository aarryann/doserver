import { BoardSubscription } from "./board";

/*
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();
const Subscription = {
  Subscription: {
    boardCreated: {
      subscribe: () => pubsub.asyncIterator("boardCreated")
    }
  }
};
*/
const Subscription = {
  Subscription: {
    ...BoardSubscription
  }
};

export { Subscription };
