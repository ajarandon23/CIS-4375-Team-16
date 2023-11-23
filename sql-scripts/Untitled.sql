SELECT 
    dtl.VehicleRO,
    v.Make,
    v.Model,
    MAX(dtl.MoveDate) AS LastMoveDate,
    DATEDIFF(CURDATE(), MAX(dtl.MoveDate)) AS DaysSinceLastMove
FROM DepartmentTaskLogs dtl
JOIN Vehicles v ON dtl.VehicleRO = v.VehicleRO
GROUP BY dtl.VehicleRO, v.Make, v.Model
HAVING MAX(dtl.MoveDate) <= DATE_SUB(CURDATE(), INTERVAL 5 DAY);
SELECT * FROM ProjectTeam16V3.DepartmentTaskLogs;