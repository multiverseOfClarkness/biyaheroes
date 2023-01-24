const express = require('express')
const admindashboard = require('../controllers/superadmindashboard')
const router = express.Router()


router.get('/dashboard', admindashboard.getSuperAdminDashboard)

module.exports = router