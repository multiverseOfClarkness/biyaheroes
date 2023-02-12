const express = require ('express')
const maintenance = require('../controllers/maintenance')
const router = express.Router()

router.get('/maintenance', maintenance.getMaintenancePage)
router.patch('/maintenance/violations/:id', maintenance.deleteViolationType)
router.patch('/maintenance/items/:id', maintenance.deleteItemType)
router.post('/maintenance/violations', maintenance.addViolationType)
router.post('/maintenance/items', maintenance.addItemType)


module.exports = router