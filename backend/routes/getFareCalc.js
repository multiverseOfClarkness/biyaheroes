const express = require('express')
const getFareCalc = require("../controllers/fareCalc.js")
const router = express.Router()

router.get ('/fareCalculator', getFareCalc.getFareCalc)

module.exports = router