<template>
    <div>
      <table class="table table-striped">
        <!-- Table Headers -->
        <tr>
          <th>RO</th>
          <th>Make</th>
          <th>Model</th>
          <th>Department</th>
          <th>Technician</th>
          <th>Last Move Date</th>
        </tr>
        <!-- Table Rows -->
        <tr v-for="vehicle in vehicles" :key="vehicle.VehicleRO">
          <td>{{ vehicle.VehicleRO }}</td>
          <td>{{ vehicle.Make }}</td>
          <td>{{ vehicle.Model }}</td>
          <td>{{ vehicle.DepartmentName }}</td>
          <td>{{ vehicle.Technician }}</td>
          <td>{{ formatDate(vehicle.LastMoveDate) }}</td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        vehicles: []
      };
    },
    created() {
      this.fetchStagnantVehicles();
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2,'0');
            const month = (date.getMonth() + 1).toString().padStart(2,'0');
            const year = date.getFullYear();
            return `${month}/${day}/${year}`;
        },
        async fetchStagnantVehicles() {
            try {
            const response = await axios.get('http://localhost:3000/api/stagnant-vehicles');
            this.vehicles = response.data;
            console.log(response.data)
            } catch (error) {
            console.error('Error fetching stagnant vehicles:', error);
            }
        },

      
      
    }
  };
  </script>
  