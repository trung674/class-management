var express = require('express');
var router = express.Router();
var connection = require('../config/database');

// API POST add student
router.post('/api/student/add', function(req, res, next) {
  var name = req.body.name;
  var dob = req.body.date_of_birth;
  var nationality = req.body.nationality;
  var class_id = req.body.class_id;
  var year_of_study = req.body.year_of_study;

  var student = {name: name, class_id: class_id, nationality: nationality, dob: dob, year_of_study: year_of_study};
  connection.query("INSERT INTO student SET ?", student, function(error, results, fields) {
    if (error) throw error;
    res.status(200).json({message: 'Successfully added a new student.'});
  });
});

// API PUT edit student
router.put('/api/student/:id/edit', function(req, res, next) {
  var student_id = req.params.id;
  var name = req.body.name;
  var dob = req.body.date_of_birth;
  var nationality = req.body.nationality;
  var class_id = req.body.class_id;
  var year_of_study = req.body.year_of_study;

  var student = [name, class_id, nationality, dob, year_of_study];
  connection.query('UPDATE student SET name = ?, class_id = ?, nationality = ?, dob = ?, year_of_study = ? WHERE id="' + student_id + '"', student, function(error, results, fields) {
    if (error) throw error;
    res.status(200).json({message: 'Successfully edited this student data.'});
  });
});

// API PUT move student
router.put('/api/student/:student_id/:class_id/move', function(req, res, next) {
  var student_id = req.params.student_id;
  var class_id = req.params.class_id;
  connection.query('UPDATE student SET class_id = ? WHERE id="' + student_id + '"', class_id, function(error, results, fields) {
    if (error) throw error;
    res.status(200).json({message: 'Successfully move this student to class ' + class_id});
  });
});

// API DELETE delete student
router.delete('/api/student/:id/delete', function(req, res, next) {
  var student_id = req.params.id;
  connection.query('DELETE FROM student WHERE id="' + student_id + '"', function(error, results, fields) {
    if (error) throw error;
    res.status(200).json({message: 'Successfully delete this student data.'});
  });
});

// API GET student
router.get('/api/student/:id', function(req, res, next) {
  var student_id = req.params.id;
  connection.query('SELECT * FROM student WHERE id="' + student_id + '"', function(error, results, fields) {
    if (error) throw error;

    if (results.length > 0) {
      res.status(200).json({student: results});
    } else {
      res.status(200).json({message: 'Student data not found.'});
    }
  });
});

module.exports = router;
