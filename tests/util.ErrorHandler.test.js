const test = require('ava')
const proxyquire = require('proxyquire')
let ErrorHandler

test.beforeEach(() => {
  const config = {}

  ErrorHandler = proxyquire('../utils/ErrorHandler', {
    '../config': config
  })
})

test.cb('badRequest ', (t) => {
  const err = new SyntaxError()
  err.body = 'body'
  err.status = 400
  const res = {
    sendStatus: (status) => {
      return false
    }
  }
  const next = () => true
  t.falsy(
    ErrorHandler.badRequest(err, null, res, next),
    'badRequest must be falsy'
  )
  t.true(
    ErrorHandler.badRequest(null, null, res, next),
    'badRequest must be true'
  )
  t.end()
})
test.cb('notFound ', (t) => {
  const res = {
    sendStatus: (status) => status
  }
  t.true(
    ErrorHandler.notFound(null, res, null) === 404,
    'notFound status must be 404'
  )
  t.end()
})
test.cb('fatalError', (t) => {
  process.exit = (code) => code
  t.true(ErrorHandler.fatalError({}) === 1, 'fatalError must exit the app')
  t.end()
})
