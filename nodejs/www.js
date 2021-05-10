var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : '2009api'
});
 
connection.connect();
 
let sql = "select * from p_goods limit 10"

connection.query(sql, function (error, results, fields) {
  console.log(error)
  console.log(results)
  
});
 
connection.end();