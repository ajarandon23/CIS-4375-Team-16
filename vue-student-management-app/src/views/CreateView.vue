<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Create Student</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control">
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control">
                </div>

                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="text" class="form-control">
                </div>

                <div class="form-group">
                    <label>Student ID</label>
                    <input type="text" class="form-control" v-model="student.studentID">
                </div>
                <button class="btn btn-danger mt-3">Create</button>
            </form>
        </div>
    </div>
</template>

<script>
   import axios from "axios";

    export default {
        data() {
            return {
                student: {
                   firstName: '',
                   lastName: '',
                   email: '',
                   phoneNumber: '',
                   studentID: ''
                }
            }
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'http://localhost:3001/student';
                
                axios.post(apiURL, this.student).then(() => {
                    //changing the view to the list
                  this.$router.push('/view')
                  this.student = {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    studentID: ''
                  }
                }).catch(error => {
                    console.log(error)
                });
            }
        } 
           
    }
</script>