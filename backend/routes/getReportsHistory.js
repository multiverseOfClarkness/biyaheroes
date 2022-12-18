const express = require('express')
const getReportsHistory = require("../controllers/reportsHistory.js")
const router = express.Router()

router.get ('/reportsHistory', getReportsHistory.getReportsHistory)

module.exports = router