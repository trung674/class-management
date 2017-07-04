var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../config/database');

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM class', function(error, results, fields) {
    if (error) throw error;
    res.render('index', {moment:moment, title: 'Class Management', classes: results, message: req.flash('message') });
  });
});


module.exports = router;
