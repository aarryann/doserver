const { AccountQuery } = require('./account')
const { BoardQuery } = require('./board')

const Query = {
  Query: {
    ...AccountQuery,
    ...BoardQuery,
  }
}

module.exports = { Query }