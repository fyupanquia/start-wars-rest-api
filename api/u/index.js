const express = require('express')
const asyncify = require('express-asyncify')
const api = asyncify(express.Router())
const { send } = require('../../network/response')

const { create, getById } = require('./controllers')
const { createMiddleware, injectServices } = require('./middleware')

api.use('*', injectServices)
const params = { send }
// LIST
api.post('/', createMiddleware, create(params))
api.get('/:id(\\d+$)', getById(params))

module.exports = api
