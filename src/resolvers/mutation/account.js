import Account from '../../models/account.js';

export default {
  login: async (_, { email, password, url }, ctx) => {
    return Account.login(ctx.conn.knex, email, password, url);
  }
};
