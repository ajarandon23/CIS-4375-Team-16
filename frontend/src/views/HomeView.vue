<template>
  <div class="container mt-5">
    <div class="text-center">
      <h2></h2>
    </div>
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

  <!-- Bottom box extending the rest of the page -->
  <div class="container mt-5">
    <div class="row">
        <div class="col-12">
          <div class="box p-2">
            Bottom Box
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(to bottom right, #f9f9f9, #e9e9e9);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
  min-height: 100px;
  transition: all 0.3s ease;
}
.box:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.card {
  padding: 20px;
}
</style>
