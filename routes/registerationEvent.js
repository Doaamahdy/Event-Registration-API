const express = require("express");
const router = express.Router();

const {
  getAllRegistrations,
  getRegistration,
  deleteRegistration,
  updateRegistration,
} = require("../controllers/registrationEvent");

router.route("/").get(getAllRegistrations);
router.route("/:id")
  .get(getRegistration)
  .patch(updateRegistration)
  .delete(deleteRegistration);

  module.exports = router;
