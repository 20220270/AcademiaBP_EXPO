const contenedorMenu = document.querySelector('#contenedor-menu');

const menuHTML = `

<link rel="stylesheet" href="/resources/css/privado/sidebar.css">


<!-- Menú lateral -->
<div class="wrapper">
        <aside id="sidebar">
            <div class="d-flex">
                <button class="toggle-btn" type="button">
                    <img src="../../resources/images/logoAcademiaBP.png" alt="" width="30px" height="30px">
                </button>
                <div class="sidebar-logo">
                    <a href="#">Menú</a>
                </div>
            </div>
            <ul class="sidebar-nav">
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-home"></i>
                        <span>inicio</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                        data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                        <i class="lni lni-agenda"></i>
                        <span>Categorias</span>
                    </a>
                    <ul id="auth" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li class="sidebar-item">
                            <a href="#" class="sidebar-link">Categoria Productos</a>
                        </li>
                        <li class="sidebar-item">
                            <a href="#" class="sidebar-link">Categoria Alumnos</a>
                        </li>
                    </ul>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-shopping-basket"></i>
                        <span>Productos</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-graduation"></i>
                        <span>Alumnos</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-dollar"></i>
                        <span>Pagos de Mensualidad</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-book"></i>
                        <span>Inscripciones</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-certificate"></i>
                        <span>Profesores</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-basketball"></i>
                        <span>Entrenamientos</span>
                    </a>
                </li>

                <li class="sidebar-item">
                    <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                        data-bs-target="#auth23" aria-expanded="false" aria-controls="auth">
                        <i class="lni lni-cogs"></i>
                        <span>Opciones de usuaio</span>
                    </a>
                    <ul id="auth23" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li class="sidebar-item">

                            <a href="#" class="sidebar-link "> <i class="lni lni-user"></i>
                                Ver perfil</a>

                        </li>
                        <li class="sidebar-item">
                            <a href="#" class="sidebar-link"> <i class="lni lni-exit"></i>Cerrar Sesión</a>
                        </li>
                    </ul>
                </li>


            </ul>

        </aside>
        <div class="main p-3">
            <div class="text-center">
                <h1>Categoria Alumnos</h1>
                <div class="scrollable-content">
                    
                </div>
            </div>
        </div>
    </div>
`;
contenedorMenu.innerHTML = menuHTML;

function Menu() {
    window.location.href = "../../views/admin/Menu.html";
  }
  
  function categoriaAlumnos() {
    window.location.href = "../../views/admin/categoriaAlumnos.html";
  }
  
  function categoriaProductos() {
    window.location.href = "../../views/admin/categoriaProductos.html";
  }
  
  function productosP() {
    window.location.href = "../../views/admin/productosP.html";
  }
  
  function pagosDeMensualidad() {
    window.location.href = "../../views/admin/pagosDeMensualidad.html";
  }
  
  function cancelacion_alumnos() {
    window.location.href = "../../views/admin/cancelacion_alumnos.html";
  }
  
  function A() {
    window.location.href = "../../views/admin/Menu.html";
  }
  
  function categoriaProfesores() {
    window.location.href = "../../views/admin/categoriaAlumnos.html";
  }
  
  function A() {
    window.location.href = "../../views/admin/index.html";
  }
  
  function A() {
    window.location.href = "../../views/admin/Menu.html";
  }
  
  function index() {
    window.location.href = "../../views/admin/index.html";
  }