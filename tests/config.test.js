const test = require('ava')
const config = require('../config')

const check = (t, { arr, src }) => {
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    /* eslint-disable valid-typeof */
    t.true(
      typeof src[item.key] === item.type,
      `${item.key} must be ${item.type}`
    )
  }
}

test.cb('config.js ', (t) => {
  t.true(typeof config.config === 'object', 'config.config must be an object')
  t.true(typeof config.error === 'object', 'config.error must be an object')
  const cconfig = config.config
  const error = config.error

  t.true(Object.keys(cconfig).length === 5, 'config.config must has 6 keys')
  t.true(Object.keys(error).length === 1, 'config.config must has 1 key')

  const configKeys = [
    { key: 'env', type: 'string' },
    { key: 'appPort', type: 'string' },
    { key: 'dbs', type: 'object' },
    { key: 'network', type: 'object' },
    { key: 'providers', type: 'object' }
  ]
  const errorKeys = [{ key: 'messages', type: 'object' }]

  check(t, { arr: configKeys, src: cconfig })
  check(t, { arr: errorKeys, src: error })

  t.true(typeof cconfig.dbs.mysql === 'object', 'mysql must be an object')

  const mysqlKeys = [
    { key: 'host', type: 'string' },
    { key: 'database', type: 'string' },
    { key: 'port', type: 'string' },
    { key: 'username', type: 'string' },
    { key: 'password', type: 'string' },
    { key: 'dialect', type: 'string' }
  ]
  check(t, { arr: mysqlKeys, src: cconfig.dbs.mysql })

  const networkKeys = [
    { key: 'limit', type: 'string' },
    { key: 'extended', type: 'boolean' }
  ]
  check(t, { arr: networkKeys, src: cconfig.network })

  t.true(
    typeof cconfig.providers.sw === 'object',
    'providers must be an object'
  )

  const swKeys = [
    { key: 'baseURL', type: 'string' },
    { key: 'timeout', type: 'number' },
    { key: 'headers', type: 'object' }
  ]
  check(t, { arr: swKeys, src: cconfig.providers.sw })

  const messagesKeys = [{ key: 'default', type: 'string' }]
  check(t, { arr: messagesKeys, src: error.messages })
  t.end()
})
