import Board from '../../models/board.js';

const BoardMutation = {
  //eslint-disable-next-line
  createBoard: async (_parent, { name, owner }, ctx, _info) => {
    if (!owner) {
      owner = ctx.userId;
    }
    const board = Board.createBoard(ctx.conn.knex, {
      name,
      owner,
      updatedUserId: ctx.userId
    });
    ctx.pubsub.publish('boardCreated', { boardCreated: board }); // trigger a change to all subscriptions to a new board
    return board;
  },
  createList: async (_parent, { name, boardId }, ctx) => {
    return Board.createList(ctx.conn.knex, {
      name,
      boardId,
      updatedUserId: ctx.userId
    });
  },
  createCard: async (_parent, { name, description, tags, listId }, ctx) => {
    return Board.createCard(ctx.conn.knex, {
      name,
      description,
      tags,
      listId,
      updatedUserId: ctx.userId
    });
  },
  addCardComment: async (_parent, { text, userId, cardId }, ctx) => {
    return Board.addCardComment(ctx.conn.knex, {
      text,
      userId,
      cardId,
      updatedUserId: ctx.userId
    });
  },
  addBoardMember: async (_parent, { email, boardId }, ctx) => {
    return Board.addBoardMember(ctx.conn.knex, email, {
      boardId,
      updatedUserId: ctx.userId
    });
  },
  addCardMember: async (_parent, { userId, boardId, cardId }, ctx) => {
    return Board.addCardMember(ctx.conn.knex, userId, boardId, {
      cardId,
      updatedUserId: ctx.userId
    });
  },
  removeCardMember: async (_parent, { userId, boardId, cardId }, ctx) => {
    return Board.removeCardMember(ctx.conn.knex, userId, boardId, cardId);
  }
};

export { BoardMutation };
