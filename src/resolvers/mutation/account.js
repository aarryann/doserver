const Account = require('../../models/account.js');

const AccountMutation = {
  login: async (_, { email, password }, ctx) => {
    return Account.login(ctx.conn.knex, email, password );
  },

  currentUser: async (_p, _a, ctx) => {
    return Account.currentUser(ctx.conn.knex, ctx.userId, ctx.token );
  }
}

module.exports = { AccountMutation }
