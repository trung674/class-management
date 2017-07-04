var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../config/database');

// GET add student
router.get('/student/add', function(req, res, next) {
  connection.query('SELECT id FROM class', function(error, results, fields) {
    res.render('student/add', {title: 'Add new student', classes: results});
  });
});

// POST add student
router.post('/student/add', function(req, res, next) {
  var name = req.body.name;
  var dob = req.body.date_of_birth;
  var nationality = req.body.nationality;
  var class_id = req.body.class_id;
  var year_of_study = req.body.year_of_study;


  var student = {name: name, class_id: class_id, nationality: nationality, dob: dob, year_of_study: year_of_study};
  connection.query("INSERT INTO student SET ?", student, function(error, results, fields) {
    if (error) throw error;
    req.flash('message', 'Successfully added a new student');
    res.redirect('/');
  });
});

// GET edit student
router.get('/student/:id/edit', function(req, res, next) {
  var student_id = req.params.id;
  connection.query('SELECT * FROM student WHERE id="' + student_id + '"', function(error, results, fields) {
    if (error) throw error;
    connection.query('SELECT id FROM class', function(error, results1, fields1) {
      if (error) throw error;
      res.render('student/edit', {moment:moment, title:'Edit student', student: results, classes: results1});
    });
  });
});

// POST edit student
router.post('/student/:id/edit', function(req, res, next) {
  var student_id = req.params.id;
  var name = req.body.name;
  var dob = req.body.date_of_birth;
  var nationality = req.body.nationality;
  var class_id = req.body.class_id;
  var year_of_study = req.body.year_of_study;


  var student = [name, class_id, nationality, dob, year_of_study];
  connection.query('UPDATE student SET name = ?, class_id = ?, nationality = ?, dob = ?, year_of_study = ? WHERE id="' + student_id + '"', student, function(error, results, fields) {
    if (error) throw error;
    req.flash('message', 'Successfully update the data of student #' + student_id);
    res.redirect('/');
  });
});

// GET delete student
router.get('/student/:id/delete', function(req, res, next) {
  var student_id = req.params.id;
  connection.query('DELETE FROM student WHERE id="' + student_id + '"', function(error, results, fields) {
    if (error) throw error;
    req.flash('message', 'Successfully delete data of the student with id: ' + student_id);
    res.redirect('/');
  });
});


// GET student
// router.get('/student/:id', function(req, res, next) {
//   var student_id = req.params.id;
//   connection.query('SELECT * FROM student WHERE id="' + student_id + '"', function(error, results, fields) {
//     if (error) throw error;
//     res.render('student/index', {title: 'Class Management - Student Profile'}, student: results);
//   });
// });

module.exports = router;
