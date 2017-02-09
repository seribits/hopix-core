const express = require('express')
const db = require('models')
const STATUS_CODE_ERROR_INTERNAL = { error: { db: 'Sin conexión.' } }
const STATUS_CODE_ERROR_GONE = {
  error: {resource: 'El recurso solicitado no existe.'}
}

var areas = express.Router()

areas.get('/areas', (req, res) => {
  let data = []
  db.Area.findAll().then((areas) => {
    areas.forEach((area) => {
      data.push(area.dataValues)
    })
    res.status(200).json(data)
  }).catch((err) => {
    if (err) {
      res.status(500).json(STATUS_CODE_ERROR_INTERNAL)
    }
  })
})

areas.get('/areas/:areaId', (req, res) => {
  db.Area.findOne({ where: { id: req.params.areaId } }).then((area) => {
    (area !== null)
    ? res.status(200).json(area)
    : res.status(410).json(STATUS_CODE_ERROR_GONE)
  }).catch((err) => {
    if (err) {
      res.status(500).json(STATUS_CODE_ERROR_INTERNAL)
    }
  })
})

areas.post('/areas', (req, res) => {
  db.sequelize.authenticate().then(() => {
    db.Area.findOrCreate({
      where: { name: req.body.name }
    }).spread((area, created) => {
      res.status(201).json(area.get({ plain: true }))
    }).catch((err) => {
      if (err) {
        let error = {}
        for (let i in err.errors) {
          if (err.errors[i].path === 'name') {
            error = { name: err.errors[i].message }
          }
        }
        res.status(422).json({error: error})
      }
    })
  }).catch((err) => {
    if (err) {
      res.status(500).json(STATUS_CODE_ERROR_INTERNAL)
    }
  })
})

areas.put('/areas/:areaId', (req, res) => {
  db.sequelize.authenticate().then(() => {
    db.Area.update(
      { name: req.body.name },
      { where: { id: req.params.areaId }, returning: true }
    ).then((result) => {
      (result[0] === 0)
      ? res.status(410).json(STATUS_CODE_ERROR_GONE)
      : res.status(200).json(result[1][0])
    }).catch((err) => {
      if (err) {
        var error = {}
        for (var i in err.errors) {
          if (err.errors[i].path === 'name') {
            error = { name: err.errors[i].message }
          }
        }
        res.status(422).json({error: error})
      }
    })
  }).catch((err) => {
    if (err) {
      res.status(500).json(STATUS_CODE_ERROR_INTERNAL)
    }
  })
})

areas.delete('/areas/:areaId', (req, res) => {
  db.sequelize.authenticate().then(() => {
    db.Area.destroy({ where: { id: req.params.areaId } }).then((rows) => {
      (rows === 0)
      ? res.status(410).json(STATUS_CODE_ERROR_GONE)
      : res.status(204).end()
    })
  }).catch((err) => {
    if (err) {
      res.status(500).json(STATUS_CODE_ERROR_INTERNAL)
    }
  })
})

module.exports = areas
