CREATE DATABASE ProjectTeam16V3;
USE ProjectTeam16V3;

SELECT * FROM Customers, Vehicles, RepairOrder, Departments, Employees, DepartmentTask, DepartmentTaskLogs, VehicleNotes;
DROP table Customers, Vehicles, RepairOrder, Departments, Employees, DepartmentTask, DepartmentTaskLogs, VehicleNotes;
delete from Customers;


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
   CustomerID int ,
   VehicleRO int ,
   DepartmentName varchar(100) ,
   TaskTechnician varchar(100) ,
   FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID),
   FOREIGN KEY (VehicleRO) REFERENCES Vehicles (VehicleRO),
   FOREIGN KEY (DepartmentName) REFERENCES Employees (DepartmentName),
   FOREIGN KEY (TaskTechnician) REFERENCES Employees (FirstName)
);

CREATE TABLE DepartmentTaskLogs (
   DepartmentTaskLogID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   MoveDate date NOT NULL,
   VehicleRO int ,
   FromDepartmentID int ,
   ToDepartmentID int ,
   FOREIGN KEY (VehicleRO) REFERENCES Vehicles (VehicleRO),
   FOREIGN KEY (FromDepartmentID) REFERENCES Departments (DepartmentID),
   FOREIGN KEY (ToDepartmentID) REFERENCES Departments (DepartmentID)
);

CREATE TABLE VehicleNotes (
   VehicleNoteID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   Note varchar(100) NOT NULL ,
   VehicleRO int ,
   FOREIGN KEY (VehicleRO) REFERENCES Vehicles (VehicleRO) 
);
CREATE TABLE Notes (
   NoteID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   Note varchar(200) NOT NULL,
   NoteDate date NOT NULL,
   CustomerID int,
   VehicleRO int,
   FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID),
   FOREIGN KEY (VehicleRO) REFERENCES Vehicles (VehicleRO)
);