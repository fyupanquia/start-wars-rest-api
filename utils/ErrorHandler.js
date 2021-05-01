const {
  config,
  error: {
    messages: { default: DefaultMessage }
  }
} = require('../config')
const { send } = require('../network/response')

const general = (err, req, res, next) => {
  const { message, stack, code } = err
  const DEFAULT_HTTP_ERROR = code || 500
  const rsp = {
    success: false,
    message:
      config.env === 'development' ? message || DefaultMessage : DefaultMessage
  }
  if (config.env === 'development') {
    rsp.stack = stack
  }

  console.log('ErrorHandler: ', err)

  return send({
    req,
    res,
    status: DEFAULT_HTTP_ERROR,
    body: rsp
  })
}

const badRequest = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.sendStatus(400) // Bad request
  }
  return next()
}

const notFound = (req, res, next) => {
  return res.sendStatus(404)
}

const fatalError = (err) => {
  console.error(`${err.message}`)
  console.error(err.stack)
  return process.exit(1)
}

module.exports = {
  general,
  badRequest,
  notFound,
  fatalError
}
