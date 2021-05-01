const {
  config: { dbs }
} = require('../../../config')
const db = require('../../../db')
let services
module.exports = async (req, res, next) => {
  if (!services) {
    try {
      services = await db(dbs.mysql)
    } catch (e) {
      return next(e)
    }
  }
  req._services = services
  return next()
}
