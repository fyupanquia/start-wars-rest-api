const path = require('path')
require('dotenv').config({
  path: path.join(
    path.dirname(require.main.filename),
    '..',
    process.env.ENV_FILE
  )
})

const config = {
  env: process.env.ENV,
  appPort: process.env.APP_PORT,
  dbs: {
    mysql: {
      host: process.env.MYSQL_SERVER,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      dialect: 'mysql'
    }
  },
  network: {
    limit: '50mb',
    extended: true
  },
  providers: {
    sw: {
      baseURL: process.env.SW_API_URL,
      timeout: 1000,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }
  }
}

const error = {
  messages: {
    default: 'Something wrong. Try again please.'
  }
}

module.exports = {
  config,
  error
}
