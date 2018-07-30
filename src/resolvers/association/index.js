const { AccountAssociation } = require('./account')
const { BoardAssociation } = require('./board')

const Association = {
  ...AccountAssociation,
  ...BoardAssociation,
}

module.exports = { Association }