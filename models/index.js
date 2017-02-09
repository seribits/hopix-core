const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(module.filename)
const db = {}

const sequelizeOpts = {
  host: process.env.CORE_DB_HOST_SECRET,
  dialect: process.env.CORE_DB_TECNOLOGY,
  pool: {
    max: 30,
    min: 0,
    idle: 10000
  }
}

// Conexión a base de datos
const sequelize = new Sequelize(
  process.env.CORE_DB_NAME_SECRET,
  process.env.CORE_DB_USERNAME_SECRET,
  process.env.CORE_DB_PASSWORD_SECRET,
  sequelizeOpts
)

fs.readdirSync(__dirname).filter((file) => {
  return (file.indexOf('.') !== 0) && (file !== basename) &&
    (file.slice(-3) === '.js')
})
  .forEach((file) => {
    let model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize

module.exports = db
