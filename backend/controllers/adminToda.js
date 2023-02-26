const todaModel = require("../models/toda");
const todaArchived = require("../models/todaArchived");
const XLSX = require("xlsx");
const logs = require('../models/logs')
const jwtdecode = require("jwt-decode");
const admin = require('../models/adminUsers')
const mongoose = require('mongoose')

const getTODApage = async (req, res) => {
todaModel.find({}, (err, todaModel) => {
  res.render("toda", {
    todaList: todaModel,
  });
});
};
const getTodaPageAfterError = (req, res) => {
todaModel.find({}, (err, todaModel) => {
  res.render("toda-error", {
    todaList: todaModel,
  });
});
};

const addNewToda = async (req, res) => {
try {
  const currentUser = await admin.findOne({
    email: jwtdecode(req.cookies.token).email,
  });
  const body = req.body;
  const TODA = body.toda;
  const presidentfname = body.fname;
  const presidentlname = body.lname;
  const contact = body.contact;

  const newToda = new todaModel({
    TODA: TODA,
    presidentfname: presidentfname,
    presidentlname: presidentlname,
    contact : contact
  });
  
  await newToda.save();
  await logs.create({
    author: `${currentUser.fname} ${currentUser.lname}`,
    section: 'Admin / TODA',
    action: 'Added single TODA.',
    userID: `${currentUser.id}`
  })
  res.redirect("/admin/TODA");
} catch (e) {
  if (e.code === 11000) getTodaPageAfterError(req, res);
}
};

const uploadNewToda = async (req, res) => {
  const currentUser = await admin.findOne({
    email: jwtdecode(req.cookies.token).email,
  });
  const existingTODA = await todaModel.find();

  const allData = [];
  existingTODA.forEach((data) => {
    allData.push(data.TODA);
  });

  //READS THE FILE SUBMITTED BY THE USER
  var workbook = XLSX.readFile(req.file.path);
  var sheet_namelist = workbook.SheetNames;

  var x = 0;

  //TO LOOP AROUND EACH SHEETS OF THE UPLOADED EXCEL FILE
  sheet_namelist.forEach(element => {
    //CONVERTS EXCEL FILE TO JSON
    //RETURNS JSON
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    
    try {
      xlData.every((data) => {
        if (allData.includes(data.TODA) || allData.includes(data.presidentfname) || allData.includes(data.presidentlname) || allData.includes(data.contact)) {
          getTodaPageAfterError(req, res);
          return false;
        } 
        for (let x in xlData) {
          
          todaModel.insertMany([xlData[x]]);
          
        }
        x++;
        logs.create({
          author: `${currentUser.fname} ${currentUser.lname}`,
          section: 'Admin / TODA',
          action: 'Uploaded TODA file.',
          userID: `${currentUser.id}`
        })
        res.redirect("/admin/TODA");
      });
    } catch (error) {}
    getTodaPageAfterError(req, res);
  });
};

const deleteToda = async (req, res) => {
  const currentUser = await admin.findOne({
    email: jwtdecode(req.cookies.token).email,
  });
  const thisToda = await todaModel.findByIdAndUpdate(req.params.id, {status: "Archived"}, {new: true});
  const archived = new todaArchived ({
    id: thisToda.id,
    presidentlname: thisToda.presidentlname,
    presidentfname: thisToda.presidentfname,
    TODA: thisToda.TODA,
    contact: thisToda.contact,
    status: thisToda.status

  })

await todaModel.deleteOne(thisToda)
await archived.save()
  logs.create({
    author: `${currentUser.fname} ${currentUser.lname}`,
    section: 'Admin / TODA',
    action: 'Delete TODA data.',
    userID: `${currentUser.id}`
  })
res.redirect("/admin/TODA");
};

const updateToda = async (req, res) => {
  const currentUser = await admin.findOne({
    email: jwtdecode(req.cookies.token).email,
  });

  const body = req.body
  const todaid = body.todaid
  const id = mongoose.Types.ObjectId(todaid)
  
  const presFname = body.firstname
  const presLname = body.lastname
  const presTODA = body.toda
  const presContact = body.contact
  
  
  try {
    
    await todaModel.findByIdAndUpdate(id, {
      presidentfname: presFname,
      presidentlname: presLname,
      TODA: presTODA,
      contact: presContact
    }, {new: true})

    logs.create({
      author: `${currentUser.fname} ${currentUser.lname}`,
      section: 'Admin / TODA',
      action: 'Update TODA data.',
      userID: `${currentUser.id}`
    })

    res.redirect('/admin/TODA')
  } catch (error) {
    getTodaPageAfterError(req, res)
  }
}

module.exports = {
getTODApage,
addNewToda,
uploadNewToda,
deleteToda,
updateToda
};
