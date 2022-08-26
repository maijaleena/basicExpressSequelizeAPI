const Doctor = require("../models/doctors");

//get list of all doctors
// GET /doctors
exports.getAll = async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll();
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//create doctor for seeding purposes
// POST /doctors
exports.createOne = async (req, res, next) => {
  try {
    const doctorModel = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    try {
      const doctor = await Doctor.create(doctorModel);
      console.log("Doctor created!");
      return res.status(201).json(doctor);
    } catch (error) {
      return res.status(500).json(error);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
