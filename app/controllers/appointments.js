const Appointment = require("../models/appointments");
const Doctor = require("../models/doctors");

//list of all appointments for a particular doctor and particular day
// GET /appointments
exports.getAll = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({
      where: {
        userId: req.body.userId,
      },
    });

    const appointment = await Appointment.findAll({
      where: {
        docFK: doctor.userId,
        date: req.body.date,
      },
    });

    res.json(appointment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//delete an existing appointment from a doctor's calendar
// DELETE /appointments/:appointmentId
exports.deleteOne = async (req, res, next) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (appointment) {
      await appointment.destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//add new appointment to a doctor's calendar
// POST /appointments
exports.createOne = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({
      where: {
        userId: req.body.userId,
      },
    });

    const APPOINTMENT_MODEL = {
      docFK: doctor.userId,
      patientFirstName: req.body.patientFirstName,
      patientLastName: req.body.patientLastName,
      date: req.body.date,
      time: req.body.time,
      kind: req.body.kind,
    };

    //check interval
    let appointmentTime = APPOINTMENT_MODEL.time;
    if (!validInterval(appointmentTime)) {
      return res
        .status(404)
        .json("new appointments must start at 15 minute intervals");
    }

    //check max 3 at same time
    const appointmentCount = await Appointment.count({
      where: {
        time: req.body.time,
        //Note: added this AFTER:
        docFK: doctor.userId,
      },
    });
    if (appointmentCount >= 3) {
      return res
        .status(404)
        .json("Doctor cannot have more than 3 appointments at the same time!");
    }

    //create Appointment
    const appointment = await Appointment.create(APPOINTMENT_MODEL);
    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(500).json(error);
  }
};

function validInterval(appointmentTime) {
  let minutes = appointmentTime.split(":")[1];
  return parseInt(minutes) % 15 === 0;
}

exports.updateOne = async (req, res, next) => {
  try {
    const appointment = await Appointment.findOne({
      where: {
        appointmentId: req.body.appointmentId,
      },
    });
    if (appointment) {
      //check interval
      if (Object.keys(req.body).includes("time")) {
        if (!validInterval(req.body.time))
          return res
            .status(404)
            .json("new appointments must start at 15 minute intervals");
      }

      //check max 3 at same time
      if (
        Object.keys(req.body).includes("time") ||
        Object.keys(req.body).includes("docFK")
      ) {
        const appointmentCount = await Appointment.count({
          where: {
            time: req.body.time,
            docFK: req.body.docFK,
          },
        });
        if (appointmentCount >= 3) {
          return res
            .status(404)
            .json(
              "Doctor cannot have more than 3 appointments at the same time!"
            );
        }
      }
    } else {
      throw { status: 401, message: "Appointment Not Found!" };
    }
    res.json(await appointment.update(req.body));
  } catch (error) {
    return res.status(500).json(error);
  }
};
