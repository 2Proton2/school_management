const StudentClass = require('../models/school_class_student.model');
const knex = require('knex')(require('../db/knexfile'));

exports.assignStudentToClass = async (req, res) => {
  try {
    const school_id = req.get('school-id');
    const class_id = req.get('class-id');
    const user_id = req.get('user-id');
    const instance = {school_id, class_id, user_id}
    const assignment = await StudentClass.forge(instance).save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findAllStudent = async (req, res) => {
  try {
    const students = await knex('school_class_student');
    res.status(200).json(students);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.studentsOfAllClass = async (req, res) => {
  try {
    const user_id = req.get('user-id');
    const students = await knex('school_class_student').where('user_id', user_id);

    if(students.length > 1){
      res.status(200).json(students);
    }
    else {
      throw new Error('Student is not in more than one class or it is not registrated');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.findStudentsOfParticularClass = async (req, res) => {
  try {
    const class_id = req.get('class-id');
    const students = await knex('school_class_student').where('class_id', class_id);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
