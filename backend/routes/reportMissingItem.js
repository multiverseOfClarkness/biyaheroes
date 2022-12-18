const express = require('express')
const reportMissingItem = require("../controllers/reportMissingItem")
const router = express.Router()

router.get('/report/missingItem', reportMissingItem.getReportMissingPage)

module.exports = router