const _ = require('lodash');
const Board = require('../../models/board.js');

const BoardMutation = {
  upvoteBoard: async (parent, { boardId }, ctx, info) => {
    const board = _.find(boards, { id: boardId });
    if (!board) {
      throw new Error(`Couldn't find board with id ${boardId}`);
    }
    return board;
  },

  createBoard: async (parent, { boardName }, ctx, info) => {
    return Board.createBoard(ctx.conn.knex, boardName, ctx.userId);
  },
}

module.exports = { BoardMutation }

