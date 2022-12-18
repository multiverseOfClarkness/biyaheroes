const express = require('express')
const registrationController = require("../controllers/commuterRegister.js")
const router = express.Router()

router.get('/commuter/register', registrationController.getRegisterForm)

router.post('/commuter/register',registrationController.createNewUser)
    

module.exports = router 