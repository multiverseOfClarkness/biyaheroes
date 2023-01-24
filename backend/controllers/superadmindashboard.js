const admin = require("../models/adminUsers");
const jwtdecode = require("jwt-decode");



const getSuperAdminDashboard = async (req, res) => {
  try {
    const currentUser = await admin.findOne({
      email: jwtdecode(req.cookies.token).email,
    });

    admin.find({ _id: currentUser._id }, (err, admin) => {
      res.render("super-admin-dashboard");
    });
  } catch (error) {
    console.log(error);
    //res.redirect('/logout')
  }
}

module.exports = {
 getSuperAdminDashboard
};
