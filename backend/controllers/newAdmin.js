const bcryptjs = require("bcryptjs");
const admin = require("../models/adminUsers");
const adminArchived = require("../models/adminArchived");

const getAddNewAdmin = async (req, res) => {
  admin.find({status: "Continuing"}, (err, admin) => {
    res.render("add-member", {
      adminList: admin,
    });
  });
};

const addNewAdmin = async (req, res) => {
  const body = await req.body;
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(body.password, salt);
  

  let newUser = new admin({
    role: body.position,
    fname: body.fname,
    lname: body.lname,
    email: body.email,
    password: hashedPassword,
  });

  newUser.save();
  res.redirect("/admin/newAdmin");
};

const deleteAdmin = async (req, res) => {

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

  
  res.redirect("/admin/newAdmin");
};

module.exports = {
  getAddNewAdmin,
  addNewAdmin,
  deleteAdmin,
};
