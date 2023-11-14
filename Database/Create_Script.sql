CREATE DATABASE ProjectTeam16V3;
USE ProjectTeam16V3;


CREATE TABLE Customers (
   CustomerID int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
   FirstName varchar(100) NOT NULL ,
   LastName varchar(100) NOT NULL ,
   Phone varchar(15) NOT NULL ,
   Email varchar(100) NOT NULL ,
   Address varchar(255) NOT NULL ,
   Selfpay_Insurance ENUM('Self-pay', 'Insurance') NOT NULL ,
   INDEX (CustomerID)
);

CREATE TABLE Vehicles (
   VehicleID int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
   VehicleVIN varchar(8) NOT NULL ,
   Make varchar(100) NOT NULL ,
   Model varchar(100) NOT NULL ,
   Color varchar(100) NOT NULL ,
   ModelYear year ,
   LicensePlate varchar(10) ,
   VehicleRO int ,
   CustomerID int ,
   FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID) ,
   Index (VehicleRO)
);

CREATE TABLE RepairOrder (
   RepairOrderID int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
   OpenDate date NOT NULL ,
   EstimatedEndDate date NOT NULL ,
   ActualEndDate date ,
   RepairSize ENUM('Small', 'Medium', 'Large', 'X-large') NOT NULL ,
   CustomerID int ,
   VehicleRO int ,
   FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID) ,
   FOREIGN KEY (VehicleRO) REFERENCES Vehicles (VehicleRO) 
);

CREATE TABLE Departments (
   DepartmentID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   DepartmentName varchar(100) NOT NULL,
   Index (DepartmentName)
);

CREATE TABLE Employees (
   EmployeeID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   FirstName varchar(100) NOT NULL ,
   LastName varchar(100) NOT NULL ,
   JobTitle varchar(100) NOT NULL ,
   Email varchar(100) NOT NULL ,
   Phone varchar(15) NOT NULL ,
   DepartmentName varchar(100) ,
   FOREIGN KEY (DepartmentName) REFERENCES Departments (DepartmentName),
   Index (FirstName),
   Index (DepartmentName)
);

CREATE TABLE DepartmentTask (
   DepartmentTaskID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   EnterDate date NOT NULL,
   ExitDate date ,
   VehicleRO int ,
   DepartmentName varchar(100) ,
   TaskTechnician varchar(100) ,
   FOREIGN KEY (VehicleRO) REFERENCES Vehicles (VehicleRO),
   FOREIGN KEY (DepartmentName) REFERENCES Employees (DepartmentName),
   FOREIGN KEY (TaskTechnician) REFERENCES Employees (FirstName)
);

CREATE TABLE VehicleNotes (
   VehicleNoteID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   Note varchar(100) NOT NULL ,
   VehicleRO int ,
   FOREIGN KEY (VehicleRO) REFERENCES Vehicles (VehicleRO) 
);


ALTER TABLE Customers AUTO_INCREMENT=1001; 

Insert Into Departments (DepartmentName)
Values 
('Body'),
('Paint'),
('Service'),
('Detail'),
('Inspection');

Insert Into Customers (FirstName, LastName, Phone, Email, Address, Selfpay_Insurance)
Values ('John', 'Smith', '(713) 555-1234', 'john.smith@gmail.com', '123 Main St, Anytown, USA', 'Self-pay');

Insert Into Customers (FirstName, LastName, Phone, Email, Address, Selfpay_Insurance)
Values ('Jordan', 'Belfort', '(713) 485-4568',	'jordan.belfort@gmail.com',	'1451 Kenna Cove Ln., Spring, TX', 'Self-pay');

Insert Into Vehicles (VehicleVIN, Make, Model, Color, ModelYear, LicensePlate, VehicleRO, CustomerID)
Values ('48161545', 'Ford', 'Mustang', 'Red', '2012', 'FPC-2200', '3785', '1001');

Insert Into RepairOrder (OpenDate, EstimatedEndDate, ActualEndDate, RepairSize, CustomerID, VehicleRO)
Values ('2023-11-08', '2023-11-22', '',	'Medium', '1001', '3785');

Insert Into Employees (FirstName, LastName, JobTitle, Email, Phone, DepartmentName)
Values ('Johnathan', 'Lewis', 'Technician', 'john.lewis@gmail.com', '(713) 486-1534', 'Service');

Insert Into DepartmentTask (EnterDate, ExitDate, VehicleRO, DepartmentName, TaskTechnician)
Values ('2023-11-09', '2023-11-12',	'3785',	'Service', 'Johnathan');

Insert Into VehicleNotes (Note, VehicleRO)
Values ('Car front bumper was painted and cleared', '3785');


SELECT Vehicles.VehicleRO, Vehicles.Make, Vehicles.Model, Vehicles.Color, Vehicles.CustomerLastName, DepartmentTask.DepartmentName, DepartmentTask.ExitDate, DepartmentTask.TaskTechnician
FROM Vehicles
INNER JOIN DepartmentTask ON Vehicles.VehicleRO = DepartmentTask.VehicleRO
ORDER BY Vehicles.VehicleRO;
