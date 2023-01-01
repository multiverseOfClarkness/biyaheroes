const express = require('express')
const reportMissingItem = require("../controllers/reportMissingItem")
const router = express.Router()

router.get('/report/missingItem', reportMissingItem.getReportMissingPage)
router.post('/report/missingItem', reportMissingItem.reportMissingItem)

module.exports = router