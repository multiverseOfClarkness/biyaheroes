require("dotenv").config();
const connectDB = require("./config/db");
const path = require("path");

const {verifyJWTforCommuters, verifyJWTforAdmin} = require("./middlewares/verifyJWTforCommuters");
const {isAdmin, isCommuter, isSuper} = require ('./middlewares/authorization')
const {reqResLogger} = require('./middlewares/req-reslogger')
const logger = require('./config/logger')

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


app.use("/SA", verifyJWTforAdmin, isSuper, require('./routes/superAdminDashboard'))
app.use("/SA", verifyJWTforAdmin, isSuper, require('./routes/superAdminComplaints'))
app.use("/SA", verifyJWTforAdmin, isSuper, require('./routes/superAdminMissing'))
app.use("/SA", verifyJWTforAdmin, isSuper,  require('./routes/superAdminToda'))
app.use("/SA", verifyJWTforAdmin, isSuper,  require('./routes/superAdminDrivers'))
app.use("/SA", verifyJWTforAdmin, isSuper,  require('./routes/superNewAdmin'))
app.use("/SA", verifyJWTforAdmin, isSuper,  require('./routes/superAdminProfile'))
app.use("/SA", verifyJWTforAdmin, isSuper,  require('./routes/superAdminLogs'))

app.use("/admin", verifyJWTforAdmin, isAdmin,  require("./routes/admindashboard"));
app.use("/admin", verifyJWTforAdmin, isAdmin,  require("./routes/adminComplaints"));
app.use("/admin", verifyJWTforAdmin, isAdmin,  require("./routes/adminMissing"));
app.use("/admin", verifyJWTforAdmin, isAdmin,  require("./routes/adminToda"));
app.use("/admin", verifyJWTforAdmin, isAdmin,  require("./routes/adminDrivers"));
app.use("/admin", verifyJWTforAdmin, isAdmin,  require("./routes/adminProfile"));
app.use("/admin", verifyJWTforAdmin, isAdmin,  require("./routes/admin-changepass"));


app.use("/commuter", verifyJWTforCommuters, isCommuter,  require("./routes/commuterDashboard"));
app.use("/commuter", verifyJWTforCommuters, isCommuter,  require("./routes/reportViolation"));
app.use("/commuter", verifyJWTforCommuters, isCommuter,  require("./routes/reportMissingItem"));
app.use("/commuter", verifyJWTforCommuters, isCommuter,  require("./routes/getFareCalc"));
app.use("/commuter", verifyJWTforCommuters, isCommuter,  require("./routes/getReportsHistory"));
app.use("/commuter", verifyJWTforCommuters, isCommuter,  require("./routes/getCommuterProfile"));
app.use("/commuter", verifyJWTforCommuters, isCommuter,  require("./routes/commuter-changepass"));

app.get("*",  (req, res) => {
  res.render('404')
});

app.listen(3000, () => {
  logger.info("Listening to port 3000");
});
