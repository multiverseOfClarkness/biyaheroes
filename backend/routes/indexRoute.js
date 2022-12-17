const express = require('express')
const router = express.Router()

const loginController = require('../controllers/indexRoutes')

router.get('/', loginController.getLoginForm)

module.exports = router