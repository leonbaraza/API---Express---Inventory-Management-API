const express = require('express')
const router = express.Router()
const authentication = require('./../controllers/authentication')

router.post('/register', authentication.register)
router.post('/login', authentication.login)

module.exports = router