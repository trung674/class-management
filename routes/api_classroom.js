var connection = require('../config/database');

exports.createRequestModel = function(req, res, next) {
  // Get payload info
  var name = req.body.name;
  var department = req.body.department;
  var description = req.body.description;

  // Check empty string or whitespace
  if (!validateInput(name) || !validateInput(department) || !validateInput(description)) {
    res.status(400).json({status: "400", message: 'Empty input is not allowed.' });
  } else {
    var classroom = {name: name, department: department, description: description};
    connection.query("INSERT INTO class SET ?", classroom, function(error, results, fields) {
      if (error) throw error;
      res.status(200).json({message: 'Successfully added a new class'});
    });
  }
}

exports.updateRequestModel = function(req, res, next) {
  // Get requested classroom id
  var class_id = req.params.id;

  // Get payload info
  var name = req.body.name;
  var department = req.body.department;
  var description = req.body.description;
  var classroom = [name, department, description];

  connection.query('UPDATE class SET name = ?, department = ?, description = ? WHERE id="' + class_id + '"', classroom, function(error, results, fields) {
    if (error) throw error;
    res.status(200).json({message: 'Successfully edited this class data'});
  });
}

exports.deleteResponseModel = function(req, res, next) {
  // Get requested classroom id
  var class_id = req.params.id;

  connection.query('DELETE FROM class WHERE id="' + class_id + '"', function(error, results, fields) {
    if (error) throw error;
    res.status(200).json({message: 'Successfully delete this class data'});
  });
}

exports.viewBasicModel = function(req, res, next) {
  // Get requested classroom id
  var class_id = req.params.id;
  connection.query('SELECT id, name FROM class WHERE id="' + class_id + '"', function(error, results, fields) {
    if (error) throw error;
    if (results.length !== 0) {
      res.status(200).json({classroom: results[0]});
    } else {
      res.status(404).json({status: "404", message: "Class not found"});
    }
  });
}

exports.viewMainModel = function(req, res, next) {
  // Get requested classroom id
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
        res.status(200).json({classroom: results[0], students: results1, number_of_student: results1.length, age_average: age_average});
      });
    } else {
      res.status(404).json({status: "404", message: "Class not found"});
    }
  });
}

function validateInput(str) {
  // Check undefined or empty string or whitespace
  if (str === undefined || !str.trim()) {
    return false;
  }
  return true;
}

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
