const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;
const cors = require('cors');
// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: 'projectteam16database.cryr44bo2odx.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Cougarnet2023',
  database: 'ProjectTeam16V3',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// API Routes
app.get('/api/customers', (req, res) => {
  // Implement logic to retrieve customers from the database
  db.query('SELECT * FROM Customers', (err, results) => {
    if (err) {
      console.error('Error fetching customers:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Fetch all departments
app.get('/api/departments', (req, res) => {
  db.query('SELECT DepartmentName FROM Departments', (err, results) => {
    if (err) {
      console.error('Error fetching departments:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results.map((row) => row.DepartmentName));
    }
  });
});

// Fetch employees in a specific department
app.get('/api/employees/:department', (req, res) => {
  const department = req.params.department;
  db.query(
    'SELECT FirstName FROM Employees WHERE DepartmentName = ?',
    [department],
    (err, results) => {
      if (err) {
        console.error('Error fetching employees:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(results.map((row) => row.FirstName));
      }
    }
  );
});

app.post('/api/customers', (req, res) => {
  const { FirstName, LastName, Phone, Email, Address, Selfpay_Insurance } =
    req.body;
  const sql =
    'INSERT INTO Customers (FirstName, LastName, Phone, Email, Address, Selfpay_Insurance) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(
    sql,
    [FirstName, LastName, Phone, Email, Address, Selfpay_Insurance],
    (err, result) => {
      if (err) {
        console.error('Error adding customer:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json({
          id: result.insertId,
          message: 'Customer added successfully',
        });
      }
    }
  );
});


app.post('/api/vehicles', (req, res) => {
  const {
    LicensePlate,
    VehicleVIN,
    Make,
    Model,
    Color,
    ModelYear,
    OpenDate,
    EstimatedEndDate,
    RepairSize,
    TaskTechnician,
    DepartmentName,
    VehicleRO,
    CustomerID,
  } = req.body;

  const sql =
    'INSERT INTO Vehicles (VehicleVIN, Make, Model, LicensePlate, Color, ModelYear, VehicleRO, CustomerID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(
    sql,
    [
      VehicleVIN,
      Make,
      Model,
      LicensePlate,
      Color,
      ModelYear,
      VehicleRO,
      CustomerID,
    ],
    (err, vehicleResult) => {
      if (err) {
        console.error('Error adding vehicle:', err);
        res.status(500).send('Internal Server Error');
      } else {
        const sqlQueryForRepairOrder =
          'INSERT INTO RepairOrder (OpenDate, EstimatedEndDate, RepairSize, CustomerID, VehicleRO) VALUES (?, ?, ?, ?, ?)';

        db.query(
          sqlQueryForRepairOrder,
          [OpenDate, EstimatedEndDate, RepairSize, CustomerID, VehicleRO],
          (err, repairOrderResult) => {
            if (err) {
              console.error('Error adding repair order:', err);
              res.status(500).send('Internal Server Error');
            } else {
              const sqlQueryForDepartmentTask =
                'INSERT INTO DepartmentTask (EnterDate, VehicleRO, DepartmentName, TaskTechnician, CustomerID) VALUES (?, ?, ?, ?, ?)';

              db.query(
                sqlQueryForDepartmentTask,
                [OpenDate, VehicleRO, DepartmentName, TaskTechnician, CustomerID],
                (err, departmentTaskResult) => {
                  if (err) {
                    console.error('Error adding department task:', err);
                    res.status(500).send('Internal Server Error');
                  } else {
                    // Insert into DepartmentTaskLogs with ToDepartmentID and leave FromDepartmentID as NULL
                    const insertDepartmentTaskLogSql =
                      'INSERT INTO DepartmentTaskLogs (MoveDate, VehicleRO, ToDepartmentID) VALUES (CURDATE(), ?, (SELECT DepartmentID FROM Departments WHERE DepartmentName = ?))';

                    db.query(
                      insertDepartmentTaskLogSql,
                      [VehicleRO, DepartmentName],
                      (err, departmentTaskLogResult) => {
                        if (err) {
                          console.error('Error inserting into DepartmentTaskLogs:', err);
                          res.status(500).send('Internal Server Error');
                        } else {
                          res.json({
                            id: vehicleResult.insertId,
                            message: 'Vehicle added successfully 🚀',
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});



app.delete('/api/vehicles/:vehicleRO', (req, res) => {
  const vehicleRO = req.params.vehicleRO;

  const deleteRepairOrderSql = 'DELETE FROM RepairOrder WHERE VehicleRO = ?';
  db.query(deleteRepairOrderSql, [vehicleRO], (err, result) => {
    if (err) {
      console.error('Error deleting repair order:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const deleteVehicleSql = 'DELETE FROM Vehicles WHERE VehicleRO = ?';
      db.query(deleteVehicleSql, [vehicleRO], (err, result) => {
        if (err) {
          console.error('Error deleting vehicle:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.json({
            message: 'Vehicle deleted successfully',
          });
        }
      });
    }
  });
});

app.get('/api/management', (req, res) => {
  const sql = `
      SELECT 
      v.VehicleRO,
      v.Make,
      v.Model,
      v.Color,
      d.DepartmentName,
      ro.RepairSize,
      c.CustomerID,
      c.LastName,
      CONCAT(e.FirstName, ' ', e.LastName) AS Technician
    FROM Vehicles v
    JOIN RepairOrder ro ON v.VehicleRO = ro.VehicleRO
    JOIN Customers c ON v.CustomerID = c.CustomerID
    JOIN DepartmentTask dt ON v.VehicleRO = dt.VehicleRO
    JOIN Departments d ON dt.DepartmentName = d.DepartmentName
    JOIN Employees e ON dt.TaskTechnician = e.FirstName;


`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching management records:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Add this route to your server.js or your routes file
app.get('/api/vehicles/:vehicleRO', (req, res) => {
  const vehicleRO = req.params.vehicleRO;

  const sql =
    'SELECT v.*, ro.OpenDate, ro.EstimatedEndDate, ro.RepairSize, dt.EnterDate AS DepartmentEnterDate, dt.ExitDate AS DepartmentExitDate, dt.DepartmentName, dt.TaskTechnician, vn.Note AS Note ' +
    'FROM Vehicles v ' +
    'LEFT JOIN RepairOrder ro ON v.VehicleRO = ro.VehicleRO ' +
    'LEFT JOIN DepartmentTask dt ON v.VehicleRO = dt.VehicleRO ' +
    'LEFT JOIN VehicleNotes vn ON v.VehicleRO = vn.VehicleRO ' +
    'WHERE v.VehicleRO = ?';

  db.query(sql, [vehicleRO], (err, result) => {
    if (err) {
      console.error('Error fetching vehicle details:', err);
      res.status(500).send('Internal Server Error');
    } else {
      if (result.length === 0) {
        // Vehicle not found
        res.status(404).send('Vehicle not found');
      } else {
        // Vehicle found, send the details
        res.json(result[0]);
      }
    }
  });
});

app.get('/api/customers/search', async (req, res) => {
    const lastName = req.query.lastName;
    // Add database query to find customers by lastName
    // Use parameterized queries to prevent SQL injection
    // Send back the customer data
  });

// app.put('/api/vehicles/:vehicleRO', (req, res) => {
//   const vehicleRO = req.params.vehicleRO;
//   const {
//     Make,
//     ModelYear,
//     Color,
//     DepartmentName,
//     duration,
//     TaskTechnician,
//     RepairSize,
//     Note,
//     CustomerID,
//   } = req.body;

  
  

//   const updateVehicleSql =
//     'UPDATE Vehicles SET Make=?, ModelYear=?, Color=? WHERE VehicleRO=?';

//   db.query(
//     updateVehicleSql,
//     [Make, ModelYear, Color, vehicleRO],
//     (err, result) => {
//       if (err) {
//         console.error('Error updating vehicle:', err);
//         res.status(500).send('Internal Server Error');
//       } else {
//         const updateRepairOrderSql =
//           'UPDATE RepairOrder SET RepairSize=? WHERE VehicleRO=?';

//         db.query(
//           updateRepairOrderSql,
//           [RepairSize, vehicleRO],
//           (err, result) => {
//             if (err) {
//               console.error('Error updating repair order:', err);
//               res.status(500).send('Internal Server Error');
//             } else {
//               const updateDepartmentTaskSql =
//                 'UPDATE DepartmentTask SET EnterDate=?, DepartmentName=?, TaskTechnician=?, CustomerID=? WHERE VehicleRO=?';

//               db.query(
//                 updateDepartmentTaskSql,
//                 [new Date(), DepartmentName, TaskTechnician, vehicleRO, CustomerID],
//                 (err, result) => {
//                   if (err) {
//                     console.error('Error updating department task:', err);
//                     res.status(500).send('Internal Server Error');
//                   } else {
//                     if (Note) {
//                       // Check if the note already exists
//                       const checkNoteSql =
//                         'SELECT * FROM VehicleNotes WHERE VehicleRO=?';

//                       db.query(checkNoteSql, [vehicleRO], (err, results) => {
//                         if (err) {
//                           console.error('Error checking note:', err);
//                           res.status(500).send('Internal Server Error');
//                         } else {
//                           if (results.length > 0) {
//                             // Update existing note
//                             const updateNoteSql =
//                               'UPDATE VehicleNotes SET Note=? WHERE VehicleRO=?';

//                             db.query(
//                               updateNoteSql,
//                               [Note, vehicleRO],
//                               (err, result) => {
//                                 if (err) {
//                                   console.error('Error updating note:', err);
//                                   res.status(500).send('Internal Server Error');
//                                 } else {
//                                   res.json({
//                                     message:
//                                       'Vehicle and note updated successfully 🚀',
//                                   });
//                                 }
//                               }
//                             );
//                           } else {
//                             // Insert new note
//                             const insertNoteSql =
//                               'INSERT INTO VehicleNotes (Note, VehicleRO) VALUES (?, ?)';

//                             db.query(
//                               insertNoteSql,
//                               [Note, vehicleRO],
//                               (err, result) => {
//                                 if (err) {
//                                   console.error('Error adding note:', err);
//                                   res.status(500).send('Internal Server Error');
//                                 } else {
//                                   res.json({
//                                     message:
//                                       'Vehicle and note added successfully 🚀',
//                                   });
//                                 }
//                               }
//                             );
//                           }
//                         }
//                       });
//                     } else {
//                       res.json({
//                         message: 'Vehicle updated successfully 🚀',
//                       });
//                     }
//                   }
//                 }
//               );
//             }
//           }
//         );
//       }
//     }
//   );
// });

// Function to generate a unique identifier for VehicleRO
app.put('/api/vehicles/:vehicleRO', (req, res) => {
  const vehicleRO = req.params.vehicleRO;
  const {
    Make,
    ModelYear,
    Color,
    DepartmentName,
    TaskTechnician,
    RepairSize,
    Note,
    CustomerID,
  } = req.body;

  // Step 1: Fetch the current department info
  db.query(
    'SELECT DepartmentName FROM DepartmentTask WHERE VehicleRO=?',
    [vehicleRO],
    (err, results) => {
      if (err) {
        console.error('Error fetching current department:', err);
        return res.status(500).send('Internal Server Error');
      }

      const currentDepartment = results[0] ? results[0].DepartmentName : null;

      // Step 2: Compare with new department and update if it has changed
      if (currentDepartment !== DepartmentName) {
        // Department has changed, insert record into DepartmentTaskLogs
        const insertDepartmentTaskLogSql =
          'INSERT INTO DepartmentTaskLogs (MoveDate, VehicleRO, FromDepartmentID, ToDepartmentID) VALUES (CURDATE(), ?, (SELECT DepartmentID FROM Departments WHERE DepartmentName = ?), (SELECT DepartmentID FROM Departments WHERE DepartmentName = ?))';

        db.query(
          insertDepartmentTaskLogSql,
          [vehicleRO, currentDepartment, DepartmentName],
          (err, result) => {
            if (err) {
              console.error('Error inserting into DepartmentTaskLogs:', err);
              return res.status(500).send('Internal Server Error');
            }
            // Continue with the rest of the update process
            updateVehicleDetails();
          }
        );
      } else {
        // No department change, proceed with the update
        updateVehicleDetails();
      }
    }
  );

  // Function to update vehicle details
  function updateVehicleDetails() {
    const updateVehicleSql =
      'UPDATE Vehicles SET Make=?, ModelYear=?, Color=? WHERE VehicleRO=?';

    db.query(
      updateVehicleSql,
      [Make, ModelYear, Color, vehicleRO],
      (err, result) => {
        if (err) {
          console.error('Error updating vehicle:', err);
          return res.status(500).send('Internal Server Error');
        }
        // Update repair order and department task
        updateRepairOrderAndDepartmentTask();
      }
    );
  }

  // Function to update repair order and department task
  function updateRepairOrderAndDepartmentTask() {
    const updateRepairOrderSql =
      'UPDATE RepairOrder SET RepairSize=? WHERE VehicleRO=?';

    db.query(
      updateRepairOrderSql,
      [RepairSize, vehicleRO],
      (err, result) => {
        if (err) {
          console.error('Error updating repair order:', err);
          return res.status(500).send('Internal Server Error');
        }

        console.log(`Updating DepartmentTask for VehicleRO: ${vehicleRO}, DepartmentName: ${DepartmentName}, TaskTechnician: ${TaskTechnician}, CustomerID: ${CustomerID}`);


        const updateDepartmentTaskSql =
          'UPDATE DepartmentTask SET DepartmentName=?, TaskTechnician=?, CustomerID=? WHERE VehicleRO=?';

        db.query(
          updateDepartmentTaskSql,
          [DepartmentName, TaskTechnician, CustomerID, vehicleRO],
          (err, result) => {
            if (err) {
              console.error('Error updating department task:', err);
              return res.status(500).send('Internal Server Error');
            }
            // Update or add notes
            updateOrAddNote();
          }
        );
      }
    );
  }

  // Function to update or add notes
  function updateOrAddNote() {
    res.json({
      message: 'Vehicle updated successfully 🚀',
    })
    // if (Note) {
    //   const checkNoteSql =
    //     'SELECT * FROM VehicleNotes WHERE VehicleRO=?';

    //   db.query(checkNoteSql, [vehicleRO], (err, results) => {
    //     if (err) {
    //       console.error('Error checking note:', err);
    //       return res.status(500).send('Internal Server Error');
    //     }

    //     if (results.length > 0) {
    //       // Update existing note
    //       const updateNoteSql =
    //         'UPDATE VehicleNotes SET Note=? WHERE VehicleRO=?';

    //       db.query(
    //         updateNoteSql,
    //         [Note, vehicleRO],
    //         (err, result) => {
    //           if (err) {
    //             console.error('Error updating note:', err);
    //             return res.status(500).send('Internal Server Error');
    //           }

    //           res.json({
    //             message: 'Vehicle and note updated successfully 🚀',
    //           });
    //         }
    //       );
    //     } else {
    //       // Insert new note
    //       const insertNoteSql =
    //         'INSERT INTO VehicleNotes (Note, VehicleRO) VALUES (?, ?)';

    //       db.query(
    //         insertNoteSql,
    //         [Note, vehicleRO],
    //         (err, result) => {
    //           if (err) {
    //             console.error('Error adding note:', err);
    //             return res.status(500).send('Internal Server Error');
    //           } else {
    //             res.json({
    //               message: 'Vehicle and note added successfully 🚀',
    //             });
    //           }
    //         }
    //       );
    //     }
    //   });
    // } else {
    //   res.json({
    //     message: 'Vehicle updated successfully 🚀',
    //   });
    // }
  }
});

app.post('/api/notes', (req, res) => {
  const {note, customerID, vehicleRO } = req.body;
  const sql = 'INSERT INTO Notes (Note, NoteDate, CustomerID, VehicleRO) VALUES (?, CURDATE(),?,?)';
  console.log('customerID and vehiclero:', customerID,vehicleRO)

  db.query(sql, [note, customerID, vehicleRO], (err, result) => {
    if (err) {
      console.error('Error adding note:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({
        message: 'Note added successfully',
        noteID: result.insertId
      });
    }
  });
});

app.get('/api/notes', (req, res) => {
  const { vehicleRO} = req.query;
  const sql = 'SELECT Note, NoteDate FROM Notes WHERE VehicleRO = ?';

  db.query(sql, [vehicleRO], (err, results) => {
    if (err) {
      console.error('Error fetching notes', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});




function generateVehicleRO() {
  const randomNum = Math.floor(Math.random() * Math.pow(10, 5))
    .toString()
    .padStart(5, '0');
  return randomNum;
}
