const controller = require("../controllers/doctors");
const router = require("express").Router();

//CRUD
router.get("/", controller.getAll).post("/", controller.createOne);

module.exports = router;
