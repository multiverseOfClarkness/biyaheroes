const express = require('express')
const getCommuterProfile = require("../controllers/commuterProfile")
const router = express.Router()


router.get ('/profile',  getCommuterProfile.getCommuterProfile)
router.post('/profile', getCommuterProfile.updateCommuterProfile)

module.exports = router