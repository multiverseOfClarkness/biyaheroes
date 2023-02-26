const express = require('express')
const changePass = require("../controllers/changePass")
const router = express.Router()


router.get ('/change-pass',  changePass.getChangePass)
router.post ('/change-pass',  changePass.changePass)


module.exports = router