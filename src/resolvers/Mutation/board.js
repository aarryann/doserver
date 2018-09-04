const { PubSub } = require("apollo-server");
const _ = require("lodash");
const Board = require("../../models/board.js");

const pubsub = new PubSub();

const BoardMutation = {
  createBoard: async (parent, { name, owner }, ctx, info) => {
    if (!owner) {
      owner = ctx.userId;
    }
    const board = Board.createBoard(ctx.conn.knex, {
      name,
      owner,
      updatedUserId: ctx.userId
    });
    console.log(pubsub);
    pubsub.publish("boardCreated", { boardCreated: board }); // trigger a change to all subscriptions to a new board
    console.log(pubsub);
    return board;
  },
  createList: async (parent, { name, boardId }, ctx, info) => {
    return Board.createList(ctx.conn.knex, {
      name,
      boardId,
      updatedUserId: ctx.userId
    });
  },
  createCard: async (
    parent,
    { name, description, tags, listId },
    ctx,
    info
  ) => {
    return Board.createCard(ctx.conn.knex, {
      name,
      description,
      tags,
      listId,
      updatedUserId: ctx.userId
    });
  },
  addCardComment: async (parent, { text, userId, cardId }, ctx, info) => {
    return Board.addCardComment(ctx.conn.knex, {
      text,
      userId,
      cardId,
      updatedUserId: ctx.userId
    });
  },
  addBoardMember: async (parent, { email, boardId }, ctx, info) => {
    return Board.addBoardMember(ctx.conn.knex, email, {
      boardId,
      updatedUserId: ctx.userId
    });
  },
  addCardMember: async (parent, { userId, boardId, cardId }, ctx, info) => {
    return Board.addCardMember(ctx.conn.knex, userId, boardId, {
      cardId,
      updatedUserId: ctx.userId
    });
  },
  removeCardMember: async (parent, { userId, boardId, cardId }, ctx, info) => {
    return Board.removeCardMember(ctx.conn.knex, userId, boardId, cardId);
  }
};

module.exports = { BoardMutation };
