var mysql = require('mysql');

if (process.env.JAWSDB_MARIA_URL) {
  var connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);
} else {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'class_db'
  });
}
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('db connected');
});

module.exports = connection;
