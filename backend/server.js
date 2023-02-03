require("dotenv").config();
const connectDB = require("./config/db");
const path = require("path");
const {verifyJWTforCommuters, verifyJWTforAdmin} = require("./middlewares/verifyJWTforCommuters");
const {isAdmin, isCommuter, isSuper} = require ('./middlewares/authorization')
const express = require("express");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const ejs = require("ejs");
const app = express();
connectDB();

app.set("views", path.join(__dirname, "../frontend/views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../frontend/views")));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(cookieParser());

app.use("/", require("./routes/indexRoute"));
app.use("/", require("./routes/commuterRegister"));
app.use("/", require("./routes/logout"));
app.use("/", require("./routes/forgotPass"));


app.use("/super-admin", verifyJWTforAdmin, isSuper, require('./routes/superadmindashboard'))
app.use("/admin", verifyJWTforAdmin, isAdmin, require("./routes/admindashboard"));

app.use("/admin", verifyJWTforAdmin, isAdmin, require("./routes/adminComplaints"));
app.use("/admin", verifyJWTforAdmin, isAdmin, require("./routes/adminMissingItemReports"));

app.use("/admin", verifyJWTforAdmin, isAdmin, require("./routes/adminToda"));
app.use("/admin", verifyJWTforAdmin, isAdmin, require("./routes/adminDrivers"));
app.use("/admin", verifyJWTforAdmin, isAdmin, require("./routes/adminProfile"));
app.use("/admin", verifyJWTforAdmin, isSuper, require("./routes/newAdmin"));
app.use("/admin", verifyJWTforAdmin, isAdmin, require("./routes/admin-changepass"));


app.use("/commuter", verifyJWTforCommuters, isCommuter, require("./routes/commuterDashboard"));
app.use("/commuter", verifyJWTforCommuters, isCommuter, require("./routes/reportViolation"));
app.use("/commuter", verifyJWTforCommuters, isCommuter, require("./routes/reportMissingItem"));
app.use("/commuter", verifyJWTforCommuters, isCommuter, require("./routes/getFareCalc"));
app.use("/commuter", verifyJWTforCommuters, isCommuter, require("./routes/getReportsHistory"));
app.use("/commuter", verifyJWTforCommuters, isCommuter, require("./routes/getCommuterProfile"));
app.use("/commuter", verifyJWTforCommuters, isCommuter, require("./routes/commuter-changepass"));

app.get("*", (req, res) => {
  res.render('404')
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
