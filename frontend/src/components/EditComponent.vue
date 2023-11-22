<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Update Vehicle</h3>
      <!-- needs to show start date and expected finish date-->

      <!-- notes are not being save correctly  -->
      <form @submit.prevent="handleUpdateForm">
        <div class="form-group">
          <label>R/O</label>
          <input
            type="number"
            readonly
            class="form-control"
            v-model="record.VehicleRO"
          />
        </div>

        <div class="form-group">
          <label>Make</label>
          <input
            type="text"
            readonly
            class="form-control"
            v-model="record.Make"
          />
        </div>

        <div class="form-group">
          <label>Model</label>
          <input
            type="text"
            readonly
            class="form-control"
            v-model="record.ModelYear"
          />
        </div>

        <div class="form-group">
          <label>Department</label>
          <select
            class="form-control"
            v-model="record.DepartmentName"
            @change="fetchEmployeesInDepartment"
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
          <label>Technician</label>
          <select class="form-control" v-model="record.TaskTechnician">
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
          <select class="form-control" v-model="record.RepairSize">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
            <option value="X-large">X-large</option>
          </select>
        </div>

        <div class="form-group">
          <label>Add Note</label>
          <textarea class="form-control" v-model="newNote"></textarea>
          <button type="button" class="btn btn-secondary mt-2" @click="addNote">
            Add Note
          </button>
        </div>
        <button type="submit" class="btn btn-danger mx-2">Update</button>
        <!-- <router-link to="/view" class="btn btn-danger mx-2">Update</router-link> -->
      </form>
    </div>

    <div class="col-md-6">
      <router-link to="/addphoto" class="btn btn-primary mx-2"
        >View Photos</router-link
      >
      <h3 class="text-center">Stored Notes</h3>
      <ul>
        <li v-for="note in storedNotes" :key="note.NoteID">
          {{ note.Note }} - {{ formatDate(note.NoteDate) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      record: {},
      newNote: '',
      storedNotes: [],
      departments: [],
      employees: [],
    };
  },

  created() {
    this.fetchRecordDetails();
    this.fetchDepartments();
    
  },

  methods: {

    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2,'0');
      const month = (date.getMonth() + 1).toString().padStart(2,'0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    },

    async fetchRecordDetails() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/vehicles/${this.$route.params.id}`
        );
        this.record = response.data;
        this.fetchNotes();
      } catch (error) {
        console.error('Error fetching record details:', error);
      }
    },

    async fetchDepartments() {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/departments'
        );
        this.departments = response.data;
        this.fetchEmployeesInDepartment(); // Fetch employees once departments are loaded
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    },

    fetchEmployeesInDepartment() {
      if (this.record.DepartmentName) {
        axios
          .get(
            `http://localhost:3000/api/employees/${this.record.DepartmentName}`
          )
          .then((response) => {
            this.employees = response.data;
          })
          .catch((error) => {
            console.error('Error fetching employees:', error);
          });
      }
    },

    async handleUpdateForm() {
      let apiURL = `http://localhost:3000/api/vehicles/${this.record.VehicleRO}`;
      axios
        .put(apiURL, {
          Make: this.record.Make,
          ModelYear: this.record.ModelYear,
          Color: this.record.Color,
          DepartmentName: this.record.DepartmentName,
          duration: this.record.duration,
          TaskTechnician: this.record.TaskTechnician,
          RepairSize: this.record.RepairSize,
          Note: this.record.Note,
          CustomerID: this.record.CustomerID,
        })
        .then((response) => {
          console.log(response.data);
          this.$router.push('/view');
        })
        .catch((error) => {
          console.error('Error Updating vehicle:', error);
        });
    },

    async addNote() {
      if (this.newNote.trim() === '') {
        return;
      }

      const noteData = {
        note: this.newNote,
        customerID: this.record.CustomerID,
        vehicleRO: this.record.VehicleRO
      };

      try {
        await axios.post('http://localhost:3000/api/notes', noteData);
        this.fetchNotes();
        this.newNote = '';
      } catch (error) {
        console.error('Error adding note:', error);
      }
    },
    async fetchNotes() {
      if (!this.record.VehicleRO) {
        console.warn("VehicleRO not set. Cannot fetch notes.");
        return;
      }
      try {
        const vehicleRO = this.record.VehicleRO;
        const response = await axios.get(`http://localhost:3000/api/notes?vehicleRO=${vehicleRO}`);
        this.storedNotes = response.data
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    }

  },
};
</script>
