const express = require('express')
const router = express.Router()
const missingItem = require('../controllers/adminMissingItem')

router.get('/missing', missingItem.getMissingItemPage)
router.get('/missing/pending', missingItem.getMissingReportsHistory)
router.get('/missing/pending/:id', missingItem.getIndividualPendingMissingReport)

module.exports = router