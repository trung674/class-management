var express = require('express');
var router = express.Router();
var connection = require('../config/database');
var Classroom = require('../routes/api_classroom');
// // API GET all classes
// router.get('/api/v1/classes', function(req, res, next) {
//   connection.query('SELECT * FROM class', function(error, results, fields) {
//     if (error) throw error;
//     res.status(200).json({status: 'success', classes: results});
//   });
// });
//
// // API POST add class
// router.post('/api/v1/classes', function(req, res, next) {
//   var name = req.body.name;
//   var department = req.body.department;
//   var description = req.body.description;
//
//   var classroom = {name: name, department: department, description: description};
//   connection.query("INSERT INTO class SET ?", classroom, function(error, results, fields) {
//     if (error) throw error;
//     res.status(200).json({message: 'Successfully added a new class'});
//   });
// });
//
// // API PUT edit class
// router.put('/api/v1/classes/:id', function(req, res, next) {
//   var class_id = req.params.id;
//   var name = req.body.name;
//   var department = req.body.department;
//   var description = req.body.description;
//
//   console.log(validateInput(name));
//   console.log(validateInput(department));
//   console.log(validateInput(description));
//   // var classroom = [name, department, description];
//   // connection.query('UPDATE class SET name = ?, department = ?, description = ? WHERE id="' + class_id + '"', classroom, function(error, results, fields) {
//   //   if (error) throw error;
//   //   res.status(200).json({message: 'Successfully edited this class data'});
//   // });
// });
//
// // API DELETE delete class
// router.delete('/api/v1/classes/:id', function(req, res, next) {
//   var class_id = req.params.id;
//   connection.query('DELETE FROM class WHERE id="' + class_id + '"', function(error, results, fields) {
//     if (error) throw error;
//     res.status(200).json({message: 'Successfully delete this class data'});
//   });
// });
//
// // API GET a class
// router.get('/api/v1/classes/:id', function(req, res, next) {
//   var class_id = req.params.id;
//   connection.query('SELECT * FROM class WHERE id="' + class_id + '"', function(error, results, fields) {
//     if (error) throw error;
//     if (results.length > 0) {
//       connection.query('SELECT * FROM student WHERE class_id= "' + class_id + '"', function(error, results1, fields1) {
//         if (error) throw error;
//         var age_average = 0
//         if (results1.length > 0) {
//           var dob_array = results1.map(function(student) {return student.dob});
//           age_average = getAverageAge(dob_array);
//         }
//         // res.json({title: 'Class: ' + results[0].name, classroom: results, students: results1, age_average: age_average });
//         res.status(200).json({classroom: results[0], students: results1, number_of_student: results1.length, age_average: age_average});
//       });
//     } else {
//       res.status(200).json({classroom: results});
//     }
//   });
// });

router.get('/api/v1/classes/:id/basic', Classroom.viewBasicModel);
router.get('/api/v1/classes/:id', Classroom.viewMainModel);
router.post('/api/v1/classes', Classroom.createRequestModel)
router.put('/api/v1/classes/:id', Classroom.updateRequestModel);
router.delete('/api/v1/classes/:id', Classroom.deleteResponseModel);

module.exports = router;
