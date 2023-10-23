
// Configura o pacote express para usar http e route
const express = require('express')
const router = express.Router()

// importa o arquivo controller
const controller = require('../controllers/controller')


// publica as rotas
module.exports = router