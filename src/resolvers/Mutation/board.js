const _ = require('lodash');

const board = {
  upvoteBoard: async (parent, { boardId }, ctx, info) => {
    const board = _.find(boards, { id: boardId });
    if (!board) {
      throw new Error(`Couldn't find board with id ${boardId}`);
    }
    return board;
  }    
}

module.exports = { board }

