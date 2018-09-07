import Board from '../../models/board.js';

export default {
  ownedBoards: async (_, { userId }, ctx) => {
    return Board.getOwnedBoards(ctx.conn.knex, userId);
  }
};
