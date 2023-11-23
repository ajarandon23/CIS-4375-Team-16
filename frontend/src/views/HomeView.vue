<template>
  <div class="container mt-5">
    <div class="card">
      <!-- Top row of boxes with department names and car counts -->
      <div class="row justify-content-center">
        <div class="col-md-2 mb-3" v-for="department in departments" :key="department.DepartmentName">
          <div class="box p-2">
            <h5>{{ department.DepartmentName }}</h5>
            <p>{{ department.NumberOfCars }} Cars</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom box extending the rest of the page -->
  <div class="container mt-5">
    <div class="card">
      <div class="row">
        <div class="col-12">
          <div class="box p-2">
            Bottom Box
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'YourComponentName',
  data() {
    return {
      departments: []
    };
  },
  created() {
    this.fetchDepartmentData();
  },
  methods: {
    async fetchDepartmentData() {
        try {
          const response = await axios.get('http://localhost:3000/api/departments-count');
          const departmentOrder = ['Body', 'Paint', 'Parts', 'Supplement', 'Detail', 'Delivery'];

          // Sort the response data according to the predefined department order
          const sortedDepartments = response.data.sort((a, b) => {
            return departmentOrder.indexOf(a.DepartmentName) - departmentOrder.indexOf(b.DepartmentName);
          });

          console.log('Sorted departments:', sortedDepartments);
          this.departments = sortedDepartments;
        } catch (error) {
          console.error('Error fetching department data:', error);
        }
      }

  }
}
</script>

<style>
.box {
  border: 1px solid #ddd;
  text-align: center;
  min-height: 100px;
}

.card {
  padding: 20px;
}
</style>
