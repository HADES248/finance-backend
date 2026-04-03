const Record = require("../models/record.model");

exports.createRecord = async (data, userId) => {
  return await Record.create({
    ...data,
    userId
  });
};

exports.getRecords = async (query, user) => {
  const filter = {};

  if (user.role !== "admin") {
    filter.userId = user._id;
  }

  if (query.type) filter.type = query.type;
  if (query.category) filter.category = query.category;

  if (query.startDate && query.endDate) {
    filter.date = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate)
    };
  }

  return await Record.find(filter).sort({ date: -1 });
};

exports.updateRecord = async (id, data, user) => {
  const record = await Record.findById(id);
  if (!record) throw new Error("Record not found");

  if (user.role !== "admin" && record.userId.toString() !== user._id.toString()) {
    throw new Error("Not authorized");
  }

  return await Record.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteRecord = async (id, user) => {
  const record = await Record.findById(id);
  if (!record) throw new Error("Record not found");

  if (user.role !== "admin" && record.userId.toString() !== user._id.toString()) {
    throw new Error("Not authorized");
  }

  await record.deleteOne();
};