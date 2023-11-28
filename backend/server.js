require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const AWS = require('aws-sdk');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const port = 3000;


// Middleware
app.use(bodyParser.json());
app.use(cors());


// AWS s3 buckets connection
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION // e.g., 'us-west-2'
});

const s3 = new AWS.S3();

function uploadFileToS3(file, mybucketimgstorage , customerID, vehicleRO, position) {
  return new Promise((resolve, reject) => {
    // Setting up S3 upload parameters
    const params = {
      Bucket: mybucketimgstorage,
      Key: `${customerID}/${vehicleRO}/${position}/${file.originalname}`, // File name you want to save as
      Body: file.buffer
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}
async function listFilesInDirectory(bucketName, directory) {
  const params = {
    Bucket: bucketName,
    Prefix: directory,
  };

  try {
    const s3Response = await s3.listObjectsV2(params).promise();
    return s3Response.Contents.map(file => file.Key);
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
}
async function fetchImageUrlsFromS3(s3Key) {
  try {
    const files = await listFilesInDirectory('mybucketimgstorage', s3Key);
    const urls = await Promise.all(files.map(file => {
      const signedUrl = s3.getSignedUrl('getObject', {
        Bucket: 'mybucketimgstorage',
        Key: file,
        Expires: 3600,
      });
      return { filename: file.split('/').pop(), imageUrl: signedUrl };
    }));

    return urls;
  } catch (error) {
    console.error('Error generating signed URLs:', error);
    throw error;
  }
}
module.exports = fetchImageUrlsFromS3;

async function deleteImageFromS3(s3Key) {
  const params = {
    Bucket: 'mybucketimgstorage',
    Key: s3Key,
  };

  console.log(`Deleting object from S3 with params:`, params);

  try {
    await s3.deleteObject(params).promise();
    console.log(`Successfully deleted ${s3Key} from S3`);
  } catch (error) {
    console.error(`Error in deleting file: ${error.message}`);
    throw error;
  }
}

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// API Routes

// API for deleting photos
app.delete('/api/delete-image/:clientID/:vehicleRO/:position/:filename', async (req, res) => {
  const { clientID, vehicleRO, position, filename } = req.params;
  const s3Key = `${clientID}/${vehicleRO}/${position}/${filename}`;

  console.log(`Attempting to delete S3 object with key: ${s3Key}`);

  // Logic to delete the image from S3
  try {
    await deleteImageFromS3(s3Key); // Implement this function to delete the image
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Error deleting image' });
  }
});


// API route for fetching photos
app.get('/api/fetch-image-urls/:clientID/:vehicleRO/:position', async (req, res) => {
  try {
    const { clientID, vehicleRO, position } = req.params;
    const directory = `${clientID}/${vehicleRO}/${position}/`;
    const imageUrls = await fetchImageUrlsFromS3(directory);

    res.json(imageUrls);
  } catch (error) {
    console.error('Error fetching image URLs:', error);
    res.status(500).json({ error: 'Error fetching image URLs' });
  }
});


// API route for photo uppload
app.post('/api/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const customerID = req.body.customerID;
  const vehicleRO = req.body.vehicleRO;
  const position = req.body.position;
  console.log('Received file:', file);

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    // Assuming 'mybucketimgstorage' is your S3 bucket name
    const uploadResult = await uploadFileToS3(file, 'mybucketimgstorage', customerID, vehicleRO, position);
    res.json({ message: 'File uploaded successfully', data: uploadResult });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).send('Error uploading file to S3');
  }
});

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

// Route to get the number of cars in each department
app.get('/api/departments-count', (req, res) => {
  const sql = `
    SELECT 
      d.DepartmentName,
      COUNT(DISTINCT v.VehicleID) AS NumberOfCars
    FROM Departments d
    LEFT JOIN DepartmentTask dt ON d.DepartmentName = dt.DepartmentName
    LEFT JOIN Vehicles v ON dt.VehicleRO = v.VehicleRO
    WHERE d.DepartmentName IN ('Body', 'Paint', 'Supplement', 'Detail', 'Delivery', 'Parts')
    GROUP BY d.DepartmentName
    ORDER BY d.DepartmentName;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching department counts:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/workload-chart', (req, res) => {
  const sql = `
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
    WHERE e.JobTitle = 'Body-Technician'
    GROUP BY e.EmployeeID, e.FirstName, e.LastName, e.JobTitle;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error executing the query');
      return;
    }
    res.json(results);
  });
});

app.get('/api/employee-data/:employeeId', (req, res) => {
  const employeeId = req.params.employeeId;

  const sql = `
    SELECT 
      e.FirstName,
      COUNT(CASE WHEN ro.RepairSize = 'Small' THEN 1 END) AS SmallJobs,
      COUNT(CASE WHEN ro.RepairSize = 'Medium' THEN 1 END) AS MediumJobs,
      COUNT(CASE WHEN ro.RepairSize = 'Large' THEN 1 END) AS LargeJobs,
      COUNT(CASE WHEN ro.RepairSize = 'X-large' THEN 1 END) AS XLargeJobs
    FROM Employees e
    JOIN DepartmentTask dt ON e.FirstName = dt.TaskTechnician
    JOIN RepairOrder ro ON dt.VehicleRO = ro.VehicleRO
    WHERE e.EmployeeID = ?
    GROUP BY e.FirstName;
  `;

  db.query(sql, [employeeId], (err, results) => {
    if (err) {
      console.error('Error executing the query for employee data:', err);
      res.status(500).send('Error executing the query');
    } else {
      res.json(results);
    }
  });
});
app.get('/api/stagnant-vehicles', (req, res) => {
  const query = `SELECT 
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
                 HAVING MAX(dtl.MoveDate) <= DATE_SUB(CURDATE(), INTERVAL 5 DAY)`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching stagnant vehicles:', err);
      res.status(500).send('Error fetching stagnant vehicles data');
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
