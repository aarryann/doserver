const Board = require('../../models/board.js');

const AccountAssociation = {
  User: {
    boards: async (user, _, ctx) => {
      return Board.getOwnedBoards(ctx.conn.knex, user.id);
    }
  },

}

module.exports = { AccountAssociation }

