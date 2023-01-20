const express = require('express')
const router = express.Router()
const missingItem = require('../controllers/adminMissingItem')

router.get('/missing', missingItem.getMissingItemPage)
router.get('/missing/pending', missingItem.getPendingMissingReportsHistory)
router.get('/missing/solved', missingItem.getSolvedMissingReportsHistory)
router.get('/missing/pending/:id', missingItem.getIndividualPendingMissingReport)
router.get('/missing/solved/:id', missingItem.getIndividualSolvedMissingReport)
router.patch('/missing/pending/:id', missingItem.updateIndividualPendingMissingReport)

module.exports = router