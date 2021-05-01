module.exports = ({ send }) => async (req, res, next) => {
  try {
    const { UserService } = req._services
    const data = await UserService.create(req.body)
    return send({
      req,
      res,
      status: 201,
      body: {
        id: data.dataValues.id
      }
    })
  } catch (error) {
    return next(error, req, res, next)
  }
}
