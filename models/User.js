const Sequelize = require('sequelize')
const User = require('./schemas/User')({ Sequelize })

const UserModel = ({ readingSequelize, executingSequelize }) => {
  const TABLE_ALIAS = 'User'
  const TABLE = 'users'

  const read = readingSequelize.define(TABLE_ALIAS, User, {
    tableName: TABLE
  })

  const execute = executingSequelize.define(TABLE_ALIAS, User, {
    tableName: TABLE
  })

  return {
    read,
    execute
  }
}

module.exports = UserModel
