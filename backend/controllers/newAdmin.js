const bcryptjs = require("bcryptjs");
const admin = require("../models/adminUsers");

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
  const hashedPassword = await bcryptjs.hash(body.adminPassword, salt);
  console.log(body);

  let newUser = new admin({
    role: body.adminRole,
    fullname: body.adminName,
    email: body.adminEmail,
    password: hashedPassword,
  });

  newUser.save();
  res.redirect("/admin/newAdmin");
};

const deleteAdmin = async (req, res) => {
  await admin.findByIdAndUpdate(req.params.id, {status: "Terminated"});

  
  res.redirect("/admin/newAdmin");
};

module.exports = {
  getAddNewAdmin,
  addNewAdmin,
  deleteAdmin,
};
