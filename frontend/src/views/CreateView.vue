<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Add Client</h3>
      <form @submit.prevent="handleSubmitForm">
        <div class="form-group">
          <label>First Name</label>
          <input
            type="text"
            class="form-control"
            v-model="student.FirstName"
            required
          />
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input
            type="text"
            class="form-control"
            v-model="student.LastName"
            required
          />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="student.Email"
            required
          />
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            class="form-control"
            v-model="student.Phone"
            required
          />
        </div>

        <div class="form-group">
          <label>Address</label>
          <input
            type="text"
            class="form-control"
            v-model="student.Address"
            required
          />
        </div>

        <div class="form-group">
          <input
            type="radio"
            id="insurance"
            value="Insurance"
            v-model="student.Selfpay_Insurance"
            required
          />
          <label for="insurance">Insurance</label>
          <input
            type="radio"
            id="self-pay"
            value="Self-pay"
            v-model="student.Selfpay_Insurance"
            required
          />
          <label for="self-pay">Self-Pay</label>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Continue</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      student: {
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        Address: '',
        Selfpay_Insurance: '', // Set to an initial value
      },
      errors: {
        FirstName: null,
        LastName: null,
        Email: null,
        Phone: null,
        Address: null,
        Selfpay_Insurance: null,
      },
    };
  },
  watch: {
    'student.insuranceOrSelfPay'(newVal) {
      this.student.insuranceOrSelfPay = newVal ? 'Insurance' : 'Self-pay';
    },
  },
  methods: {
    validateForm() {
      this.errors = {
        firstName: !this.student.firstName ? 'First Name is required' : null,
        lastName: !this.student.lastName ? 'Last Name is required' : null,
        email: !this.student.email ? 'Email is required' : null,
        phoneNumber: !this.student.phoneNumber
          ? 'Phone Number is required'
          : null,
        insuranceOrSelfPay: !this.student.insuranceOrSelfPay
          ? 'Payment Option is required'
          : null,
      };

      return Object.values(this.errors).every((error) => error === null);
    },
    handleSubmitForm() {
      console.log('inside submit');
      if (true) {
        console.log('inside submit valdation');
        let apiURL = 'http://localhost:3000/api/customers';

        axios
          .post(apiURL, this.student)
          .then(() => {
            //changing the view to the list
            this.$router.push({
              name: 'addvehicle',
              params: {
                customerLastName: this.student.LastName,
              },
            });
            this.student = {
              FirstName: '',
              LastName: '',
              Email: '',
              Phone: '',
              Address: '',
              Selfpay_Insurance: 'Insurance', // Set to an initial value
            };
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
