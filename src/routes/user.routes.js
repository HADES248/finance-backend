const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { auth } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { updateRoleSchema } = require("../validations/user.validation");


router.get("/", auth, authorize("admin"), userController.getUsers);

router.patch(
  "/:id/role",
  auth,
  authorize("admin"),
  validate(updateRoleSchema),
  userController.updateRole
);


module.exports = router;