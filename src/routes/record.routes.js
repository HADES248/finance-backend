const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validate.middleware");
const recordController = require("../controllers/record.controller");
const { auth } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const { updateRecordSchema } = require("../validations/record.validation");
const { recordSchema } = require("../validations/record.validation");


router.post(
  "/",
  auth,
  authorize("admin", "analyst"),
  validate(recordSchema),
  recordController.createRecord
);

router.get(
  "/",
  auth,
  authorize("admin", "analyst"),
  recordController.getRecords
);

router.patch(
  "/:id",
  auth,
  authorize("admin", "analyst"),
  validate(updateRecordSchema),
  recordController.updateRecord
);

router.delete(
  "/:id",
  auth,
  authorize("admin"),
  recordController.deleteRecord
);

module.exports = router;