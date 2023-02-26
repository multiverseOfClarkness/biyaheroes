const admin = require("../models/adminUsers");
const jwtdecode = require("jwt-decode");
const bcryptjs = require('bcryptjs')
const logs = require('../models/logs')



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

const getProfileAfterError = async (req, res) =>{
  try {
      const currentUser = await admin.findOne({
        email: jwtdecode(req.cookies.token).email,
      });
  
      admin.find({ _id: currentUser._id }, (err, admin) => {
        res.render("admin-change-pass-error", {
          adminDetails: admin,
        });
      });
    } catch (error) {
      console.log(error);
      //res.redirect('/logout')
    }
}
const getProfileAfterSuccess = async (req, res) =>{
  try {
      const currentUser = await admin.findOne({
        email: jwtdecode(req.cookies.token).email,
      });
  
      admin.find({ _id: currentUser._id }, (err, admin) => {
        logs.create({
          author: `${currentUser.fname} ${currentUser.lname}`,
          section: 'Admin / profile',
          action: 'Editted phone/email.',
          userID: `${currentUser.id}`
        })
        res.render("admin-change-pass-success", {
          adminDetails: admin,
        });
      });
    } catch (error) {
      console.log(error);
      //res.redirect('/logout')
    }
}

const updateAdminProfile = async (req, res) => {
  const currentUser = await admin.findOne({
    email: jwtdecode(req.cookies.token).email,
  });
  const body = req.body;

  const reqFname = body.fname;
  const reqLname = body.lname;
  const reqPhone = body.phone;
  const reqEmail = body.email;
  const reqCurrentPass = body.currentPass;
  const reqNewPass = body.newPass;
  const reqVerifiedPass = body.verifiedNewPass;
  

  try {
    if(reqFname || reqLname){
      await admin.findOneAndUpdate({email: jwtdecode(req.cookies.token).email}, {fname: reqFname, lname: reqLname});

      logs.create({
        author: `${currentUser.fname} ${currentUser.lname}`,
        section: 'Admin / profile',
        action: 'Editted name.',
        userID: `${currentUser.id}`
      })

      res.redirect("/admin/profile");
    } else if (reqPhone || reqEmail) {
      await admin.findOneAndUpdate({email: jwtdecode(req.cookies.token).email}, {phone: reqPhone, email: reqEmail});

      logs.create({
        author: `${currentUser.fname} ${currentUser.lname}`,
        section: 'Admin / profile',
        action: 'Editted phone/email.',
        userID: `${currentUser.id}`
      })

      res.redirect("/admin/profile");
    } else if (reqCurrentPass || reqNewPass || reqVerifiedPass) {
      const currentUser = await admin.findOne({email: jwtdecode(req.cookies.token).email})

      if(currentUser) {
          const isMatchUser = await bcryptjs.compare(reqCurrentPass, currentUser.password)
          if(isMatchUser){
              const salt = await bcryptjs.genSalt(10);
              let verifiedNewPass = reqVerifiedPass
              const newHashedPassword = await bcryptjs.hash(verifiedNewPass, salt)

              await admin.updateOne({email : currentUser.email}, {
                  password: newHashedPassword
              })
              getProfileAfterSuccess(req, res)
          } else {
              getProfileAfterError(req, res)
          }
      }
    } else {
      const reqProfile = await JSON.parse(body.profile);
      await admin.updateOne(
        { email: currentUser.email },
        {
          profileImage: new Buffer.from(reqProfile.data, "base64"),
          profileImageType: reqProfile.type
        }
      );

      logs.create({
        author: `${currentUser.fname} ${currentUser.lname}`,
        section: 'Admin / profile',
        action: 'Editted profile picture.',
        userID: `${currentUser.id}`
      })

      res.redirect("/admin/profile");
    }
  } catch (error) {
    getProfileAfterError(req, res)
  }
};



module.exports = {
  getAdminProfilePage,
  updateAdminProfile
};
