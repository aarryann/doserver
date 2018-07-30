const Account = require('../../models/account.js');

const AccountQuery = {
  user: async (_, { id }, ctx) => {
    return Account.getUserDetails(ctx.conn.knex, id);
  },
}

module.exports = { AccountQuery }
