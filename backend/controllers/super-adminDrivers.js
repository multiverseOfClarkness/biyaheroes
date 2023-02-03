const driverModel = require("../models/driver");
const XLSX = require("xlsx");
const todaModel = require("../models/toda");
const archivedToda = require('../models/todaArchived') 
const archivedDrivers = require('../models/driverArchived') 
const mongoose = require('mongoose');



const getDriversPage =  (req, res) => {
  let TODA = []
  archivedToda.find((err, data)=>{
    data.forEach(x =>{
      TODA.push(x.TODA)
    })
  })
  
  driverModel.find({status: 'Continuing'}, (err, driverModel) => {
    todaModel.find({}, (err, toda) =>{
        res.render("SA-driver", {
          driverList: driverModel,
          todaList: toda,
          TODA
      });
    })
  });
};

const getDriversPageAfterError = (req, res) => {
  let TODA = []
  archivedToda.find((err, data)=>{
    data.forEach(x =>{
      TODA.push(x.TODA)
    })
  })
  driverModel.find({status: 'Continuing'}, (err, driverModel) => {
    todaModel.find({}, (err, toda) =>{
      res.render("SA-driver-error", {
        driverList: driverModel,
        todaList: toda,
        TODA
      });
    })
    
  });
};

const uploadDriverFile = async (req, res) => {
  
  const existingDriver = await driverModel.find();

  const allData = [];
  existingDriver.forEach((data) => {
    allData.push(data.bodyNum);
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
        if (allData.includes(data.TODA) || allData.includes(data.phone) || allData.includes(data.lname) || allData.includes(data.fname) || allData.includes(data.bodyNum)) {
          getDriversPageAfterError(req, res);
          return false;
        } 
        for (let x in xlData) {
          
          todaModel.insertMany([xlData[x]]);
          
        }
        x++;
        res.redirect("/SA/drivers");
      });
    } catch (error) {
      console.log(error.message)
    }
    
  });
};

const addNewDriver = async (req, res) => {
  try {
    const body = req.body;
    const reqTODA = body.toda;
    const reqbodyNum = body.bodyNum;
    const reqfname = body.fname;
    const reqlname = body.lname;
    const reqphone = body.phone;

    const newDriver = new driverModel({
      TODA: reqTODA,
      bodyNum: reqbodyNum,
      fname: reqfname,
      lname: reqlname,
      phone: reqphone,
    });
    
    await newDriver.save();
    res.redirect("/SA/drivers");
  } catch (error) {
    if (error.code === 11000) {
      console.log(error)
      getDriversPageAfterError(req, res);
    } else {
      console.log(error);
    }
  }
};

const deleteDriver = async (req, res) => {
  try {
    const currentDriver = await driverModel.findByIdAndUpdate(req.params.id, {status: "Terminated"}, {new: true})

    const newArchived = new archivedDrivers({
      id: currentDriver.id,
      bodyNum: currentDriver.bodyNum,
      fname: currentDriver.fname,
      lname: currentDriver.lname,
      TODA: currentDriver.TODA,
      phone:  currentDriver.phone,
      status: currentDriver.status
    })
    
    await driverModel.deleteOne(currentDriver)
    await newArchived.save()
  

    res.redirect("/SA/drivers");
  } catch (error) {
    console.log(error.message)
  }
  
};

const updateDriver = async (req, res) => {
  const body = req.body
  const driverid = body.driverid
  var id = mongoose.Types.ObjectId(driverid);
  const driverFname = body.firstname
  const driverLname = body.lastname
  const driverTODA = body.toda
  const driverBodyNum = body.bodynum
  const driverContact = body.contact
  
  try {
    
    await driverModel.findByIdAndUpdate(id, {
      bodyNum: driverBodyNum,
      fname: driverFname,
      lname: driverLname,
      TODA: driverTODA,
      phone: driverContact
    }, {new: true})
    
    res.redirect('/SA/drivers')
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  getDriversPage,
  uploadDriverFile,
  addNewDriver,
  deleteDriver,
  updateDriver
};
