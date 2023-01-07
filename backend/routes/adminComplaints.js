const express = require('express')
const router = express.Router()
const adminComplaints = require('../controllers/adminComplaints')

router.get('/complaints', adminComplaints.getComplaintsPage)

module.exports = router