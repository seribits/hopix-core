const express = require('express')

var bosses = express.Router()

bosses.get('/bosses', (req, res) => {
  res.send('bosses GET petition')
})

module.exports = bosses
