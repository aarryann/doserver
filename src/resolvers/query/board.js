const Board = require('../../models/board.js');

const BoardQuery = {
  ownedBoards: async (_, { userId }, ctx) => {
    return Board.getOwnedBoards(ctx.conn.knex, userId);
  },
}

module.exports = { BoardQuery }
