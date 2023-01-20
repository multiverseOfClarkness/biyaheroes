const admin = require("../models/adminUsers");
const jwtdecode = require("jwt-decode");

const getAdminProfilePage = async (req, res) => {
  try {
    const currentUser = await admin.findOne({
      email: jwtdecode(req.cookies.token).email,
    });

    admin.find({ _id: currentUser._id }, (err, admin) => {
      res.render("profile", {
        adminDetails: admin,
      });
    });
  } catch (error) {
    console.log(error);
    //res.redirect('/logout')
  }
};
const updateAdminProfile = async (req, res) => {
  const currentUser = await admin.findOne({
    email: jwtdecode(req.cookies.token).email,
  });
  const body = req.body;

  const reqFullname = body.fullname;
  const reqRole = body.role;
  const reqEmail = body.email;

  try {
    const reqProfile = await JSON.parse(body.profile);

    await admin.updateOne(
      { email: currentUser.email },
      {
        role: reqRole,
        fullname: reqFullname,
        email: reqEmail,
        profileImage: new Buffer.from(reqProfile.data, "base64"),
        profileImageType: reqProfile.type,
      }
    );

    res.redirect("/logout");
  } catch (error) {
    console.log(error.message);
    if (error.message === "Unexpected end of JSON input") {
      await admin.updateOne(
        { email: currentUser.email },
        {
          role: reqRole,
          fullname: reqFullname,
          email: reqEmail,
        }
      );

      res.redirect("/logout");
    }
  }
};

const changePass = (req, res) => {
  res.render("admin-change-pass");
};

module.exports = {
  getAdminProfilePage,
  updateAdminProfile,
  changePass,
};
