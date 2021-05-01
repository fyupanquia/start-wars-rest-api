const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')
let db, sandbox

const config = {
  host: 'host',
  database: 'database',
  port: 'port',
  username: 'port',
  password: 'password',
  dialect: 'dialect'
}

const UserMethods = {
  fizz: () => 'buzz'
}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
  const dbLib = () => ({
    authenticate: () => Promise.resolve(true)
  })
  const UserModel = () => UserMethods
  const UserService = (args) => args.UserModel
  db = proxyquire('../db', {
    '../lib/db': dbLib,
    '../models/User': UserModel,
    '../lib/User': UserService
  })
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})
test.serial('db', async (t) => {
  const s = await db(config)
  t.deepEqual(
    JSON.stringify(s),
    JSON.stringify({ UserService: UserMethods }),
    'unexpected response'
  )
  t.pass()
})
