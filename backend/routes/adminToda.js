const express = require("express");
const router = express.Router();
const adminTODA = require("../controllers/adminToda");
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

router.get("/TODA", adminTODA.getTODApage);
router.post("/TODA", upload.single("excel"), adminTODA.uploadNewToda);
router.post("/TODA/new", adminTODA.addNewToda);

module.exports = router;
