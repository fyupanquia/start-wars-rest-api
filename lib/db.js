const Sequelize = require('sequelize')
const sequelizes = {}

module.exports = function setupDatabase (config) {
  if (!config) throw new Error('Failed db connexion')

  const key = `${config.host}-${config.database}-${config.port}-${config.username}-${config.password}-${config.dialect}`
  console.log('key: ', key)
  let sequelize = sequelizes[key]
  if (!sequelize) {
    /*
    config.pool = {
      max: 5,
      min: 0,
      idle: 200000,
      acquire: 1000000,
    };
    */
    sequelize = new Sequelize(config)
    sequelizes[key] = sequelize
  }
  return sequelize
}
