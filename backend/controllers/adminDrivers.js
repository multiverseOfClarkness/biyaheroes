const driverModel = require("../models/driver");
const XLSX = require("xlsx");
const todaModel = require("../models/toda");
const archivedDrivers = require('../models/driverArchived') 


const getDriversPage = (req, res) => {
  driverModel.find({status: 'Continuing'}, (err, driverModel) => {
    todaModel.find({}, (err, toda) =>{
      archivedDrivers.find({}, (err, data) =>{
        res.render("driver", {
          driverList: driverModel,
          todaList: toda,
          data
      })
      });
    })
  });
};

const getDriversPageAfterError = (req, res) => {
  driverModel.find({status: 'Continuing'}, (err, driverModel) => {
    todaModel.find({}, (err, toda) =>{
      res.render("driver-error", {
        driverList: driverModel,
        todaList: toda
      });
    })
    
  });
};

const uploadDriverFile = async (req, res) => {
  
  const existingDrivers = await driverModel.find();

  const allData = [];
  existingDrivers.forEach((data) => {
    allData.push(data.driverName);
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
    console.log(xlData )
    try {
      xlData.every((data) => {
        if (allData.includes(data.fname) || allData.includes(data.lname) || allData.includes(data.phone) || allData.includes(data.bodyNum)) {
          getDriversPageAfterError(req, res);
          return false;
        } 
        for (let x in xlData) {
          
          driverModel.insertMany([xlData[x]]);
          
        }
        x++;
        res.redirect("/admin/drivers");
      });
    } catch (error) {}
    
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
    res.redirect("/admin/drivers");
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
    await newArchived.save()
    await driverModel.remove(currentDriver)
  
  

    res.redirect("/admin/drivers");
  } catch (error) {
    res.redirect('*')
  }
  
};

module.exports = {
  getDriversPage,
  uploadDriverFile,
  addNewDriver,
  deleteDriver,
};
