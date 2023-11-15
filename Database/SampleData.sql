--Insert Sample data
--Insert Customer
Insert Into Departments (DepartmentName)
Values 
('Body'),
('Paint'),
('Detail'),
('Supplement'),
('Inspection'),
('Delivery'),
('Delivered')
;

Insert Into Customers (FirstName, LastName, Phone, Email, Address, Selfpay_Insurance)
Values ('John', 'Smith', '(713) 555-1234',	'john.smith@gmail.com',	'123 Main St, Anytown, USA', 'Self-pay');

Insert Into Customers (FirstName, LastName, Phone, Email, Address, Selfpay_Insurance)
Values ('Jordan', 'Belfort', '(713) 485-4568',	'jordan.belfort@gmail.com',	'1451 Kenna Cove Ln., Spring, TX', 'Self-pay');

Insert Into Vehicles (VehicleVIN, Make, Model, Color, ModelYear, LicensePlate, VehicleRO, CustomerID)
Values ('48161545', 'Lamborghini', 'Huracan', 'Red', '2014', 'FPC-2200', '3785', '1');

Insert Into Vehicles (VehicleVIN, Make, Model, Color, ModelYear, LicensePlate, VehicleRO, CustomerID)
Values ('51793145', 'Nissan', 'GTR', 'Red', '2012', 'HZR-7000', '6434', '2');

Insert Into RepairOrder (OpenDate, EstimatedEndDate, ActualEndDate, RepairSize, CustomerID, VehicleRO)
Values ('2023-11-08', '2023-11-22', '',	'Medium', '1001', '3785');

Insert Into Employees (FirstName, LastName, JobTitle, Email, Phone, DepartmentName)
Values ('Johnathan', 'Lewis', 'Technician', 'john.lewis@gmail.com', '(713) 486-1534', 'Service');

Insert Into DepartmentTask (EnterDate, ExitDate, VehicleRO, DepartmentName, TaskTechnician)
Values ('2023-11-09', '2023-11-12',	'3785',	'Service', 'Johnathan');

Insert Into VehicleNotes (Note, VehicleRO)
Values ('Car front bumper was painted and cleared', '3785');


--Update Sample Data
-- Update Customers
UPDATE Customers
SET LastName = 'RandomLastName'
WHERE LastName = 'Belfort'; -- Replace with the actual last name to identify the record to update

-- Update Vehicles
UPDATE Vehicles
SET VehicleVIN = 'RANDVIN12345', Make = 'RandomMake', Model = 'RandomModel', Color = 'RandomColor', ModelYear = 2000, LicencePlate = 'XYZ1234', CustomerLastName = 'RandomLastName'
WHERE CustomerLastName = 'Smith'; -- Replace with the actual last name to identify the record to update

-- Update RepairOrder
UPDATE RepairOrder
SET OpenDate = '2023-10-28'
WHERE VehicleRO = '3785'; -- Replace with the actual vehicle RO to identify the record to update

-- Update Employees
UPDATE Employees
SET LastName = 'RandomLastName'
WHERE LastName = 'Lewis'; -- Replace with the actual last name to identify the record to update

-- Update DepartmentTask
UPDATE DepartmentTask
SET EnterDate = '2023-11-08'
WHERE VehicleRO = '3785' AND DepartmentName = 'Body'; -- Replace with the actual vehicle RO and Department Name to identify the record to update

-- Update VehicleNotes
UPDATE VehicleNotes
SET Note = 'Random note about the vehicle condition or service'
WHERE VehicleRO = '3785'; -- Replace with the actual vehicle RO to identify the record to update



--Delete Sample Data
-- Delete from Customers
DELETE FROM Customers
WHERE ID = 10; -- Replace 'ID' with the primary key column and '123' with the actual ID

-- Delete from Vehicles
DELETE FROM Vehicles
WHERE ID = 10; -- Replace 'ID' with the primary key column and '123' with the actual ID

-- Delete from RepairOrder
DELETE FROM RepairOrder
WHERE ID = 10; -- Replace 'ID' with the primary key column and '123' with the actual ID

-- Delete from Employees
DELETE FROM Employees
WHERE ID = 10; -- Replace 'ID' with the primary key column and '123' with the actual ID

-- Delete from DepartmentTask
DELETE FROM DepartmentTask
WHERE ID = 10; -- Replace 'ID' with the primary key column and '123' with the actual ID

-- Delete from VehicleNotes
DELETE FROM VehicleNotes
WHERE ID = 10; -- Replace 'ID' with the primary key column and '123' with the actual ID



-- ========================================================
-- ========================================================
-- ========================================================
-- ========================================================
-- ========================================================



Insert Into Customers (FirstName, LastName, Phone, Email, Address, Selfpay_Insurance)
Values ('Jordan', 'Belfort', '(713) 485-4568',	'jordan.belfort@gmail.com',	'1451 Kenna Cove Ln., Spring, TX', 'Self-pay');

-- Insert Vehicle
Insert Into Vehicles (VehicleVIN, Make, Model, Color, ModelYear, LicensePlate, VehicleRO, CustomerLastName)
Values ('48161545', 'Ford', 'Mustang', 'Red', '2012', 'FPC-2200', '3785', 'Belfort');

-- Insert RepairOrder
Insert Into RepairOrder (OpenDate, EstimatedEndDate, ActualEndDate, RepairSize, CustomerLastName, VehicleRO)
Values ('2023-11-08', '2023-11-22', '2023-11-21',	'Medium', 'Belfort', '3785');


Insert Into Departments (DepartmentName)
Values ('Body');
Insert Into Departments (DepartmentName)
Values ('Detail');
Insert Into Departments (DepartmentName)
Values ('Paint');
Insert Into Departments (DepartmentName)
Values ('Service');


-- Insert Employee
Insert Into Employees (FirstName, LastName, JobTitle, Email, Phone, DepartmentName)
Values ('Johnathan', 'Lewis', 'Technician', 'john.lewis@gmail.com', '(713) 486-1534', 'Service');

Insert Into Employees (FirstName, LastName, JobTitle, Email, Phone, DepartmentName)
Values ('Will', 'Smith', 'Painter', 'willsmith@gmail.com', '(713) 123-1111', 'Paint');


Insert Into Employees (FirstName, LastName, JobTitle, Email, Phone, DepartmentName)
Values ('John', 'Clark', 'Technician', 'willsmith@gmail.com', '(713) 123-1111', 'Body');

Insert Into Employees (FirstName, LastName, JobTitle, Email, Phone, DepartmentName)
Values ('William', 'Watson', 'Technician', 'willsmith@gmail.com', '(713) 123-1111', 'Detail');



-- Insert DepartmentTask
Insert Into DepartmentTask (EnterDate, ExitDate, VehicleRO, DepartmentName, TaskTechnician)
Values ('2023-11-09', '2023-11-12',	'3785','Service', 'Johnathan');

-- Insert VehicleNote
Insert Into VehicleNotes (Note, VehicleRO)
Values ('Car front bumper was painted and cleared', '3785');




select * from customers;
select * from  Vehicles;
select * from  RepairOrder;
select * from  Employees;
select * from  DepartmentTask;
select * from  VehicleNotes;
select * from  Departments;

