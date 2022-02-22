const mysql = require("mysql");

//creating database connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Admin#mysql",
  database: "shopping",
});

connection.connect(function (err) {
  if (err) throw console.log("error = ", err);
  console.log("Connected!");
});

module.exports = connection;
