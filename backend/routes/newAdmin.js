const express = require('express')
const addNewAdminController = require("../controllers/newAdmin.js")
const router = express.Router()

router.get('/newAdmin', addNewAdminController.getAddNewAdmin)
router.post('/newAdmin', addNewAdminController.addNewAdmin)

//router.post('/register',registrationController.createNewUser)

module.exports = router 