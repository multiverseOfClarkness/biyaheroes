const express = require('express')
const router = express.Router()
const adminOverdueMissing = require('../controllers/missingOverdue')

router.get('/missing/overdue', adminOverdueMissing.getOverdueMissingPage)

module.exports = router