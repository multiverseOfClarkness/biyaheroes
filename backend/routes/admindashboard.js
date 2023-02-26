const express = require('express')
const admindashboard = require('../controllers/admindashboard')
const router = express.Router()

router.get('/dashboard', admindashboard.getAdminDashboard)

module.exports = router