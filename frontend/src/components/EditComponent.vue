<template>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <!-- Update Vehicle content -->
        <h3 class="text-center">Update Vehicle</h3>
        <form @submit.prevent="handleUpdateForm">
          <div class="form-group">
            <label>R/O</label>
            <input type="number" readonly class="form-control" v-model="record.ro">
          </div>
  
          <div class="form-group">
            <label>Make</label>
            <input type="text" readonly  class=" form-control" v-model="record.make">
          </div>
  
          <div class="form-group">
            <label>Model</label>
            <input type="text" readonly class="form-control" v-model="record.model">
          </div>
  
          <div class="form-group">
            <label>Color</label>
            <input type="text" readonly class="form-control" v-model="record.color">
          </div>
  
          <div class="form-group">
            <label>Department</label>
            <select class="form-control" v-model="record.department">
              <option>Paint</option>
              <option>Body</option>
              <option>Parts</option>
              <option>Supplement</option>
              <option>Detail </option>
              <option>Detail </option>
            </select>
          </div>
  
          <div>
            <label>Duration</label>
            <input type="text" class="form-control" placeholder="Duration in days">
          </div>
  
          <div class="form-group">
            <label>Technician</label>
            <input type="text" readonly class="form-control" v-model="record.technician">
          </div>
  <!--  we will need a work start and end date with a prompt for a note if the completion date is extended -->
          <!-- Added New Note Field -->
          <div class="form-group">
            <label>Add Note</label>
            <textarea class="form-control" v-model="newNote"></textarea>
            <button type="button" class="btn btn-secondary mt-2" @click="addNote">Add Note</button>
          </div>
  
          <router-link to="/view" class="btn btn-danger mx-2">Update</router-link>
          
  
        </form>
      </div>
  
      <!-- Added New Section for Stored Notes -->
      <div class="col-md-6">
        <router-link to="/addphoto" class="btn btn-primary mx-2">View Photos</router-link>
        <h3 class="text-center">Stored Notes</h3>
        <ul>
          <li v-for="note in storedNotes" :key="note">{{ note }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        record: {},
        newNote: "", // New note to be added
        storedNotes: [] // Array for storing notes
      };
    },
    created() {
      this.record = {
        ro: 3234,
        make: 'Chevrolet',
        model: 'Camaro',
        color: 'Black',
        department: 'Paint',
        technician: 'Jose',
        status: 'green'
      };
    },
    methods: {
      handleUpdateForm() {
        console.log('Updated Record:', this.record);
      },
      addNote() {
        if (this.newNote.trim() !== "") {
          this.storedNotes.push(this.newNote);
          this.newNote = ""; // Reset new note input
        }
      }
    }
  };
  </script>
  