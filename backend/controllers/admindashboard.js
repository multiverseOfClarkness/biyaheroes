const admin = require("../models/adminUsers");
const violationReports = require("../models/violationReports");
const missingItemReports = require("../models/missingItemReports");
const jwtdecode = require("jwt-decode");

const getAdminDashboard = async (req, res) => {
  try {
    const vReps = await violationReports.countDocuments();
    const mReps = await missingItemReports.countDocuments();
    const totalReps = vReps + mReps;
    const currentUser = await admin.findOne({
      email: jwtdecode(req.cookies.token).email,
    });

    admin.find({ _id: currentUser._id }, (err, admin) => {
      res.render("admin-dashboard", {
        adminDetails: admin,
        totalReps,
      });
    });
  } catch (error) {
    console.log(error);
    //res.redirect('/logout')
  }
};

module.exports = {
  getAdminDashboard,
};
