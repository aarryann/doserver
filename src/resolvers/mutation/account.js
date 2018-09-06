import Account from '../../models/account.js';

const AccountMutation = {
  login: async (_, { email, password }, ctx) => {
    return Account.login(ctx.conn.knex, email, password);
  }
};

export { AccountMutation };
