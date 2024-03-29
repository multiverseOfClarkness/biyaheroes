const todaModel = require("../models/toda");
const todaArchived = require("../models/todaArchived");
const XLSX = require("xlsx");
const mongoose = require('mongoose')
const logs = require('../models/logs')
const jwtdecode = require("jwt-decode");
const admin = require("../models/adminUsers");


const getTODApage = async (req, res) => {
  todaModel.find({}, (err, todaModel) => {
    res.render("SA-toda", {
      todaList: todaModel,
    });
  });
};
const getTodaPageAfterError = (req, res) => {
  todaModel.find({}, (err, todaModel) => {
    res.render("SA-toda-error", {
      todaList: todaModel,
    });
  });
};

const addNewToda = async (req, res) => {
  const currentUser = await admin.findOne({
    email: jwtdecode(req.cookies.token).email,
  });
try {
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

  logs.create({
    author: `${currentUser.fname} ${currentUser.lname}`,
    section: 'Super admin/ TODA',
    action: 'Inserted a TODA.',
    userID: `${currentUser.id}`
  })

  res.redirect("/SA/TODA");
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
          section: 'Super admin/ TODA',
          action: 'Uploaded TODA file.',
          userID: `${currentUser.id}`
        })

        res.redirect("/SA/TODA");
      });
    } catch (error) {}
    
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
    section: 'Super admin/ TODA',
    action: 'Deleted a TODA.',
    userID: `${currentUser.id}`
  })

  res.redirect("/SA/TODA");
};

const updateToda = async (req, res) => {
  const currentUser = await admin.findOne({
    email: jwtdecode(req.cookies.token).email,
  });
  const body = req.body
  const todaid = body.todaid
  var id = mongoose.Types.ObjectId(todaid);
  const presFname = body.firstname
  const presLname = body.lastname
  const presTODA = body.toda
  const presContact = body.contact
  
  try {
    
    await todaModel.findByIdAndUpdate(id, {
      presidentfname: presFname,
      presidentlname: presLname,
      TODA: presTODA,
      phone: presContact
    }, {new: true})
    

    logs.create({
      author: `${currentUser.fname} ${currentUser.lname}`,
      section: 'Super admin/ TODA',
      action: 'Updated a TODA.',
      userID: `${currentUser.id}`
    })

    res.redirect('/SA/TODA')
  } catch (error) {
    getTodaPageAfterError(req, res)
    console.log(error.message)
  }
}

module.exports = {

  getTODApage,
  addNewToda,
  uploadNewToda,
  deleteToda,
  updateToda
};
