SELECT 
    v.VehicleRO,
    v.Make,
    v.Model,
    d.DepartmentName,
    CONCAT(e.FirstName, ' ', e.LastName) AS Technician,
    MAX(dtl.MoveDate) AS LastMoveDate
FROM DepartmentTaskLogs dtl
JOIN Vehicles v ON dtl.VehicleRO = v.VehicleRO
JOIN DepartmentTask dt ON dtl.VehicleRO = dt.VehicleRO
JOIN Departments d ON dt.DepartmentName = d.DepartmentName
JOIN Employees e ON dt.TaskTechnician = e.FirstName
GROUP BY v.VehicleRO, v.Make, v.Model, d.DepartmentName, Technician
HAVING MAX(dtl.MoveDate) <= DATE_SUB(CURDATE(), INTERVAL 5 DAY);
