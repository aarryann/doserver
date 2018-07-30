const { Query } = require('./query')
const { Mutation } = require('./mutation')
const { Subscription } = require('./Subscription')
const { auth } = require('./Mutation/auth')
const { post } = require('./Mutation/post')
const { AuthPayload } = require('./AuthPayload')
const { Associations } = require('./Associations')

module.exports = [
  Query,
  Mutation,
//    ...auth,
//    ...post,
//  },
//  Subscription,
//  AuthPayload,
  Associations,
]
