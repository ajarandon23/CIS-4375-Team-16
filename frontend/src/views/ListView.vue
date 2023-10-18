<template>
  <div class="row justify-content-center">
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>R/O</th>
          <th>Make</th>
          <th>Model</th>
          <th>Color</th>
          <th>Department</th>
          <th>Duration</th> <!-- New Header -->
          <th>Customer Last Name</th> <!-- New Header -->
          <th>Technician</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records" :key="record.ro">
          <td>{{ record.ro }}</td>
          <td>{{ record.make }}</td>
          <td>{{ record.model }}</td>
          <td>{{ record.color }}</td>
          <td>{{ record.department }}</td>
          <td>{{ record.duration }} days</td> <!-- New Field -->
          <td>{{ record.customerLastName }}</td> <!-- New Field -->
          <td>{{ record.technician }}</td>
          <td :class="record.status === 'green' ? 'bg-success' : ''"></td>
          <td>
            <router-link to="/edit" class="btn btn-success mx-2">Edit</router-link>
            <button @click.prevent="deleteRecord(record.ro)" class="btn btn-danger mx-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      records: [
        { ro: 3234, make: 'Chevrolet', model: 'Camaro', color: 'Black', department: 'Paint', technician: 'Jose', status: 'green', customerLastName: 'Mann', duration: 5 },  // Updated Record
        // add more records here
      ],
    };
  },
  methods: {
    deleteRecord(ro) {
      let indexOfArrayItem = this.records.findIndex(i => i.ro === ro);
      if (window.confirm("Do you really want to delete?")) {
        this.records.splice(indexOfArrayItem, 1);
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
