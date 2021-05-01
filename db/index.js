const setupDatabase = require('../lib/db')

const setupsetupUserModel = require('../models/User')
const setupUser = require('../lib/User')

module.exports = async function (config) {
  // INITIALIZATION
  const readingSequelize = setupDatabase(config)
  const executingSequelize = setupDatabase(config)

  // PING CONNECTION
  await Promise.all([
    readingSequelize.authenticate(),
    executingSequelize.authenticate()
  ])

  // MODEL-SERVICES
  const UserModel = setupsetupUserModel({
    readingSequelize,
    executingSequelize
  })
  const UserService = setupUser({ UserModel })

  return {
    UserService
  }
}
