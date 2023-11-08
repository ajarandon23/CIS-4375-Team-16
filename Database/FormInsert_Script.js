//Node.js script for insert
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "projectteam16database.cryr44bo2odx.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "Cougarnet2023",
  database: "ProjectTeam16V3"
});


// Assuming the variables come from form inputs
var CformInputFirstName = req.body.Firstname; // Replace 'req.body.name' with your actual form input for name
var CformInputLastName = req.body.Lastname; // Replace 'req.body.address' with your actual form input for address
var CformInputPhone = req.body.Phone;
var CformInputEmail = req.body.Email;
var CformInputAddress = req.body.Address;
var CformInputInsurance = req.body.Insurance;

con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO Customers (FirstName, LastName, Phone, Email, Address, Selfpay_Insurance) VALUES (?, ?, ?, ?, ?, ?)";
  con.query(sql, [CformInputFirstName, CformInputLastName, CformInputPhone, CformInputEmail, CformInputAddress, CformInputInsurance], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });
});


// Assuming the variables come from form inputs
var VformInputFirstName = req.body.Firstname; // Replace 'req.body.name' with your actual form input for name
var VformInputLastName = req.body.Lastname; // Replace 'req.body.address' with your actual form input for address
var VformInputPhone = req.body.Phone;
var VformInputEmail = req.body.Email;
var VformInputAddress = req.body.Address;
var VformInputInsurance = req.body.Insurance;

con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO Customers (FirstName, LastName, Phone, Email, Address, Selfpay_Insurance) VALUES (?, ?, ?, ?, ?, ?)";
  con.query(sql, [CformInputFirstName, CformInputLastName, CformInputPhone, CformInputEmail, CformInputAddress, CformInputInsurance], function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });
});



















con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO Customers (FirstName, LastName, Phone, Email, Address, Selfpay_Insurance) VALUES ('Jordan', 'Belfort', '(713) 485-4568',	'jordan.belfort@gmail.com',	'1451 Kenna Cove Ln., Spring, TX', 'Self');
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO Vehicles (VehicleVIN, Make, Model, Color, ModelYear, LicencePlate, VehicleRO, CustomerLastName) VALUES ('48161545', 'Ford', 'Mustang', 'Red', '2012', 'FPC-2200', '3785', 'Smith');
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO RepairOrder (OpenDate, EstimatedEndDate, ActualEndDate, RepairSize, CustomerLastName, VehicleRO) VALUES ('2023-11-08', '2023-11-22', '',	'Medium', 'Belfort', '3785');
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO Employees (FirstName, LastName, JobTitle, Email, Phone, DepartmentName) VALUES ('Johnathan', 'Lewis', 'Technician', 'john.lewis@gmail.com', '(713) 486-1534', 'Service');
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO DepartmentTask (EnterDate, ExitDate, VehicleRO, DepartmentName, TaskTechnician) VALUES ('2023-11-09', '2023-11-12',	'3785',	'Body', 'Lewis');
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "INSERT INTO VehicleNotes (Note, VehicleRO) VALUES ('Car front bumper was painted and cleared', '3785');
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });
});
