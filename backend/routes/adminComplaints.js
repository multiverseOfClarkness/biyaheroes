const express = require('express')
const router = express.Router()
const adminComplaints = require('../controllers/adminComplaints')

router.get('/complaints', adminComplaints.getComplaintsPage)
router.get('/complaints/:id', adminComplaints.getIndividualComplaintReport)
router.patch('/complaints/pending/:id', adminComplaints.updateIndividualPendingComplaintReport)

module.exports = router