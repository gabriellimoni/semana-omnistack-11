const express = require('express')
const routes = express.Router()
const { celebrate, Segments, Joi } = require('celebrate')

const OngController = require('./controllers/ong.controller')
const IncidentController = require('./controllers/incident.controller')
const ProfileController = require('./controllers/profile.controller')
const SessionController = require('./controllers/session.controller')

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.list)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create)

routes.post('/incidents',  IncidentController.create)
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.list)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.get)

module.exports = routes