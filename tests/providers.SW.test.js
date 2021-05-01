const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire').noCallThru()
let SW, SWErr
const axiosStub = {}
const axiosRequestStub = {}
let sandbox

test.beforeEach(async () => {
  sandbox = sinon.createSandbox()

  axiosStub.create = sandbox.stub()
  axiosStub.create.returns(axiosRequestStub)

  axiosRequestStub.get = sandbox.stub()
  axiosRequestStub.get.returns(
    new Promise((resolve, reject) => resolve({ data: true }))
  )

  SW = proxyquire('../providers/SW', {
    axios: axiosStub
  })

  SWErr = proxyquire('../providers/SW', {
    axios: {
      create: () => ({
        get: () =>
          new Promise((resolve, reject) =>
            /* eslint-disable prefer-promise-reject-errors */
            reject({
              response: {
                statusText: 'Custom error',
                status: 400
              }
            })
          )
      })
    }
  })
})

test.afterEach(() => {
  sandbox && sandbox.restore()
})
test.serial('SW:get <Error>', async (t) => {
  return SWErr('action', 1)
    .then((data) => {
      t.fail()
    })
    .catch((response) => {
      t.true(response.message === 'Custom error', 'it must be a custom error')
      t.true(response.code === 400, 'it must be a custom error')
      t.pass()
    })
})

test('SW:get', (t) => {
  return SW('action', 1).then((response) => {
    t.true(response, 'sw response must be true')
    t.pass()
  })
})
