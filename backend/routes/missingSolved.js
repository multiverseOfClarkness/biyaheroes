const express = require('express')
const router = express.Router()
const adminSolvedMissing = require('../controllers/missingSolved')

router.get('/missing/solved', adminSolvedMissing.getSolvedMissingPage)

module.exports = router