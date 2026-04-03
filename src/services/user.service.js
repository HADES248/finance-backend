const User = require("../models/user.model");

exports.getAllUsers = async () => {
  return await User.find().select("-password");
};

exports.updateUserRole = async (userId, role) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  user.role = role;
  await user.save();

  return user;
};