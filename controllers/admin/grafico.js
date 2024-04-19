const ctx = document.getElementById('graficoProductos');


// setup 
const data = {
    labels: ['Mochilas', 'Gorras', 'Botellas', 'Uniformes', 'Lapiceros', 'Chumpas'],
    datasets: [{
      label: 'Weekly Sales',
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor:'#408840',
    }]
  };

  // config 
  const config = {
    type: 'bar',
    data,
    options: {
        maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  // render init block
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

  // Instantly assign Chart.js version
  const chartVersion = document.getElementById('chartVersion');
  chartVersion.innerText = Chart.version;