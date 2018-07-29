const { getUserId } = require('../helpers/utils')
const Session = require('../models/Session.js');
//import { compareHash, encrypt } from '../../services/utils';

const Query = {
  Query: {
/*
  feed(parent, args, ctx, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },

  drafts(parent, args, ctx, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id
      }
    }

    return ctx.db.query.posts({ where }, info)
  },

  post(parent, { id }, ctx, info) {
    return ctx.db.query.post({ where: { id } }, info)
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  },

  boards: () => boards,
*/
    user: async (_, { id }, ctx) => {
      //console.log(ctx);
      return Session.getUserDetails(ctx.conn.knex, id);
    },

    getAuth: async (_, { email, password }, ctx) => {
      return Session.getAuth(ctx.conn.knex, email, password );
    }
  }
}

module.exports = { Query }
