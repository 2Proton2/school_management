const Student = require('../models/user.model');

exports.createUser = async (req, res) => {
  try {
    const newStudent = await Student.forge(req.body).save();
    res.status(201).json("newStudent");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
