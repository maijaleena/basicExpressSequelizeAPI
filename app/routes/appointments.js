const controller = require("../controllers/appointments");
const router = require("express").Router();

router
  .get("/", controller.getAll)
  .post("/", controller.createOne)
  .get("/:id", controller.getAll)
  .delete("/:id", controller.deleteOne)
  .put("/", controller.updateOne);

module.exports = router;
