const { AccountMutation } = require('./account')
const { BoardMutation } = require('./board')

const Mutation = {
  Mutation: {
    ...AccountMutation,
    ...BoardMutation,
  }
}

module.exports = { Mutation }