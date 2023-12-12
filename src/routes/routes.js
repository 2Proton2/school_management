const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const schooolController = require('../controllers/schoolController');
const classController = require('../controllers/classController');
const schoolClassController = require('../controllers/studentClassController')

//user related
Router.post('/add-user', userController.createUser);

//school related
Router.post('/add-school', schooolController.createSchool);

//class related
Router.post('/add-school-class', classController.createClass);
Router.get('/get-all-class', classController.getAllClass);

//student related
Router.post('/add-school-class-student', schoolClassController.assignStudentToClass);
Router.get('/get-all-students', schoolClassController.findAllStudent);
Router.get('/get-student-classes', schoolClassController.studentsOfAllClass);
Router.get('/class/students', schoolClassController.findStudentsOfParticularClass);

module.exports = Router;