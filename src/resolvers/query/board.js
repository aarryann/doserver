import Board from "../../models/board.js";

const BoardQuery = {
  ownedBoards: async (_, { userId }, ctx) => {
    return Board.getOwnedBoards(ctx.conn.knex, userId);
  }
};

export { BoardQuery };
