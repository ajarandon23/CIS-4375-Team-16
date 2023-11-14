<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Add Vehicle</h3>
      <form @submit.prevent="handleSubmitForm">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Vehicle R/O</label>
              <input
                type="text"
                class="form-control"
                v-model="vehicle.VehicleRO"
                required
              />
            </div>
            <div class="form-group">
              <label>License Plate</label>
              <input
                type="text"
                class="form-control"
                v-model="vehicle.LicensePlate"
                required
              />
            </div>
            <div class="form-group">
              <label>Make</label>
              <input
                type="text"
                class="form-control"
                v-model="vehicle.Make"
                required
              />
            </div>
            <div class="form-group">
              <label>Model</label>
              <input
                type="text"
                class="form-control"
                v-model="vehicle.Model"
                required
              />
            </div>
            <div class="form-group">
              <label>Year</label>
              <input
                type="text"
                class="form-control"
                v-model="vehicle.ModelYear"
                required
              />
            </div>
            <div class="form-group">
              <label>Color</label>
              <input
                type="text"
                class="form-control"
                v-model="vehicle.Color"
                required
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>Last 8 Digits of VIN</label>
              <input
                type="text"
                class="form-control"
                v-model="vehicle.VehicleVIN"
                required
              />
            </div>
            <div class="form-group">
              <label>Work Started</label>
              <input
                type="date"
                class="form-control"
                v-model="vehicle.OpenDate"
                required
              />
            </div>
            <div class="form-group">
              <label>Anticipated Work Finish</label>
              <input
                type="date"
                class="form-control"
                v-model="vehicle.EstimatedEndDate"
                required
              />
            </div>
            <div class="form-group">
              <label>Department</label>
              <select
                class="form-control"
                v-model="vehicle.DepartmentName"
                @change="fetchEmployeesInDepartment"
                required
              >
                <option value="" disabled>Select Department</option>
                <option
                  v-for="department in departments"
                  :key="department"
                  :value="department"
                >
                  {{ department }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Duration (days)</label>
              <input
                type="number"
                class="form-control"
                v-model="vehicle.duration"
                required
              />
            </div>
            <div class="form-group">
              <label>Technician</label>
              <select
                class="form-control"
                v-model="vehicle.TaskTechnician"
                required
              >
                <option value="" disabled>Select Technician</option>
                <option
                  v-for="employee in employees"
                  :key="employee"
                  :value="employee"
                >
                  {{ employee }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Size of Job</label>
              <select
                class="form-control"
                v-model="vehicle.RepairSize"
                required
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="X-large">X-large</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Continue</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      vehicle: {
        VehicleRO: '2345',
        LicensePlate: '',
        Make: 'Audi',
        Model: 'Audi A3',
        ModelYear: '2022',
        Color: 'Blue',
        VehicleVIN: 'sdf234',
        OpenDate: '2022-01-01',
        EstimatedEndDate: '2022-01-10',
        DepartmentName: '',
        RepairSize: '',
        CustomerID: '',
        TaskTechnician: '',
      },
      departments: [],
      employees: [],
    };
  },
  mounted() {
    // Fetch departments when the component is mounted
    this.vehicle.CustomerID = this.$route.params.CustomerID;
    this.fetchDepartments();
  },
  methods: {
    fetchDepartments() {
      axios
        .get('http://localhost:3000/api/departments')
        .then((response) => {
          this.departments = response.data;
        })
        .catch((error) => {
          console.error('Error fetching departments:', error);
        });
    },
    fetchEmployeesInDepartment() {
      if (this.vehicle.DepartmentName) {
        axios.get(`http://localhost:3000/api/employees/${this.vehicle.DepartmentName}`)
          .then((response) => {
            this.employees = response.data;
          })
          .catch((error) => {
            console.error('Error fetching employees:', error);
          });
      }
    },
    handleSubmitForm() {
      console.log("Submitting vehicle data:", this.vehicle);
      let apiURL = 'http://localhost:3000/api/vehicles';
      axios.post(apiURL, this.vehicle)
        .then((response) => {
          console.log('submit response', this.vehicle);
          this.$router.push('/addphoto');
        })
        .catch((error) => {
          console.error('Error adding vehicle:', error);
        });
    },
  },
};
</script>
