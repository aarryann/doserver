const Board = require('../../models/board.js');

const AccountAssociation = {
  User: {
    ownedBoards: async (user, _, ctx) => {
      return Board.getOwnedBoards(ctx.conn.knex, user.id);
    },
    userBoards: async (user, _, ctx) => {
      return Board.getUserBoards(ctx.conn.knex, user.id);
    },
    otherBoards: async (user, _, ctx) => {
      return Board.getOtherBoards(ctx.conn.knex, user.id);
    },
  },

}

module.exports = { AccountAssociation }

