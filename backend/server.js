require("dotenv").config();
const connectDB = require("./config/db");
const path = require("path");
const {
  verifyJWTforCommuters,
  verifyJWTforAdmin,
} = require("./middlewares/verifyJWTforCommuters");
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

app.use("/admin", require("./routes/adminLogin"));

app.use("/admin", verifyJWTforAdmin, require("./routes/admindashboard"));

app.use("/admin", verifyJWTforAdmin, require("./routes/adminComplaints"));
app.use("/admin", verifyJWTforAdmin, require("./routes/adminMissingItemReports"));

app.use("/admin", verifyJWTforAdmin, require("./routes/adminToda"));
app.use("/admin", verifyJWTforAdmin, require("./routes/adminDrivers"));
app.use("/admin", verifyJWTforAdmin, require("./routes/adminProfile"));
app.use("/admin", verifyJWTforAdmin, require("./routes/newAdmin"));
app.use("/admin", verifyJWTforAdmin, require("./routes/admin-changepass"));

app.use("/commuter", require("./routes/commuterLogin"));
app.use("/commuter", verifyJWTforCommuters, require("./routes/commuterDashboard"));
app.use("/commuter", verifyJWTforCommuters, require("./routes/reportViolation"));
app.use("/commuter", verifyJWTforCommuters, require("./routes/reportMissingItem"));
app.use("/commuter", verifyJWTforCommuters, require("./routes/getFareCalc"));
app.use("/commuter", verifyJWTforCommuters, require("./routes/getReportsHistory"));
app.use("/commuter", verifyJWTforCommuters, require("./routes/getCommuterProfile"));
app.use("/commuter", verifyJWTforCommuters, require("./routes/commuter-changepass"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("./", "frontend", "views", "404.html"));
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
