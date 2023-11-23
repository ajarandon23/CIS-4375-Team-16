<template>
    <div>
      <canvas id="workloadChart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  
  export default {
    name: 'WorkloadChart',
    props: {
      employeeData: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.createChart(this.employeeData);
    },
    methods: {
      createChart(data) {
        const ctx = document.getElementById('workloadChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Small Jobs', 'Medium Jobs', 'Large Jobs', 'Extra Large Jobs'],
            datasets: [{
              label: `Workload for ${data.employeeName}`,
              data: [data.smallJobs, data.mediumJobs, data.largeJobs, data.xLargeJobs],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }
  </script>
  