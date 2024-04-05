const NAVASIDE = document.querySelector('aside');

NAVASIDE.innerHTML = `
<!-- Encabezado de la barra lateral -->
            <div class="d-flex">
                <!-- Botón de toggle para expandir/cerrar el sidebar -->
                <button class="toggle-btn" type="button">
                    <!-- Logotipo de la academia -->
                    <img src="imagenes/logoAcademiaBP.png" alt="..." width="50px" height="50px">
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
                    <img src="imagenes/home.png" alt="..." width="30px" height="30px" class="avatar img-fluid">
                        <span>Inicio</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                    <img src="imagenes/products.png" alt="..." width="30px" height="40px" class="avatar img-fluid">
                        <span>Productos</span>
                    </a>
                </li>
                <!-- Elemento con submenú colapsable -->
                
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                    <img src="imagenes/pagosmen.png" alt="..." width="30px" height="30px" class="avatar img-fluid">
                        <span>Pagos de mensualidad</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                    <img src="imagenes/alumnos.png" alt="..." width="30px" height="30px" class="avatar img-fluid">
                        <span>Alumnos</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                    <img src="imagenes/staffequipo.png" alt="..." width="30px" height="30px" class="avatar img-fluid">
                        <span>Staff</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                    <img src="imagenes/cosnutar.png" alt="..." width="30px" height="30px" class="avatar img-fluid">
                        <span>Consultas</span>
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
