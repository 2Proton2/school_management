const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const schooolController = require('../controllers/schoolController');
const classController = require('../controllers/classController');
const schoolClassController = require('../controllers/studentClassController');
const auth = require('../middlewares/auth.middleware');

//user related
Router.post('/add-user', userController.createUser);
Router.post('/user-login', auth.authenticate, userController.logUserIn);

//school related
Router.post('/add-school', auth.isAuthorizedUser, schooolController.createSchool);

//class related
Router.post('/add-school-class', auth.isAuthorizedUser, classController.createClass);
Router.get('/get-all-class', auth.isAuthorizedUser, classController.getAllClass);

//student related
Router.post('/add-school-class-student', auth.isAuthorizedUser, schoolClassController.assignStudentToClass);
Router.get('/get-all-students', auth.isAuthorizedUser, schoolClassController.findAllStudent);
Router.get('/get-student-classes', auth.isAuthorizedUser, schoolClassController.studentsOfAllClass);
Router.get('/class/students', auth.isAuthorizedUser, schoolClassController.findStudentsOfParticularClass);

module.exports = Router;