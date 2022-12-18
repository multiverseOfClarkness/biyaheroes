const express = require('express')
const reportViolation = require("../controllers/reportViolation.js")
const router = express.Router()

router.get('/report/violation', reportViolation.getReportViolationPage)

module.exports = router