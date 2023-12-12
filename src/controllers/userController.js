const Student = require('../models/user.model');
const crypto = require('crypto');
const uuid = require('uuid');
const API = require('../models/api.model');

exports.createUser = async (req, res) => {
  try {
    const newStudent = await Student.forge(req.body).save();
    const user_id = newStudent.get('id');
    const api_key = crypto.randomBytes(32).toString('hex');

    const token = uuid.v4();
    const expires_at = new Date();
    expires_at.setDate(expires_at.getDate() + 7);
    const apiInstance = {user_id, token, api_key, expires_at}

    const userCredentials = await API.forge(apiInstance).save();
    res.status(201).json("newStudent");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logUserIn = async (req, res) => {
  try {
    res.header('authorization', req.token)
    console.log(res)
    res.status(200).json({message: "Logged in successful"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
