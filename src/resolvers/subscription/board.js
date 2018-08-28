const _ = require('lodash');
// const { withFilter } = require('apollo-server');
// const Board = require('../../models/board.js');
const BOARD_ADDED = 'BOARD_ADDED';

const BoardSubscription = {
  boardCreated: {
    subscribe: (parent, args, ctx, info) =>
      ctx.pubsub.asyncIterator([BOARD_ADDED])
  }
};

module.exports = { BoardSubscription };
