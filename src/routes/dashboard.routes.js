const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");
const { auth } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.get(
  "/summary",
  auth,
  authorize("viewer", "analyst", "admin"),
  dashboardController.getSummary
);

module.exports = router;