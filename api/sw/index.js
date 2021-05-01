const express = require('express')
const asyncify = require('express-asyncify')
const api = asyncify(express.Router())
const { getPlanetById, getSpecieById } = require('./controllers')
const SW = require('../../providers/SW')
const { send } = require('../../network/response')
const params = { send, SW }

// LIST
api.get('/planets/:id(\\d+$)', getPlanetById(params))
api.get('/species/:id(\\d+$)', getSpecieById(params))

module.exports = api
