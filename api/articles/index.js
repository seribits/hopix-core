const express = require('express')

var articles = express.Router()

articles.get('/articles', (req, res) => {
  res.send('articles GET petition')
})

module.exports = articles
