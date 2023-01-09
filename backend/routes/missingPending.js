const express = require('express')
const router = express.Router()
const adminPendingMissing = require('../controllers/missingPending')

router.get('/missing/pending', adminPendingMissing.getPendingMissingPage)

module.exports = router