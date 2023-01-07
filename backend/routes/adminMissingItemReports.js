const express = require('express')
const router = express.Router()
const missingItem = require('../controllers/adminMissingItem')

router.get('/missing', missingItem.getMissingItemPage)

module.exports = router