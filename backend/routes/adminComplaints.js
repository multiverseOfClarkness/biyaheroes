const express = require('express')
const router = express.Router()
const adminComplaints = require('../controllers/adminComplaints')

router.get('/complaints', adminComplaints.getComplaintsPage)
router.get('/complaints/pending', adminComplaints.getViolationReportsHistory)
router.get('/complaints/pending/:id', adminComplaints.getIndividualPendingComplaintReport)

module.exports = router