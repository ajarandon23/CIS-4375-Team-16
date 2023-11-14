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
    'INSERT INTO Vehicles (VehicleVIN, Make, Model,LicensePlate, Color, ModelYear, VehicleRO) VALUES (?, ?, ?, ?, ?, ?, ?)';

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
      
    ],
    (err, result) => {
      if (err) {
        console.error('Error adding vehicle:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log({
          id: result.insertId,
          message: 'Vehicle added successfully',
        });

        const sqlQueryForRepairOrder =
          'INSERT INTO RepairOrder (OpenDate, EstimatedEndDate, RepairSize,CustomerID, VehicleRO) VALUES (?, ?, ?, ?, ?)';

        db.query(
          sqlQueryForRepairOrder,
          [OpenDate, EstimatedEndDate, RepairSize, CustomerID, VehicleRO],
          (err, result) => {
            if (err) {
              console.error('Error adding repair order:', err);
              res.status(500).send('Internal Server Error');
            } else {
              const sqlQueryForDepartmentTask =
                'INSERT INTO DepartmentTask (EnterDate, VehicleRO, DepartmentName, TaskTechnician) VALUES (?, ?, ?, ?)';

              db.query(
                sqlQueryForDepartmentTask,
                [OpenDate, VehicleRO, DepartmentName, TaskTechnician],
                (err, result) => {
                  if (err) {
                    console.error('Error adding department task:', err);
                    res.status(500).send('Internal Server Error');
                  } else {
                    res.json({
                      id: result.insertId,
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
    V.VehicleRO, 
    V.Make, 
    V.Model, 
    V.Color, 
    DT.DepartmentName, 
    R.RepairSize, 
    V.CustomerID, 
    C.LastName,  
    DT.TaskTechnician AS Technician
FROM 
    Vehicles V
INNER JOIN 
    RepairOrder R ON V.VehicleRO = R.VehicleRO
INNER JOIN 
    DepartmentTask DT ON R.VehicleRO = DT.VehicleRO
INNER JOIN 
    Customers C ON V.CustomerID = C.CustomerID;`;
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

app.put('/api/vehicles/:vehicleRO', (req, res) => {
  const vehicleRO = req.params.vehicleRO;
  const {
    Make,
    ModelYear,
    Color,
    DepartmentName,
    duration,
    TaskTechnician,
    RepairSize,
    Note,
  } = req.body;

  app.get('/api/customers/search', async (req, res) => {
    const lastName = req.query.lastName;
    // Add database query to find customers by lastName
    // Use parameterized queries to prevent SQL injection
    // Send back the customer data
  });
  

  const updateVehicleSql =
    'UPDATE Vehicles SET Make=?, ModelYear=?, Color=? WHERE VehicleRO=?';

  db.query(
    updateVehicleSql,
    [Make, ModelYear, Color, vehicleRO],
    (err, result) => {
      if (err) {
        console.error('Error updating vehicle:', err);
        res.status(500).send('Internal Server Error');
      } else {
        const updateRepairOrderSql =
          'UPDATE RepairOrder SET RepairSize=? WHERE VehicleRO=?';

        db.query(
          updateRepairOrderSql,
          [RepairSize, vehicleRO],
          (err, result) => {
            if (err) {
              console.error('Error updating repair order:', err);
              res.status(500).send('Internal Server Error');
            } else {
              const updateDepartmentTaskSql =
                'UPDATE DepartmentTask SET EnterDate=?, DepartmentName=?, TaskTechnician=? WHERE VehicleRO=?';

              db.query(
                updateDepartmentTaskSql,
                [new Date(), DepartmentName, TaskTechnician, vehicleRO],
                (err, result) => {
                  if (err) {
                    console.error('Error updating department task:', err);
                    res.status(500).send('Internal Server Error');
                  } else {
                    if (Note) {
                      // Check if the note already exists
                      const checkNoteSql =
                        'SELECT * FROM VehicleNotes WHERE VehicleRO=?';

                      db.query(checkNoteSql, [vehicleRO], (err, results) => {
                        if (err) {
                          console.error('Error checking note:', err);
                          res.status(500).send('Internal Server Error');
                        } else {
                          if (results.length > 0) {
                            // Update existing note
                            const updateNoteSql =
                              'UPDATE VehicleNotes SET Note=? WHERE VehicleRO=?';

                            db.query(
                              updateNoteSql,
                              [Note, vehicleRO],
                              (err, result) => {
                                if (err) {
                                  console.error('Error updating note:', err);
                                  res.status(500).send('Internal Server Error');
                                } else {
                                  res.json({
                                    message:
                                      'Vehicle and note updated successfully 🚀',
                                  });
                                }
                              }
                            );
                          } else {
                            // Insert new note
                            const insertNoteSql =
                              'INSERT INTO VehicleNotes (Note, VehicleRO) VALUES (?, ?)';

                            db.query(
                              insertNoteSql,
                              [Note, vehicleRO],
                              (err, result) => {
                                if (err) {
                                  console.error('Error adding note:', err);
                                  res.status(500).send('Internal Server Error');
                                } else {
                                  res.json({
                                    message:
                                      'Vehicle and note added successfully 🚀',
                                  });
                                }
                              }
                            );
                          }
                        }
                      });
                    } else {
                      res.json({
                        message: 'Vehicle updated successfully 🚀',
                      });
                    }
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

// Function to generate a unique identifier for VehicleRO
function generateVehicleRO() {
  const randomNum = Math.floor(Math.random() * Math.pow(10, 5))
    .toString()
    .padStart(5, '0');
  return randomNum;
}
