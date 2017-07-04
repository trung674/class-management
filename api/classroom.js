var express = require('express');
var router = express.Router();
var connection = require('../config/database');


// API POST add class
router.post('/api/class/add', function(req, res, next) {
  var name = req.body.name;
  var department = req.body.department;
  var description = req.body.description;

  var classroom = {name: name, department: department, description: description};
  connection.query("INSERT INTO class SET ?", classroom, function(error, results, fields) {
    if (error) throw error;
    res.status(200).json({message: 'Successfully added a new class'});
  });
});

// API PUT edit class
router.put('/api/class/:id/edit', function(req, res, next) {
  var class_id = req.params.id;
  var name = req.body.name;
  var department = req.body.department;
  var description = req.body.description;

  var classroom = [name, department, description];
  connection.query('UPDATE class SET name = ?, department = ?, description = ? WHERE id="' + class_id + '"', classroom, function(error, results, fields) {
    if (error) throw error;
    res.status(200).json({message: 'Successfully edited this class data'});
  });
});

// API DELETE delete class
router.delete('/api/class/:id/delete', function(req, res, next) {
  var class_id = req.params.id;
  connection.query('DELETE FROM class WHERE id="' + class_id + '"', function(error, results, fields) {
    if (error) throw error;
    res.status(200).json({message: 'Successfully delete this class data'});
  });
});

// API GET a class
router.get('/api/class/:id', function(req, res, next) {
  var class_id = req.params.id;
  connection.query('SELECT * FROM class WHERE id="' + class_id + '"', function(error, results, fields) {
    if (error) throw error;
    if (results.length > 0) {
      connection.query('SELECT * FROM student WHERE class_id= "' + class_id + '"', function(error, results1, fields1) {
        if (error) throw error;
        var age_average = 0
        if (results1.length > 0) {
          var dob_array = results1.map(function(student) {return student.dob});
          age_average = getAverageAge(dob_array);
        }
        // res.json({title: 'Class: ' + results[0].name, classroom: results, students: results1, age_average: age_average });
        res.status(200).json({classroom: results, students: results1, number_of_student: results1.length, age_average: age_average});
      });
    } else {
      res.status(200).json({classroom: results});
    }
  });
});

// API GET all classes
router.get('/api/class', function(req, res, next) {
  connection.query('SELECT * FROM class', function(error, results, fields) {
    if (error) throw error;
    res.status(200).json({classes: results});
  });
});

function getAverageAge(dob_array) {
  var current_date = new Date();
  var current_year = current_date.getUTCFullYear();
  var ages_array = dob_array.map(function(dob) {
    var formatted_dob = new Date(dob);
    return (parseInt(current_year) - parseInt(formatted_dob.getUTCFullYear()));
  });

  var ages_sum = ages_array.reduce(function(a, b) {return a + b});
  return (Math.floor(ages_sum / ages_array.length));
}

module.exports = router;
