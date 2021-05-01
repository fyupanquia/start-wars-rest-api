module.exports = ({ send, SW }) => {
  return async (req, res, next) => {
    try {
      const data = await SW('planets', req.params.id)
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
