<template>
  <div class="row justify-content-center">
    <!-- Dropdown for selecting department -->
    <div class="mb-3">
      <label for="departmentSelect" class="form-label">Select Department</label>
      <select id="departmentSelect" class="form-select" v-model="selectedDepartment" @change="filterRecords">
        <option value="">All Departments</option>
        <option v-for="department in departments" :key="department" :value="department">{{ department }}</option>
        
      </select>
    </div>

    <table class="table table-striped">
      <!-- Table headers -->
      <thead>
        <tr>
          <th>Vehicle RO</th>
          <th>Make</th>
          <th>Model</th>
          <th>Color</th>
          <th>Department</th>
          <th>Repair Size</th>
          <th>Last Name</th>
          <th>Technician</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in filteredRecords" :key="record.VehicleRO">
          <td>{{ record.VehicleRO }}</td>
          <td>{{ record.Make }}</td>
          <td>{{ record.Model }}</td>
          <td>{{ record.Color }}</td>
          <td>{{ record.DepartmentName}}</td>
          <td>{{ record.RepairSize }}</td>
          <td>{{ record.LastName }}</td>
          <td>{{ record.Technician }}</td>
          <td :class="record.Status === 'green' ? 'bg-success' : ''">{{ record.Status }}</td>
          <td>
            <router-link :to="{ name: 'edit', params: { id: record.VehicleRO } }" class="btn btn-success mx-2">Edit</router-link>
            <button @click.prevent="deleteRecord(record.VehicleRO)" class="btn btn-danger mx-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      records: [],
      departments: [],
      selectedDepartment: '',
      filteredRecords: [],
    };
  },
  mounted() {
    this.fetchDepartments();
    this.fetchRecords();
  },
  
  methods: {
    fetchDepartments() {
      axios.get('http://localhost:3000/api/departments').then(response => {
        this.departments = response.data;
      });
    },
    fetchRecords() {
      axios.get('http://localhost:3000/api/management').then(response => {
        console.log(response.data);
        this.records = response.data;
        this.filteredRecords = this.records;
      });
    },
    deleteRecord(vehicleRO) {
      // Implement the logic to delete a record
      if (window.confirm('Do you really want to delete?')) {
        axios.delete(`http://localhost:3000/api/vehicles/${vehicleRO}`).then(() => {
          this.fetchRecords(); // Refresh the records after deletion
        });
      }
    },
    filterRecords() {
      if (this.selectedDepartment === '') {
        this.filteredRecords = this.records;
      } else {
        this.filteredRecords = this.records.filter(
          record => record.DepartmentName === this.selectedDepartment
        );
      }
      console.log('filtered records:', this.filteredRecords);
    },
    
  },
};
</script>

<!-- Add any custom styles here -->
<style>
.bg-success {
  background-color: green; /* Example style for successful status */
}
</style>
