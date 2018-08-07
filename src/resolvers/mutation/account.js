const Account = require('../../models/account.js');

const AccountMutation = {
  login: async (_, { email, password }, ctx) => {
    return Account.login(ctx.conn.knex, email, password );
  },

}

module.exports = { AccountMutation }
