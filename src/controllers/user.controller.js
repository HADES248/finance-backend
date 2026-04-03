const userService = require("../services/user.service");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const { role } = req.body;

    const updatedUser = await userService.updateUserRole(
      req.params.id,
      role
    );

    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};