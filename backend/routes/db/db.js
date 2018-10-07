var mysql = require('mysql');

var con = mysql.createConnection({
    host: "45.119.147.170",
    port:"3306",
    user: "matching",
    password: "matching",
    database:"matching"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  module.exports = con;