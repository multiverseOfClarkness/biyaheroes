const express = require("express");
const router = express.Router();
const adminDrivers = require("../controllers/adminDrivers");
const multer = require("multer");

//MULTER
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

router.get("/drivers", adminDrivers.getDriversPage);
router.post("/drivers", upload.single("excel"), adminDrivers.uploadDriverFile);
router.post("/drivers/new", adminDrivers.addNewDriver);
router.delete("/drivers/:id", adminDrivers.deleteDriver);

module.exports = router;
