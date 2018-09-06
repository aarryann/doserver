import Account from '../../models/account.js';
import Board from '../../models/board.js';

const AccountAssociation = {
  User: {
    ownedBoards: async (user, _, ctx) => {
      return Board.getOwnedBoards(ctx.conn.knex, user.id);
    },
    memberBoards: async (user, _, ctx) => {
      return Board.getMemberBoards(ctx.conn.knex, user.id);
    },
    otherBoards: async (user, _, ctx) => {
      return Board.getOtherBoards(ctx.conn.knex, user.id);
    }
  },

  UserAuth: {
    user: async (userAuth, _, ctx) => {
      return Account.getUserDetails(ctx.conn.knex, userAuth.userId);
    }
  }
};

export { AccountAssociation };
