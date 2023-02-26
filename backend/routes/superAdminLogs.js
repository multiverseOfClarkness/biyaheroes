const express = require('express')
const admindashboard = require('../controllers/super-adminLogs')
const router = express.Router()


router.get('/logs', admindashboard.getLogsPage)

module.exports = router