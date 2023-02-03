const express = require('express')
const router = express.Router()
const adminComplaints = require('../controllers/super-admin-complaints')

router.get('/complaints', adminComplaints.getComplaintsPage)
router.get('/complaints/:id', adminComplaints.getIndividualComplaint)
router.patch('/complaints/pending/:id', adminComplaints.updateIndividualComplaints)

module.exports = router