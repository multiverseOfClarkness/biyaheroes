const express = require('express')
const router = express.Router()

const loginController = require('../controllers/index')

router.get('/', loginController.getLoginForm)
router.post('/', loginController.login)

module.exports = router