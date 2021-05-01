module.exports = ({ send, SW }) => {
  return async (req, res, next) => {
    try {
      const data = await SW('species', req.params.id)

      return send({
        req,
        res,
        body: {
          ...data
        }
      })
    } catch (error) {
      return next(error)
    }
  }
}
