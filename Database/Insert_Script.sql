//Create sample data
Insert Into Customers (FirstName, LastName, Phone, Email, Address, Selfpay_Insurance)
Values ('Jordan', 'Belfort', '(713) 485-4568',	'jordan.belfort@gmail.com',	'1451 Kenna Cove Ln., Spring, TX', 'Self');

Insert Into Vehicles (VehicleVIN, Make, Model, Color, ModelYear, LicencePlate, VehicleRO, CustomerLastName)
Values ('48161545', 'Ford', 'Mustang', 'Red', '2012', 'FPC-2200', '3785', 'Smith');

Insert Into RepairOrder (OpenDate, EstimatedEndDate, ActualEndDate, RepairSize, CustomerLastName, VehicleRO)
Values ('2023-11-08', '2023-11-22', '',	'Medium', 'Belfort', '3785');

Insert Into Employees (FirstName, LastName, JobTitle, Email, Phone, DepartmentName)
Values ('Johnathan', 'Lewis', 'Technician', 'john.lewis@gmail.com', '(713) 486-1534', 'Service');

Insert Into DepartmentTask (EnterDate, ExitDate, VehicleRO, DepartmentName, TaskTechnician)
Values ('2023-11-09', '2023-11-12',	'3785',	'Body', 'Lewis');

Insert Into VehicleNotes (Note, VehicleRO)
Values ('Car front bumper was painted and cleared', '3785');

