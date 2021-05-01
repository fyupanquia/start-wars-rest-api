const { _200, _400 } = require('./network/response')
const db = require('./db')
const config = require('./config')

module.exports.create = async (event) => {
  let bodyObj = {}

  try {
    bodyObj = JSON.parse(event.body)
  } catch (jsonErr) {
    console.log('There was an error parsing the body', jsonErr)
  }
  const services = await db(config.dbs.mysql)
  const data = await services.UserService.create(bodyObj)

  return _200(data)
}

module.exports.getById = async (event) => {
  if (event.pathParameters || !event.pathParameters.ID) {
    _400({ message: 'Missing the ID' })
  }
  const services = await db(config.dbs.mysql)
  const data = await services.UserService.getById(event.pathParameters.ID)
  return _200(data)
}
