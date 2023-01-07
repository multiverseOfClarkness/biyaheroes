const express = require('express')
const router = express.Router()
const adminProfile = require('../controllers/adminProfile')

router.get('/profile', adminProfile.getAdminProfilePage)

module.exports = router