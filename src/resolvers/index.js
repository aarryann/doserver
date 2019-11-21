const { Query } = require('./query')
const { Mutation } = require('./mutation')
const { Subscription } = require('./subscription')
const { Association } = require('./association')

module.exports = [
  Query,
  Mutation,
//  Subscription,
  Association,
]
