// /school-api/controllers/classController.js
const Class = require('../models/class.model');
const knex = require('knex')(require('../db/knexfile'));

exports.createClass = async (req, res) => {
  try {
    const school_id = req.get('school-id').toString();
    const body = req.body;
    const schoolExists = await knex('schools').where('id', school_id).first();
    const instanceClass = { school_id: school_id, ... body}
    const newClass = await Class.forge(instanceClass).save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllClass = async (req, res) => {
  try {
    let classes = await knex('school_class');
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
