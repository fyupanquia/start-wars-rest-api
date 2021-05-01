const test = require('ava')
const sinon = require('sinon')
const User = require('../lib/User')
const { isInteger } = require('../utils/String')
let user, UserModel, sandbox

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  const create = (body) => typeof body === 'object'
  const findOne = (params) =>
    typeof params === 'object' &&
    typeof params.where === 'object' &&
    isInteger(params.where.id)
  UserModel = {
    execute: {
      create
    },
    read: {
      findOne
    }
  }
  user = User({ UserModel })
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})
test.serial('lib/User', (t) => {
  t.true(user.create({}), 'User.create must return a boolean')
  t.true(user.getById(1), 'User.getById must return a boolean')
  t.pass()
})
