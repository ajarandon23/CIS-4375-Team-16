<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Add Client</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="student.firstName">
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="student.lastName">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="student.email">
                </div>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="text" class="form-control" v-model="student.phoneNumber">
                </div>
                
                <div class="form-group">
                    <input type="radio" id="insurance" value="insurance" v-model="student.paymentOption">
                    <label for="insurance">Insurance</label>
                    <input type="radio" id="self-pay" value="self-pay" v-model="student.paymentOption">
                    <label for="self-pay">Self-Pay</label>
                </div>
                <router-link to="/some-path" class="btn btn-primary mt-3">continue</router-link>
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
                   studentID: '',
                   insuranceOrSelfPay: false
                }
            }
        },
        methods: {
            handleSubmitForm() {
                let apiURL = 'https://student-management-api.azurewebsites.net/student';
                
                axios.post(apiURL, this.student).then(() => {
                    //changing the view to the list
                  this.$router.push('/view')
                  this.student = {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phoneNumber: '',
                    studentID: '',
                    insuranceOrSelfPay: false
                  }
                }).catch(error => {
                    console.log(error)
                });
            }
        } 
           
    }
</script>
