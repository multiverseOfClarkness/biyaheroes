const admin = require("../models/adminUsers");
const violationReports = require("../models/violationReports");
const missingItemReports = require("../models/missingItemReports");
const jwtdecode = require("jwt-decode");

const getAdminDashboard = async (req, res) => {
  try {
    const vRepsPending = await violationReports.countDocuments({status: "Pending"});
    const mRepsPending = await missingItemReports.countDocuments({status: "Pending"});
    const totalRepsPending = vRepsPending + mRepsPending;

    const vRepsSolved = await violationReports.countDocuments({status: "Solved"});
    const mRepsSolved = await missingItemReports.countDocuments({status: "Solved"});
    const totalRepsSolved = vRepsSolved + mRepsSolved;


    const currentUser = await admin.findOne({
      email: jwtdecode(req.cookies.token).email,
    });

    admin.find({ _id: currentUser._id }, (err, admin) => {
      res.render("admin-dashboard", {
        adminDetails: admin,
        totalRepsPending,
        totalRepsSolved
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
