const express = require("express");
const addNewAdminController = require("../controllers/newAdmin.js");
const router = express.Router();

router.get("/newAdmin", addNewAdminController.getAddNewAdmin);
router.post("/newAdmin", addNewAdminController.addNewAdmin);
router.delete("/newAdmin/:id", addNewAdminController.deleteAdmin);

module.exports = router;
