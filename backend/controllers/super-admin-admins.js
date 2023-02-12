const bcryptjs = require("bcryptjs");
const admin = require("../models/adminUsers");
const adminArchived = require("../models/adminArchived");
const logs = require('../models/logs')
const jwtdecode = require("jwt-decode");

const getAddNewAdmin = async (req, res) => {
  admin.find({status: "Continuing"}, (err, admin) => {
    res.render("SA-add-member", {
      adminList: admin,
    });
  });
};
const getAddNewAdminError = async (req, res) => {
  admin.find({status: "Continuing"}, (err, admin) => {
    res.render("SA-add-member-error", {
      adminList: admin,
    });
  });
};

const addNewAdmin = async (req, res) => {
  const currentUser = await admin.findOne({
    email: jwtdecode(req.cookies.token).email,
  });
  const body = await req.body;
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(body.password, salt);
  
  try {
    let newUser = new admin({
      role: body.position,
      fname: body.fname,
      lname: body.lname,
      email: body.email,
      password: hashedPassword,
    });
  
    newUser.save();
    logs.create({
      author: `${currentUser.fname} ${currentUser.lname}`,
      section: 'Super admin/ admins',
      action: 'Created new admin account.',
      userID: `${currentUser.id}`
    })
    res.redirect("/SA/admins");
  } catch (error) {
    getAddNewAdminError(req, res)
  }

};

const deleteAdmin = async (req, res) => {
  const currentUser = await admin.findOne({
    email: jwtdecode(req.cookies.token).email,
  });
  const currentAdmin = await admin.findByIdAndUpdate(req.params.id, {status: "Terminated"}, {new: true});
  const archivedAdmin = new adminArchived ({
    id: currentAdmin.id,
    role: currentAdmin.role,
    fname: currentAdmin.fname,
    lname: currentAdmin.lname,
    phone: currentAdmin.phone,
    email: currentAdmin.email,
    password: currentAdmin.password,
    profileImage: currentAdmin.profileImage,
    profileImageType: currentAdmin.profileImageType,
    status: currentAdmin.status,

  })
  await admin.remove(currentAdmin);
  await archivedAdmin.save();
  logs.create({
    author: `${currentUser.fname} ${currentUser.lname}`,
    section: 'Super admin/ admins',
    action: 'Terminated admin account.',
    userID: `${currentUser.id}`
  })
  
  res.redirect("/SA/admins");
};

module.exports = {
  getAddNewAdmin,
  addNewAdmin,
  deleteAdmin,
};
