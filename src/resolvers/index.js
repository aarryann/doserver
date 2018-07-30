const { Query } = require('./query')
const { Mutation } = require('./mutation')
const { Subscription } = require('./Subscription')
const { Associations } = require('./Associations')

module.exports = [
  Query,
  Mutation,
//  Subscription,
  Associations,
]
