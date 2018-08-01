const Account = require('../../models/account.js');
const Board = require('../../models/board.js');

const BoardAssociation = {
  Board: {
    owner: async (board, _, ctx) => {
      console.log(board);
      return Account.getUserDetails(ctx.conn.knex, board.userId);
    },
    members: async (board, _, ctx) => {
      return Board.getMembersForBoard(ctx.conn.knex, board.id);
    },
    lists: async (board, _, ctx) => {
      return Board.getListsForBoard(ctx.conn.knex, board.id);
    },
  },

  List: {
    board: async (list, _, ctx) => {
      return Board.getBoardDetails(ctx.conn.knex, list.boardId);
    },
    cards: async (list, _, ctx) => {
      return Board.getCardsForList(ctx.conn.knex, list.id);
    },
  },

  Card: {
    list: async (card, _, ctx) => {
      return Board.getListDetails(ctx.conn.knex, card.listId);
    },
    members: async (card, _, ctx) => {
      return Board.getCardMembers(ctx.conn.knex, card.id);
    },
    comments: async (card, _, ctx) => {
      return Board.getCommentsForCard(ctx.conn.knex, card.id);
    },
  },

  Comment: {
    user: async (comment, _, ctx) => {
      return Account.getUserDetails(ctx.conn.knex, comment.userId);
    },
    card: async (comment, _, ctx) => {
      return Board.getCardDetails(ctx.conn.knex, comment.cardId);
    },
  },

}

module.exports = { BoardAssociation }

