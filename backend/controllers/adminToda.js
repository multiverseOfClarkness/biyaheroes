const todaModel = require("../models/toda");
const todaArchived = require("../models/todaArchived");
const XLSX = require("xlsx");

const getTODApage = (req, res) => {
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
  res.redirect("/admin/TODA");
} catch (e) {
  if (e.code === 11000) getTodaPageAfterError(req, res);
}
};

const uploadNewToda = async (req, res) => {
  
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
        res.redirect("/admin/TODA");
      });
    } catch (error) {}
    
  });
};

const deleteToda = async (req, res) => {
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

res.redirect("/admin/TODA");
};

module.exports = {
getTODApage,
addNewToda,
uploadNewToda,
deleteToda
};
