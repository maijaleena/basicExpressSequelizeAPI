const Sequelize = require("sequelize");
const db = require("../util/database");

const Appointment = db.define("appointments", {
  appointmentId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  patientFirstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  patientLastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  time: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  kind: {
    type: Sequelize.ENUM("New Patient", "Follow-up"),
    allowNull: false,
  },
});

module.exports = Appointment;
