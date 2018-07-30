const _ = require('lodash');
const Board = require('../../models/board.js');

const BoardMutation = {
  createBoard: async (parent, { boardName }, ctx, info) => {
    return Board.createBoard(ctx.conn.knex, boardName, ctx.userId);
  },
}

module.exports = { BoardMutation }

