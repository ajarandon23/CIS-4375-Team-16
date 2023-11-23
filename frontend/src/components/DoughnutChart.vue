<template>
    <div class="doughnut-chart">
      <canvas ref="doughnutChartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  import axios from 'axios'; // Import Axios like this
  
  export default {
    data() {
      return {
        chart: null,
      };
    },
    mounted() {
      this.fetchDepartmentDataAndCreateChart();
    },
    methods: {
      async fetchDepartmentDataAndCreateChart() {
        try {
          const response = await axios.get('http://localhost:3000/api/departments-count');
          
          this.createDoughnutChart(response.data);
        } catch (error) {
          console.error('Error fetching department data:', error);
        }
      },
      createDoughnutChart(departmentData) {
        const ctx = this.$refs.doughnutChartCanvas.getContext('2d');
        const data = {
          labels: departmentData.map(item => item.DepartmentName),
          datasets: [{
            label: 'Number of Cars',
            data: departmentData.map(item => item.NumberOfCars),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        };
        this.chart = new Chart(ctx, {
          type: 'doughnut',
          data: data,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Vehicles in repair',
                font: {
                  size:25,
                  weight: 'bold',
                  family: 'Arial, sans-serif'
                },
                color: '#333'
              }
            }
          }
        });
      }
    }
  };
  </script>
<style>
.doughnut-chart {
  width: 400px;
  height: 400px;
  margin-top: 20px; /* Optional: Adds some space above the chart */
}
</style>
  