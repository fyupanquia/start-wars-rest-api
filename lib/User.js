const UserService = ({ UserModel }) => {
  const create = (body) => UserModel.execute.create(body)

  const getById = (id) => UserModel.read.findOne({ where: { id } })

  return {
    create,
    getById
  }
}

module.exports = UserService
