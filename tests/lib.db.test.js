const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire').noCallThru()
let db, sandbox

class sequelize {
  constructor (conf) {
    return conf
  }
}

const config = {
  host: 'host',
  database: 'database',
  port: 'port',
  username: 'port',
  password: 'password',
  dialect: 'dialect'
}

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
  db = proxyquire('../lib/db', {
    sequelize
  })
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})
test.serial('lib/db', (t) => {
  const s = db(config)
  t.deepEqual(JSON.stringify(s), JSON.stringify(config), 'unexpected response')
  t.pass()
})
test.serial('lib/db <memory>', (t) => {
  const s = db(config)
  t.deepEqual(JSON.stringify(s), JSON.stringify(config), 'unexpected response')
  t.pass()
})
test.serial('lib/db <error>', (t) => {
  try {
    db()
  } catch (error) {
    t.pass()
  }
})
