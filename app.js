const express = require('express')
const bodyParser = require('body-parser')
const api = require('api')

const app = express()

// Parsers.
app.use(bodyParser.json())

// Set api version routes.
app.use('/api/v1', api)

module.exports = app
