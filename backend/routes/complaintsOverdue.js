const express = require('express')
const router = express.Router()
const adminOverdueComplaints = require('../controllers/complaintsOverdue')

router.get('/complaints/overdue', adminOverdueComplaints.getOverdueComplaintsPage)

module.exports = router