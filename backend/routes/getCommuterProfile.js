const express = require('express')
const getRCommuterProfile = require("../controllers/commuterProfile")
const router = express.Router()

router.get ('/profile', getRCommuterProfile.getCommuterProfile)

module.exports = router