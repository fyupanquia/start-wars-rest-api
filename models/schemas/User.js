module.exports = ({ Sequelize }) => ({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  last_name: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  age: {
    type: Sequelize.CHAR(3),
    allowNull: true
  }
})
