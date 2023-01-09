const express = require('express')
const router = express.Router()
const adminPendingComplaints = require('../controllers/getAllReports')

router.get('/complaints/pending', adminPendingComplaints.getViolationReportsHistory)

module.exports = router