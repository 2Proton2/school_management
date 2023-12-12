const School = require('../models/school.model');

exports.createSchool = async (req, res) => {
  try {
    const newSchool = await School.forge(req.body).save();
    res.status(201).json(newSchool);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
