const express = require('express')
const router = express.Router()
const adminComplaints = require('../controllers/adminComplaints')

router.get('/complaints', adminComplaints.getComplaintsPage)
router.get('/complaints/pending', adminComplaints.getPendingViolationReportsHistory)
router.get('/complaints/solved', adminComplaints.getSolvedViolationReportsHistory)
router.get('/complaints/pending/:id', adminComplaints.getIndividualPendingComplaintReport)
router.get('/complaints/solved/:id', adminComplaints.getIndividualSolvedComplaintReport)
router.patch('/complaints/pending/:id', adminComplaints.updateIndividualPendingComplaintReport)

module.exports = router