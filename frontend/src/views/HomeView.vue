<template>
  <div class="container mt-5">
    <div class="text-center">
      <h2>DASHBOARD</h2>
    </div>

    <!-- Top row of boxes with department names and car counts -->
    <div class="row justify-content-center">
      <div v-for="department in departments" :key="department.DepartmentName" class="col-md-2 mb-3">
        <div class="box p-2">
          <h5>{{ department.DepartmentName }}</h5>
          <p>{{ department.NumberOfCars }} Cars</p>
        </div>
      </div>
    </div>

    <!-- Bottom box extending the rest of the page -->
    <div class="row mt-">
      <!-- Column for the Chart -->
      <div class="col-md-6" align="center">
        <div class="box box- p-2">
          <WorkLoadChart/>
        </div>
      </div>

      <!-- Need Attention -->
      <div class="col-md-6">
        <div class="box box-2 p-2">
          <h3>Need Attention</h3>
          <StagnantVehiclesTable/>
        </div>
      </div>
    </div>
    <!-- Department Doughnut Chart -->
    <div class="row mt-5 justify-content-center">
      <div class="col-md-12" align="center">
        <div class="box box-3 p-2">
          <DepartmentDoughnutChart/>
        </div>
      </div>
    </div>
    
  </div>
</template>


<script>
import axios from 'axios';
import WorkLoadChart from '../components/workLoadChart.vue'
import StagnantVehiclesTable from '../views/StagnantVehiclesTable.vue';
import DepartmentDoughnutChart from '../components/DoughnutChart.vue';

export default {
  name: 'YourComponentName',
  components:{
    WorkLoadChart,
    StagnantVehiclesTable,
    DepartmentDoughnutChart,
  },
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
.box-1{
  height: 600px;
  width: 600px;
}
.box-2{
  width: 675px;
  height: auto;
  margin-bottom: 30px;
  overflow: auto;
  
}
.box-3{
  width: 675px;
  padding: 20px;
  
}
</style>
