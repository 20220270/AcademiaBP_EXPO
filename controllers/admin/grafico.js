const ctx = document.getElementById('graficoProductos');


// setup 
const data = {
    labels: ['Mochilas', 'Gorras', 'Botellas', 'Uniformes', 'Lapiceros', 'Chumpas'],
    datasets: [{
      label: 'Venta mensuales',
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



// setup 
const data2 = {
    labels: ['Sub20', 'Primera division', 'Sub17', 'Segunda division'],
    datasets: [{
      label: 'Categorias de alumnos',
      data: [20, 14, 8, 6],
      backgroundColor:'#ff',
      color: '#408840'
    }]
  };

  // config 
  const config2 = {
    type: 'bar',
    data: data2,
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
  const myChart2 = new Chart(
    document.getElementById('myChart2'),
    config2
  );

  // Instantly assign Chart.js version
  const chartVersion = document.getElementById('chartVersion');
  chartVersion.innerText = Chart.version;