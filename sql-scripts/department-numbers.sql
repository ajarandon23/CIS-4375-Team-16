SELECT 
    d.DepartmentName,
    COUNT(DISTINCT v.VehicleID) AS NumberOfCars
FROM Departments d
LEFT JOIN DepartmentTask dt ON d.DepartmentName = dt.DepartmentName
LEFT JOIN Vehicles v ON dt.VehicleRO = v.VehicleRO
WHERE d.DepartmentName IN ('Body', 'Paint', 'Supplement', 'Detail', 'Delivery')
GROUP BY d.DepartmentName
ORDER BY d.DepartmentName;

