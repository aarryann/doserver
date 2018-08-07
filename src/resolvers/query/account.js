const Account = require('../../models/account.js');

const AccountQuery = {
  user: async (_, { id }, ctx) => {
    return Account.getUserDetails(ctx.conn.knex, id);
  },

  currentUser: async (_p, _a, ctx) => {
    return Account.currentUser(ctx.conn.knex, ctx.userId, ctx.token );
  }
}

module.exports = { AccountQuery }
