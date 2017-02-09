const express = require('express')
const areasResources = require('api/areas')
const bossesResources = require('api/bosses')
const articlesResources = require('api/articles')
var api = express.Router()

// Set resources routes.
api.use(areasResources)
api.use(articlesResources)
api.use(bossesResources)

module.exports = api
