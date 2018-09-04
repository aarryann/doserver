const { BoardSubscription } = require("./board");

const Subscription = {
  Subscription: {
    boardCreated: {
      subscribe: () => pubsub.asyncIterator("boardCreated")
    }
  }
};

module.exports = { Subscription };
