const express = require('express')
const router = express.Router()
const missingItem = require('../controllers/super-admin-missing')

router.get('/missing', missingItem.getMissingItemPage)
router.get('/missing/:id', missingItem.getIndividualMissingReport)
router.patch('/missing/pending/:id', missingItem.updateIndividualPendingMissingReport)

module.exports = router