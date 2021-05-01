const axios = require('axios')
const {
  config: {
    providers: { sw }
  }
} = require('../config')
const instance = axios.create(sw)

const SW = (action, id) => {
  return instance
    .get(`api/${action}/${id}/`)
    .then((rsp) => rsp.data)
    .catch((error) => {
      const response = error.response
      if (response) {
        const { statusText, status } = response
        const err = new Error(statusText)
        err.code = status
        throw err
      }
      throw new Error()
    })
}

module.exports = SW
