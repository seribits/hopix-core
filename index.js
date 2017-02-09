const http = require('http')
const app = require('app')
const db = require('models')
const port = normalizePort(process.env.CORE_PORT || '3000')

// Web server initialize.
app.set('port', port)
const server = http.createServer(app)

// Sincronizacion de la base BD con express.
db.sequelize.authenticate().then(() => {
  return db.sequelize.sync()
}).then(() => {
  server.listen(port, () => {
    console.log(`Express working on ${port}`)
  })
  server.on('error', onError)
  server.on('listening', onListening)
}).catch((err) => {
  if (err) {
    console.log('error: conexión a la BD :(')
  }
})

// Normalizacion del puerto para evitar errores con la variable de entorno.
function normalizePort (port) {
  port = parseInt(port, 10)
  if (isNaN(port)) {
    return port
  } else if (port >= 0) {
    // port is a number
    return port
  } else {
    return false
  }
}

// Obtencion de los errores de la instancia del server.
function onError (err) {
  if (err.syscall !== 'listen') {
    throw err
  }

  let bind = (typeof port === 'string') ? `Pipe ${port}` : `Port ${port}`

  if (err.code === 'EACCES') {
    console.error(`${bind} requires elevated privileges`)
    process.exit(1)
  } else if (err.code === 'EADDRINUSE') {
    console.error(`${bind} is already in use`)
    process.exit(1)
  } else {
    throw err
  }
}

function onListening () {
  let addr = server.address()
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`
  console.log(`listening on ${bind}`)
}
