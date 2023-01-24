const driverModel = require("../models/driver");
const XLSX = require("xlsx");
const todaModel = require("../models/toda");
const driver = require("../models/driver");

const getDriversPage = (req, res) => {
  driverModel.find({status: 'Continuing'}, (err, driverModel) => {
    todaModel.find({}, (err, toda) =>{
      res.render("driver", {
        driverList: driverModel,
        todaList: toda
      });
    })
  });
};

const getDriversPageAfterError = (req, res) => {
  driverModel.find({}, (err, driverModel) => {
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
  sheet_namelist.forEach((element) => {
    //CONVERTS EXCEL FILE TO JSON
    //RETURNS JSON
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);

    try {
      xlData.every((data) => {
        if (
          allData.includes(data.driverName) ||
          allData.includes(data.phone) ||
          allData.includes(data.bodyNum)
        ) {
          getDriversPageAfterError(req, res);
          return false;
        }

        for (let driver in xlData) {
          driverModel.create([xlData[driver]]);
          res.redirect("/admin/drivers");
        }
      });
    } catch (error) {}
    x++;
  });
};

const addNewDriver = async (req, res) => {
  try {
    const body = req.body;
    const TODA = body.toda;
    const reqbodyNum = body.bodyNum;
    const fname = body.fname;
    const lname = body.lname;
    const phone = body.phone;

    const newDriver = new driverModel({
      TODA: TODA,
      bodyNum: reqbodyNum,
      fname: fname,
      lname: lname,
      phone: phone,
    });
    await driverModel.deleteMany();
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
  await driver.findByIdAndUpdate(req.params.id, {status: 'Terminated'});

  res.redirect("/admin/drivers");
};

module.exports = {
  getDriversPage,
  uploadDriverFile,
  addNewDriver,
  deleteDriver,
};
