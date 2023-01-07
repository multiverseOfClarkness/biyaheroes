const express = require('express')
const router = express.Router()
const adminDrivers = require('../controllers/adminDrivers')

router.get('/drivers', adminDrivers.getDriversPage)

module.exports = router