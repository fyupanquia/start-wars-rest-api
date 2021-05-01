const { isInteger } = require('../../../utils/String')
/* eslint-disable camelcase */
const createMiddleware = (req, res, next) => {
  let { name, last_name, age } = req.body
  name = typeof name === 'string' ? name.trim() : ''
  last_name = typeof last_name === 'string' ? last_name.trim() : ''
  const err = new Error()
  err.code = 400

  if (age && !isInteger(age)) {
    err.message = 'age must be numeric'
    throw err
  }

  if (!name.length || !last_name.length) {
    err.message = 'name and last_name are required'
    throw err
  }

  req.body = { name, last_name, age }
  return next()
}

module.exports = createMiddleware
