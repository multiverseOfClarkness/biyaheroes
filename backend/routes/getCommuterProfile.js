const express = require('express')
const getCommuterProfile = require("../controllers/commuterProfile")
const router = express.Router()


router.get ('/profile',  getCommuterProfile.getCommuterProfile)

module.exports = router