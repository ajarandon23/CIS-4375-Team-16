<template>
    <div>
      <div class="employee-buttons-container">
        <button 
          v-for="employee in employees" 
          :key="employee.EmployeeID"
          class="employee-button"
          @click="fetchEmployeeData(employee.EmployeeID)">
          {{ employee.FirstName }}
        </button>
      </div>
      <div class="workload-chart">
        <canvas ref="pieChartCanvas"></canvas>
      </div>
    </div>
  </template>
  

<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { onMounted, ref } from 'vue';

Chart.register(...registerables);

export default {
  name: 'WorkLoadChart',
  setup() {
    const pieChartCanvas = ref(null);
    const employees =ref([]);
    const chartData = ref({
      labels: [],
      datasets: [{
        label: [],
        backgroundColor: ['#f87979', '#aaff99', '#ffbb33', '#60a3bc'],
        data: [] // This will be filled dynamically
      }]
    });

    


    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Technician’s Workload Distribution'
      }
    };

    const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/workload-chart');
    console.log(response.data)
    employees.value = response.data;

    // Check if at least one employee exists and then fetch data for the first one
    if (employees.value.length > 0) {
      fetchEmployeeData(employees.value[0].EmployeeID);
    }
  } catch (error) {
    console.error('Error fetching workload data:', error);
  }
};


    // Function to fetch data for a specific employee
    const fetchEmployeeData = async (employeeId) => {
      try {
        const response = await axios.get(`http://localhost:3000/api/employee-data/${employeeId}`);
        // Process and update the chart with this specific employee's data
        updateChartDataForEmployee(response.data);
        console.log('employee',response.data)
      } catch (error) {
        console.error(`Error fetching data for employee ${employeeId}:`, error);
      }
    };

    const chartInstance = ref(null);

    // Function to update chart data for a specific employee
    const updateChartDataForEmployee = (employeeData) => {
    if (employeeData.length === 0) {
        console.error('No data received for the employee');
        return;
    }

    const employee = employeeData[0];
    chartData.value.labels = ['Small Jobs', 'Medium Jobs', 'Large Jobs', 'X-Large Jobs'];
    chartData.value.datasets[0].data = [
        employee.SmallJobs,
        employee.MediumJobs,
        employee.LargeJobs,
        employee.XLargeJobs
    ];
    // Set the chart title to the selected employee's first name
    chartOptions.title.text = `${employee.FirstName}'s Workload Distribution`;
    console.log('title',chartOptions.title.text)
    


    // Update the chart
    updateChart();
    };

    // You'll also need a method to update the chart instance
    const updateChart = () => {
        
    if (chartInstance.value) {
        chartInstance.value.destroy(); // Destroy the current instance before creating a new one
    }
    chartInstance.value = new Chart(pieChartCanvas.value.getContext('2d'), {
        type: 'pie',
        data: chartData.value,
        options: chartOptions
    });
    };


    

    onMounted(async () => {

        await fetchData(); // Fetch data and implicitly set the chart for the first employee
    // Do not create the chart here anymore
    });


    return {
    pieChartCanvas,
    employees,
    fetchEmployeeData,
    // Include the chartInstance in the returned object if you need to access it elsewhere
    chartInstance
    };
  }
}
</script>

<style>
.workload-chart {
  width: 400px;
  height: 400px;
  margin-top: 20px; /* Optional: Adds some space above the chart */
}

/* New style for the container of the buttons */
.employee-buttons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centers items horizontally */
  align-items: center; /* Centers items vertically */
  gap: 10px;
  margin-bottom: 20px;
}

/* Optional: Style for individual buttons */
.employee-button {
  padding: 5px 10px; /* Adjust padding as needed */
  border: 1px solid #ddd; /* Optional: Adds a border to the buttons */
  border-radius: 4px; /* Optional: Rounds the corners of the buttons */
  background-color: #f5f5f5; /* Optional: Background color */
  cursor: pointer; /* Changes cursor to pointer on hover */
}
</style>
