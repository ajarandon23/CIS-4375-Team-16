<template>
  <div class="row justify-content-center">
    <table class="table table-striped">
      <!-- ... existing table headers ... -->
      <tbody>
        <tr v-for="record in records" :key="record.VehicleRO">
          <td>{{ record.VehicleRO }}</td>
          <td>{{ record.Make }}</td>
          <td>{{ record.Model }}</td>
          <td>{{ record.Color }}</td>
          <td>{{ record.Department }}</td>
          <td>{{ record.Duration }} days</td>
          <td>{{ record.CustomerLastName }}</td>
          <td>{{ record.Technician }}</td>
          <!-- <td :class="record.Status === 'green' ? 'bg-success' : ''"></td> -->
          <td>
            <router-link
              :to="{ name: 'edit', params: { id: record.VehicleRO } }"
              class="btn btn-success mx-2"
              >Edit</router-link
            >
            <button
              @click.prevent="deleteRecord(record.VehicleRO)"
              class="btn btn-danger mx-2"
            >
              Delete
            </button>
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
    };
  },
  mounted() {
    this.fetchRecords();
  },
  methods: {
    fetchRecords() {
      // Make a GET request to retrieve records from the backend
      axios.get('http://localhost:3000/api/management').then((response) => {
        this.records = response.data;
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
  },
};
</script>

<style>
.bg-success {
  background-color: green;
}
</style>
