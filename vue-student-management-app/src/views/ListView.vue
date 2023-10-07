<template>
    <div class="row justify-content-center">
      <table class="table table-striped">
        <thead class="table-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Student ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
         <tr v-for="student in Students" :key="student._id">
            <td>{{ student.firstName }}</td>
            <td>{{ student.lastName }}</td>
            <td>{{ student.studentID }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.phoneNumber }}</td>
             <td>
              <router-link :to="{name: 'edit', params: { id: student._id }}" class="btn btn-success ">Edit</router-link>
              <button @click.prevent="deleteStudent(student._id)" class="btn btn-danger mx-2">Delete</button>
            </td> 
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
      import axios from "axios";
  
      export default {
          data() {
              return {
                //variable (Javascript Object) to hold students data coming from backend
                  Students: []
              }
          },
          // this is using created hook 
          created() {
            //make call to backend GET students
              let apiURL = 'http://localhost:3001/student';
              axios.get(apiURL).then(res => {
                  this.Students = res.data;
              }).catch(error => {
                  console.log(error)
              }); 
          },
          methods: {
              deleteStudent(id){
                  let apiURL = `http://localhost:3001/student/${id}`;
                  let indexOfArrayItem = this.Students.findIndex(i => i._id === id);
  
                  if (window.confirm("Do you really want to delete?")) {
                    //call to backend
                      axios.delete(apiURL).then(() => {
                        //remove one element from Students array object to update data
                          this.Students.splice(indexOfArrayItem, 1);
                      }).catch(error => {
                          console.log(error)
                      });
                  }
              }
          }
      }
  </script>