const _ = require('lodash');
const Board = require('../../models/board.js');

const BoardMutation = {
  createBoard: async (parent, { boardName }, ctx, info) => {
    return Board.createBoard(ctx.conn.knex, boardName, ctx.userId);
  },
  createList: async (parent, { listName, boardId }, ctx, info) => {
    return Board.createList(ctx.conn.knex, listName, boardId);
  },
  createCard: async (parent, { cardName, description, tags, listId }, ctx, info) => {
    return Board.createList(ctx.conn.knex, cardName, description, 
      tags, listId);
  },
  addCardComment: async (parent, { text, userId, cardId }, ctx, info) => {
    return Board.createList(ctx.conn.knex, text, userId, cardId);
  },
  addBoardMember: async (parent, { email, boardId }, ctx, info) => {
    return Board.createList(ctx.conn.knex, email, boardId);
  },
  addCardMember: async (parent, { userId, boardId, cardId }, ctx, info) => {
    return Board.createList(ctx.conn.knex, userId, boardId, cardId);
  },
  removeCardMember: async (parent, { userId, boardId, cardId }, ctx, info) => {
    return Board.createList(ctx.conn.knex, userId, boardId, cardId);
  },
  removeCardMember: async (parent, { listName, boardId }, ctx, info) => {
    return Board.createList(ctx.conn.knex, listName, boardId);
  },
  createList: async (parent, { listName, boardId }, ctx, info) => {
    return Board.createList(ctx.conn.knex, listName, boardId);
  },
}

module.exports = { BoardMutation }

