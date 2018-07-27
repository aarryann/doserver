const _ = require('lodash');

const Associations = {
  User: {
    boards: (user) => _.filter(boards, { userId: user.id })
  },
  Board: {
    user: (board) => _.find(users, { id: board.userId })
  }

}

module.exports = { Associations }

