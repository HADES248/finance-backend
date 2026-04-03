const Record = require("../models/record.model");

exports.getSummary = async (user) => {
  const matchStage = {};

  // restrict data for non-admin users
  if (user.role !== "admin") {
    matchStage.userId = user._id;
  }
  const totalIncomeAgg = await Record.aggregate([
    { $match: { ...matchStage, type: "income" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const totalExpenseAgg = await Record.aggregate([
    { $match: { ...matchStage, type: "expense" } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const categoryBreakdown = await Record.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    }
  ]);

  const monthlyTrends = await Record.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: { $month: "$date" },
        total: { $sum: "$amount" }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  const totalIncome = totalIncomeAgg[0]?.total || 0;
  const totalExpense = totalExpenseAgg[0]?.total || 0;

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
    categoryBreakdown,
    monthlyTrends
  };
};