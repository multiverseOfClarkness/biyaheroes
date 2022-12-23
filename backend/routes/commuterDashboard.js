const express = require('express')
const getCommuterDashboard = require ('../controllers/commuterDashboard')
const router = express.Router()


router.get('/dashboard', getCommuterDashboard.getCommuterDashboard)

module.exports = router