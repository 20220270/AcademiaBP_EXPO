const NAVASIDE = document.querySelector('aside');

NAVASIDE.innerHTML = `
<!-- Encabezado de la barra lateral -->
            <div class="d-flex">
                <!-- Botón de toggle para expandir/cerrar el sidebar -->
                <button class="toggle-btn" type="button">
                    <!-- Logotipo de la academia -->
                    <img src="/resources/images/logoAcademiaBP.png" alt="..." width="50px" height="50px">
                </button>
                <!-- Nombre de la academia -->
                <div class="sidebar-logo">
                    <a href="#">Academia BP</a>
                </div>
            </div>
            <!-- Lista de navegación en la barra lateral -->
            <ul class="sidebar-nav">
                <!-- Elementos de la lista de navegación -->
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                    <img src="/resources/images/home.png" alt="..." width="30px" height="30px" class="avatar img-fluid">
                        <span>Inicio</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                    <img src="/resources/images/products.png" alt="..." width="30px" height="40px" class="avatar img-fluid">
                        <span>Productos</span>
                    </a>
                </li>
                <!-- Elemento con submenú colapsable -->
                
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                    <img src="/resources/images/pagosmen.png" alt="..." width="30px" height="30px" class="avatar img-fluid">
                        <span>Pagos de mensualidad</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                    <img src="/resources/images/alumnos.png" alt="..." width="30px" height="30px" class="avatar img-fluid">
                        <span>Alumnos</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                    <img src="/resources/images/staffequipo.png" alt="..." width="30px" height="30px" class="avatar img-fluid">
                        <span>Staff</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                    <img src="/resources/images/cosnutar.png" alt="..." width="30px" height="30px" class="avatar img-fluid">
                        <span>Consultas</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                    <img src="/resources/images/home.png" alt="..." width="30px" height="30px" class="avatar img-fluid">
                        <span>Mi perfil</span>
                    </a>
                </li>
                
            </ul>
            <!-- Pie de página de la barra lateral -->
            <div class="sidebar-footer">
                <a href="#" class="sidebar-link">
                <img src="imagenes/cerrarsesion.png" alt="..." width="30px" height="30px" class="avatar img-fluid">
                    <span>Cerrar sesión</span>
                </a>
            </div>
`;


// Selecciona el elemento del botón de toggle con la clase "toggle-btn"
const MENU = document.querySelector(".toggle-btn");

// Agrega un event listener para el evento de clic al botón de toggle
MENU.addEventListener("click", function () {
  // Selecciona el elemento del sidebar utilizando su ID y le togglea la clase "expand"
  // Esto añade o remueve la clase "expand" al sidebar, lo que controla su expansión y contracción
  document.querySelector("#sidebar").classList.toggle("expand");
});

//Grafico de productos
const ctx = document.getElementById('graficoProductos');
const grafico2 = document.getElementById('graficoAlumnos');
const grafic3 = document.getElementById('graficoValoraciones');
const grafic4 = document.getElementById('graficoCategoriasAlumnos');

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
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });


  new Chart(grafico2, {
    type: 'line',
    data: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [{
        label: 'Alumnos inscritos por mes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        backgroundColor: '#408840'
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



  new Chart(grafic3, {
    type: 'bar',
    data: {
      labels: ['Mochilas', 'Gorras', 'Botellas', 'Uniformes', 'Lapiceros', 'Chumpas'],
      datasets: [{
        label: 'Productos mejor valorados',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        backgroundColor: '#408840'
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

  new Chart(grafic4, {
    type: 'bar',
    data: {
      labels: ['Baby Soccer', 'Nivel 5', 'Nivel 6', 'Primera Aficionado', 'Nivel 4', 'Nivel 3'],
      datasets: [{
        label: 'Categorías con más alumnos',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        backgroundColor: '#408840'
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
