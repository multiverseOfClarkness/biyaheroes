const express = require('express')
const userLoginController = require("../controllers/commuterLogin.js")
const router = express.Router()

router.get('/', userLoginController.getLoginForm)

router.post('/',userLoginController.login)

router.get('/dashboard', userLoginController.getDashboard)


    

module.exports = router 