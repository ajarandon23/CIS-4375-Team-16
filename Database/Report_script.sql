--Car List

SELECT Vehicles.VehicleRO, Vehicles.Make, Vehicles.Model, Vehicles.Color, Vehicles.CustomerLastName, DepartmentTask.DepartmentName, DepartmentTask.ExitDate, DepartmentTask.TaskTechnician
FROM Vehicles
INNER JOIN DepartmentTask ON Vehicles.VehicleRO = DepartmentTask.VehicleRO
ORDER BY Vehicles.VehicleRO;

--Filter by Departments

SELECT Vehicles.VehicleRO, Vehicles.Make, Vehicles.Model, Vehicles.Color, Vehicles.CustomerLastName, DepartmentTask.DepartmentName, DepartmentTask.ExitDate, DepartmentTask.TaskTechnician
FROM Vehicles
INNER JOIN DepartmentTask ON Vehicles.VehicleRO = DepartmentTask.VehicleRO
WHERE DepartmentTask.DepartmentName = 'Body'
ORDER BY Vehicles.VehicleRO;

SELECT Vehicles.VehicleRO, Vehicles.Make, Vehicles.Model, Vehicles.Color, Vehicles.CustomerLastName, DepartmentTask.DepartmentName, DepartmentTask.ExitDate, DepartmentTask.TaskTechnician
FROM Vehicles
INNER JOIN DepartmentTask ON Vehicles.VehicleRO = DepartmentTask.VehicleRO
WHERE DepartmentTask.DepartmentName = 'Paint'
ORDER BY Vehicles.VehicleRO;

SELECT Vehicles.VehicleRO, Vehicles.Make, Vehicles.Model, Vehicles.Color, Vehicles.CustomerLastName, DepartmentTask.DepartmentName, DepartmentTask.ExitDate, DepartmentTask.TaskTechnician
FROM Vehicles
INNER JOIN DepartmentTask ON Vehicles.VehicleRO = DepartmentTask.VehicleRO
WHERE DepartmentTask.DepartmentName = 'Detail'
ORDER BY Vehicles.VehicleRO;

SELECT Vehicles.VehicleRO, Vehicles.Make, Vehicles.Model, Vehicles.Color, Vehicles.CustomerLastName, DepartmentTask.DepartmentName, DepartmentTask.ExitDate, DepartmentTask.TaskTechnician
FROM Vehicles
INNER JOIN DepartmentTask ON Vehicles.VehicleRO = DepartmentTask.VehicleRO
WHERE DepartmentTask.DepartmentName = 'Supplement'
ORDER BY Vehicles.VehicleRO;

SELECT Vehicles.VehicleRO, Vehicles.Make, Vehicles.Model, Vehicles.Color, Vehicles.CustomerLastName, DepartmentTask.DepartmentName, DepartmentTask.ExitDate, DepartmentTask.TaskTechnician
FROM Vehicles
INNER JOIN DepartmentTask ON Vehicles.VehicleRO = DepartmentTask.VehicleRO
WHERE DepartmentTask.DepartmentName = 'Inspection'
ORDER BY Vehicles.VehicleRO;

SELECT Vehicles.VehicleRO, Vehicles.Make, Vehicles.Model, Vehicles.Color, Vehicles.CustomerLastName, DepartmentTask.DepartmentName, DepartmentTask.ExitDate, DepartmentTask.TaskTechnician
FROM Vehicles
INNER JOIN DepartmentTask ON Vehicles.VehicleRO = DepartmentTask.VehicleRO
WHERE DepartmentTask.DepartmentName = 'Delivery'
ORDER BY Vehicles.VehicleRO;

SELECT Vehicles.VehicleRO, Vehicles.Make, Vehicles.Model, Vehicles.Color, Vehicles.CustomerLastName, DepartmentTask.DepartmentName, DepartmentTask.ExitDate, DepartmentTask.TaskTechnician
FROM Vehicles
INNER JOIN DepartmentTask ON Vehicles.VehicleRO = DepartmentTask.VehicleRO
WHERE DepartmentTask.DepartmentName = 'Delivered'
ORDER BY Vehicles.VehicleRO;

--Report of all department task logs per vehicle

