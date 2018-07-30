const Account = require('../../models/account.js');

const AccountQuery = {
  user: async (_, { id }, ctx) => {
    return Account.getUserDetails(ctx.conn.knex, id);
  },

  getAuth: async (_, { email, password }, ctx) => {
    return Account.getAuth(ctx.conn.knex, email, password );
  }
}

module.exports = { AccountQuery }
