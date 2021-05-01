const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const app = express()
const { config } = require('../config')
const { sw, u } = require('../api')
const ErrorHandler = require('../utils/ErrorHandler')

app.use(express.json(config.network))
app.use(express.urlencoded(config.network))
app.use(helmet())
app.use(cors())
app.use(ErrorHandler.badRequest)
app.use(haltOnTimedout)
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By')
  return next()
})
app.use('/sw', sw)
app.use('/u', u)
app.use('*', ErrorHandler.notFound)
app.use(ErrorHandler.general)

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

process.on('uncaughtException', ErrorHandler.fatalError)
process.on('unhandledRejection', ErrorHandler.fatalError)

if (!module.parent) {
  app.listen(config.appPort, function () {
    console.log(`Listening on port ${config.appPort}!`)
  })
}

module.exports = app
