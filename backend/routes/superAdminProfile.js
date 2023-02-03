const express = require("express");
const router = express.Router();
const adminProfile = require("../controllers/super-adminProfile");

router.get("/profile", adminProfile.getAdminProfilePage);
router.patch("/profile/:id", adminProfile.updateAdminProfile);

module.exports = router;
