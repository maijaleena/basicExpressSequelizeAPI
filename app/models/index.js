const db = require("../util/database");
const User = require("./users");
const Appointment = require("./appointments");
const sequelize = require("sequelize");

module.exports = {
  db,
  User,
  Appointment,
};
