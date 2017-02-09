module.exports = (sequelize, DataTypes) => {
  var Area = sequelize.define('Area', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'El atributo no puede ser nulo.'}
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  })
  return Area
}
