const express = require("express");
const addNewAdminController = require("../controllers/super-admin-admins");
const router = express.Router();

router.get("/admins", addNewAdminController.getAddNewAdmin);
router.post("/admins", addNewAdminController.addNewAdmin);
router.patch("/admins/:id", addNewAdminController.deleteAdmin);

module.exports = router;
