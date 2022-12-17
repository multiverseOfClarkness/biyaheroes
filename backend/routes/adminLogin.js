const express = require('express')
const adminLoginController = require("../controllers/adminLogin.js")
const router = express.Router()

router.get('/', adminLoginController.getLoginForm)

router.post('/',adminLoginController.login)

router.get('/dashboard', adminLoginController.adminDashboard)
    

module.exports = router 