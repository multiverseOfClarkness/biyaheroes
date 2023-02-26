const express = require('express')
const router = express.Router()
const forgotPass = require('../controllers/forgotPassword')


router.post('/forgot-password', forgotPass.forgotPass)
router.get('/reset-password/:id/:token', forgotPass.getResetPassPage)
router.post('/reset-password/:id/:token', forgotPass.resetPass)

module.exports = router