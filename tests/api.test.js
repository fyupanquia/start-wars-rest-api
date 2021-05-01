const test = require('ava')
const request = require('supertest')
const proxyquire = require('proxyquire')
const species = require('../utils/mockups/species.json')
const planets = require('../utils/mockups/planets.json')
const user = require('../utils/mockups/user.json')

const Diccionary = require('../utils/Diccionary')
const { parseKeys } = Diccionary('es')

let server
const swData = {
  species,
  planets
}

test.beforeEach(() => {
  const SW = (action, id) => {
    return Promise.resolve(swData[action])
  }

  const db = (mysql) => {
    const UserService = {
      create: (body) =>
        Promise.resolve({
          dataValues: {
            id: user.id
          }
        }),
      getById: (id) => Promise.resolve({ dataValues: user })
    }
    return {
      UserService
    }
  }

  const injectServices = proxyquire('../api/u/middleware/injectServices', {
    '../../../db': db
  })

  const middleware = proxyquire('../api/u/middleware', {
    './injectServices': injectServices
  })

  const sw = proxyquire('../api/sw', {
    '../../providers/SW': SW
  })
  const u = proxyquire('../api/u', {
    './middleware': middleware
  })

  const api = proxyquire('../api', {
    './sw': sw,
    './u': u
  })

  server = proxyquire('../server', {
    '../api': api
  })
})

test.afterEach(() => {})

test.cb('/sw/species/:id <default>', (t) => {
  request(server)
    .get('/sw/species/1')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      t.deepEqual(
        JSON.stringify(parseKeys(swData.species)),
        JSON.stringify(res.body),
        'response body is wrong'
      )
      t.end()
    })
})

test.cb('/sw/planets/:id <default>', (t) => {
  request(server)
    .get('/sw/planets/1')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      t.deepEqual(
        JSON.stringify(parseKeys(swData.planets)),
        JSON.stringify(res.body),
        'response body is wrong'
      )
      t.end()
    })
})

test.cb('/u <default>', (t) => {
  request(server)
    .post('/u')
    .send(user)
    .expect(201)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      t.deepEqual(
        JSON.stringify({
          id: user.id
        }),
        JSON.stringify(res.body),
        'response body is wrong'
      )
      t.end()
    })
})

test.cb('/u/:id <default>', (t) => {
  request(server)
    .get('/u/1')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      t.falsy(err, 'should not return an error')
      t.deepEqual(
        JSON.stringify(parseKeys(user)),
        JSON.stringify(res.body),
        'response body is wrong'
      )
      t.end()
    })
})
