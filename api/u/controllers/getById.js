module.exports = ({ send }) => async (req, res, next) => {
  try {
    const { UserService } = req._services
    const data = await UserService.getById(req.params.id)

    return send({
      req,
      res,
      status: data ? 200 : 404,
      body: {
        ...(data ? data.dataValues : { success: false, message: 'Not Found' })
      }
    })
  } catch (error) {
    return next(error, req, res, next)
  }
}
