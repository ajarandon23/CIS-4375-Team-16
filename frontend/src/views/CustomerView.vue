<template>
    <div class="container mt-3">
      <h2>Customer List</h2>
      <input 
        type="text" 
        class="form-control mb-3" 
        placeholder="Search by last name" 
        v-model="searchQuery" 
        @input="searchCustomers"
      />
  
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <th>{{ customer.FirstName }}</th>
            <td>{{ customer.LastName }}</td>
            <td>{{ customer.Phone }}</td>
            <td>{{ customer.Email }}</td>
            <td>
              <button class="btn btn-primary" @click="goToAddVehicle(customer.CustomerID)">Add Vehicle</button>
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
        searchQuery: '',
        customers: [],
        allCustomers:[] // to store all customers
      };
    },
    mounted() {
      
      this.fetchCustomers() // Load all customers initially
    },
    methods: {
        fetchCustomers() {
            axios.get('http://localhost:3000/api/customers').then(response => {
                this.allCustomers = response.data
                this.customers = response.data;
                console.log("customers data:",response.data);
        });    
        },
        searchCustomers() {
        if (this.searchQuery) {
            this.customers = this.allCustomers.filter(customer => 
                customer.LastName.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        } else {
            this.customers = this.allCustomers;
        }
        },
        goToAddVehicle(customerid) {
          this.$router.push({name: 'addvehicle', params: {CustomerID: customerid}});
        },
      },
    
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  