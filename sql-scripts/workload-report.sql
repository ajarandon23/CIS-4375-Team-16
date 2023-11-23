SELECT 
    e.FirstName,
    e.LastName,
    e.EmployeeID,
    e.JobTitle,
    COUNT(CASE WHEN ro.RepairSize = 'Small' THEN 1 END) AS SmallJobs,
    COUNT(CASE WHEN ro.RepairSize = 'Medium' THEN 1 END) AS MediumJobs,
    COUNT(CASE WHEN ro.RepairSize = 'Large' THEN 1 END) AS LargeJobs,
    COUNT(CASE WHEN ro.RepairSize = 'X-large' THEN 1 END) AS XLargeJobs
FROM Employees e
JOIN DepartmentTask dt ON e.FirstName = dt.TaskTechnician
JOIN RepairOrder ro ON dt.VehicleRO = ro.VehicleRO
GROUP BY e.EmployeeID, e.FirstName, e.LastName, e.JobTitle;
