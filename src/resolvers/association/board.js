const Account = require('../../models/account.js');

const BoardAssociation = {
  Board: {
    user: async (board, _, ctx) => {
      return Account.getUserDetails(ctx.conn.knex, board.userId);
    }
  }

}

module.exports = { BoardAssociation }

