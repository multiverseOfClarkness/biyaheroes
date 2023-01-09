const express = require('express')
const router = express.Router()
const adminSolvedComplaints = require('../controllers/complaintsSolved')

router.get('/complaints/solved', adminSolvedComplaints.getSolvedComplaintsPage)

module.exports = router