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
            v-model="Customer.FirstName"
            required
          />
        </div>
        <div class="form-group">
          <label>Last Name</label>
          <input
            type="text"
            class="form-control"
            v-model="Customer.LastName"
            required
          />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input
            type="email"
            class="form-control"
            v-model="Customer.Email"
            required
          />
        </div>
        <div class="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            class="form-control"
            v-model="Customer.Phone"
            required
          />
        </div>

        <div class="form-group">
          <label>Address</label>
          <input
            type="text"
            class="form-control"
            v-model="Customer.Address"
            required
          />
        </div>

        <div class="form-group">
          <input
            type="radio"
            id="insurance"
            value="Insurance"
            v-model="Customer.Selfpay_Insurance"
            required
          />
          <label for="insurance">Insurance</label>
          <input
            type="radio"
            id="self-pay"
            value="Self-pay"
            v-model="Customer.Selfpay_Insurance"
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
      Customer: {
        FirstName: 'Blake',
        LastName: 'Mann',
        Email: 'bmann@email.com',
        Phone: '8324554576',
        Address: 'houston',
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
    'Customer.insuranceOrSelfPay'(newVal) {
      this.Customer.insuranceOrSelfPay = newVal ? 'Insurance' : 'Self-pay';
    },
  },
  methods: {
    validateForm() {
      this.errors = {
        firstName: !this.Customer.firstName ? 'First Name is required' : null,
        lastName: !this.Customer.lastName ? 'Last Name is required' : null,
        email: !this.Customer.Emailmail ? 'Email is required' : null,
        phoneNumber: !this.Customer.phoneNumber
          ? 'Phone Number is required'
          : null,
        insuranceOrSelfPay: !this.Customer.insuranceOrSelfPay
          ? 'Payment Option is required'
          : null,
      };

      return Object.values(this.errors).every((error) => error === null);
    },
    handleSubmitForm() {
      console.log('inside submit');
      if (true) {
        console.log('inside submit validation');
        let apiURL = 'http://localhost:3000/api/customers';

        axios.post(apiURL, this.Customer)
          .then((response) => {
            // Assuming the response contains the new customer data including the ID
            const newCustomerId = response.data.id;
            console.log('customerid:', response) // Change 'id' to match the property name returned by your API

            // Navigate to the addvehicle route with the new customer ID
            this.$router.push({ name: 'addvehicle', params: { CustomerID: newCustomerId } });
            

            this.Customer = {
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
