const test = require('ava')
const sinon = require('sinon')
const UserModel = require('../models/User')
let sandbox

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})
test.serial('models/User', async (t) => {
  const readingSequelize = {
    define: () => true
  }
  const executingSequelize = {
    define: () => false
  }
  const u = UserModel({ readingSequelize, executingSequelize })
  t.true(u.read, 'read must be true')
  t.falsy(u.execute, 'execute must be false')
  t.pass()
})
