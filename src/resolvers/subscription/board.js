const { PubSub } = require("apollo-server");
const _ = require("lodash");

// const { withFilter } = require('apollo-server');
// const Board = require('../../models/board.js');
const pubsub = new PubSub();

const BoardSubscription = {
  boardCreated: {
    subscribe: () => pubsub.asyncIterator("boardCreated")
  }
};

module.exports = { BoardSubscription };
