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
   Index (LastName)
);

CREATE TABLE Vehicles (
   VehicleID int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
   VehicleVIN varchar(8) NOT NULL ,
   Make varchar(100) NOT NULL ,
   Model varchar(100) NOT NULL ,
   Color varchar(100) NOT NULL ,
   ModelYear year ,
   LicencePlate varchar(10) ,
   VehicleRO int ,
   CustomerLastName varchar(100) ,
   FOREIGN KEY (CustomerLastName) REFERENCES Customers (LastName) ,
   Index (VehicleRO)
);

CREATE TABLE RepairOrder (
   RepairOrderID int NOT NULL AUTO_INCREMENT PRIMARY KEY ,
   OpenDate date NOT NULL ,
   EstimatedEndDate date NOT NULL ,
   ActualEndDate date ,
   RepairSize ENUM('Small', 'Medium', 'Large', 'X-large') NOT NULL ,
   CustomerLastName varchar(100) ,
   VehicleRO int ,
   FOREIGN KEY (CustomerLastName) REFERENCES Customers (LastName) ,
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
   Index (FirstName)
);

CREATE TABLE DepartmentTask (
   DepartmentTaskID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   EnterDate date NOT NULL,
   ExitDate date ,
   VehicleRO int ,
   DepartmentName varchar(100) ,
   TaskTechnician varchar(100) ,
   FOREIGN KEY (VehicleRO) REFERENCES Vehicles (VehicleRO),
   FOREIGN KEY (DepartmentName) REFERENCES Departments (DepartmentName),
   FOREIGN KEY (TaskTechnician) REFERENCES Employees (FirstName)
);

CREATE TABLE VehicleNotes (
   VehicleNoteID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
   Note varchar(100) NOT NULL ,
   VehicleRO int ,
   FOREIGN KEY (VehicleRO) REFERENCES Vehicles (VehicleRO) 
);
