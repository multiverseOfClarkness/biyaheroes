const express = require('express')
const router = express.Router()
const adminTODA = require('../controllers/adminToda')

router.get('/TODA', adminTODA.getTODApage)

module.exports = router