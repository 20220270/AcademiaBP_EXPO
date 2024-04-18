const ctx = document.getElementById('graficoProductos');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mochilas', 'Gorras', 'Botellas', 'Uniformes', 'Lapiceros', 'Chumpas'],
        datasets: [{
            label: 'Total de ventas en el mes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
            backgroundColor: '#408840'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});





