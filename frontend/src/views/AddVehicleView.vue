<template>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h3 class="text-center">Add Vehicle</h3>
        <form @submit.prevent="handleSubmitForm">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Vehicle Title</label>
                <input type="text" class="form-control" v-model="vehicle.title">
              </div>
              <div class="form-group">
                <label>Registration Number</label>
                <input type="text" class="form-control" v-model="vehicle.registrationNumber">
              </div>
              <div class="form-group">
                <label>Make</label>
                <input type="text" class="form-control" v-model="vehicle.make">
              </div>
              <div class="form-group">
                <label>Model</label>
                <input type="text" class="form-control" v-model="vehicle.model">
              </div>
              <div class="form-group">
                <label>Color</label>
                <input type="text" class="form-control" v-model="vehicle.color">
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Last 8 Digits of VIN</label>
                <input type="text" class="form-control" v-model="vehicle.vin">
              </div>
              <div class="form-group">
                <label>Work Started</label>
                <input type="date" class="form-control" v-model="vehicle.workStarted">
              </div>
              <div class="form-group">
                <label>Anticipated Work Finish</label>
                <input type="date" class="form-control" v-model="vehicle.workFinish">
              </div>
              <div class="form-group">
                <label>Department</label>
                <select class="form-control" v-model="vehicle.department">
                  <option value="paint">Paint</option>
                  <option value="body">Body</option>
                  <option value="detail">Detail</option>
                </select>
              </div>
              <div class="form-group">
                <label>Duration (days)</label>
                <input type="number" class="form-control" v-model="vehicle.duration">
              </div>
              <div class="form-group">
                <label>Technician</label>
                <select class="form-control" v-model="vehicle.technician">
                  <option value="Lupe">Lupe</option>
                  <option value="Israel">Israel</option>
                  <option value="Abel">Abel</option>
                </select>
              </div>
              <div class="form-group">
                <label>Size of Job</label>
                <select class="form-control" v-model="vehicle.sizeOfJob">
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
            </div>
          </div>
          <router-link to="/addphoto" class="btn btn-primary mt-3">continue</router-link>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        vehicle: {
          title: '',
          registrationNumber: '',
          make: '',
          model: '',
          color: '',
          vin: '',
          workStarted: '',
          workFinish: '',
          department: 'paint', // Default department
          sizeOfJob: 'sm' // Default size of job
        }
      }
    },
    methods: {
      handleSubmitForm() {
        // Handle form submission here
        // You can send the data to your API or perform any necessary actions
      }
    }
  }
  </script>
  