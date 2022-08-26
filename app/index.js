const express = require("express");
const db = require("./util/database");
const sequelize = require("./util/database");
const Doctor = require("./models/doctors");
const Appointment = require("./models/appointments");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE");
  next();
});

//add routes
app.use("/dev", require("./routes/dev"));
app.use("/doctors", require("./routes/doctors"));
app.use("/appointments", require("./routes/appointments"));

(async () => {
  try {
    Doctor.hasMany(Appointment);
    Appointment.belongsTo(Doctor, { as: "doc", foreignKey: "docFK" });
    //force sync will drop any existing tables and recreate tables
    await sequelize.sync({ force: false });
    console.log("Server is up and running!");
    app.listen(process.env.EXTERNAL_PORT || 3001);
  } catch (error) {
    console.error(error);
  }
})();
