const express = require('express')
const routes = express.Router()

const OngController = require('./controllers/ong.controller')
const IncidentController = require('./controllers/incident.controller')
const ProfileController = require('./controllers/profile.controller')
const SessionController = require('./controllers/session.controller')

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.list)
routes.post('/ongs', OngController.create)

routes.post('/incidents', IncidentController.create)
routes.get('/incidents', IncidentController.list)
routes.delete('/incidents/:id', IncidentController.delete)

routes.get('/profile', ProfileController.get)

module.exports = routes