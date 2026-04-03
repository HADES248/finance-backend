const dashboardService = require("../services/dashboard.service");

exports.getSummary = async (req, res, next) => {
  try {
    const data = await dashboardService.getSummary(req.user);
    res.json(data);
  } catch (err) {
    next(err);
  }
};