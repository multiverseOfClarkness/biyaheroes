const express = require("express");
const router = express.Router();
const adminProfile = require("../controllers/adminProfile");

router.get("/profile", adminProfile.getAdminProfilePage);
router.get("/change-pass", adminProfile.changePass);
router.patch("/profile/:id", adminProfile.updateAdminProfile);

module.exports = router;
