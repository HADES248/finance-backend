const recordService = require("../services/record.service");

exports.createRecord = async (req, res, next) => {
  try {
    const record = await recordService.createRecord(req.body, req.user._id);
    res.status(201).json(record);
  } catch (err) {
    next(err);
  }
};

exports.getRecords = async (req, res, next) => {
  try {
    const records = await recordService.getRecords(req.query, req.user);
    res.json(records);
  } catch (err) {
    next(err);
  }
};

exports.updateRecord = async (req, res, next) => {
  try {
    const updated = await recordService.updateRecord(
      req.params.id,
      req.body,
      req.user
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteRecord = async (req, res, next) => {
  try {
    await recordService.deleteRecord(req.params.id, req.user);
    res.json({ message: "Record deleted" });
  } catch (err) {
    next(err);
  }
};