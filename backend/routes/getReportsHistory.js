const express = require('express')
const getReportsHistory = require("../controllers/reportsHistory.js")
const router = express.Router()

router.get ('/history/violation', getReportsHistory.getViolationReportsHistory)
router.get ('/history/missing-item', getReportsHistory.getMissingItemsReportsHistory)

module.exports = router