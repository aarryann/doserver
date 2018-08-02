const _ = require('lodash');
const Board = require('../../models/board.js');

const BoardMutation = {
  createBoard: async (parent, { name, owner }, ctx, info) => {
    return Board.createBoard(ctx.conn.knex, {name, owner, 
      updatedUserId: ctx.userId});
  },
  createList: async (parent, { name, boardId }, ctx, info) => {
    return Board.createList(ctx.conn.knex, {name, boardId, updatedUserId: ctx.userId});
  },
  createCard: async (parent, { name, description, tags, listId }, 
      ctx, info) => {
    return Board.createCard(ctx.conn.knex, {name, description, 
      tags, listId, updatedUserId: ctx.userId});
  },
  addCardComment: async (parent, { text, userId, cardId }, ctx, info) => {
    return Board.addCardComment(ctx.conn.knex, {text, userId, cardId, updatedUserId: ctx.userId});
  },
  addBoardMember: async (parent, { email, boardId }, ctx, info) => {
    return Board.addBoardMember(ctx.conn.knex, email, {boardId, updatedUserId: ctx.userId});
  },
  addCardMember: async (parent, { userId, boardId, cardId }, ctx, info) => {
    return Board.addCardMember(ctx.conn.knex, userId, boardId, {cardId, updatedUserId: ctx.userId});
  },
  removeCardMember: async (parent, { userId, boardId, cardId }, ctx, info) => {
    return Board.removeCardMember(ctx.conn.knex, userId, boardId, {cardId, updatedUserId: ctx.userId});
  },
}

module.exports = { BoardMutation }
