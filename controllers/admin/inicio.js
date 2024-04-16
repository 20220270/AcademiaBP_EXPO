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
                        <i class="lni lni-user"></i>
                        <span>inicio</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-agenda"></i>
                        <span>Categoria Productos</span>
                    </a>
                </li>

                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-agenda"></i>
                        <span>Pagos dde Mensualidad</span>
                    </a>
                </li>

                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-agenda"></i>
                        <span>Alumnos</span>
                    </a>
                </li>

                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-agenda"></i>
                        <span>Inscripciones</span>
                    </a>
                </li>

                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-agenda"></i>
                        <span>Categoria Productos</span>
                    </a>
                </li>



               
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-popup"></i>
                        <span>Profesores</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-cog"></i>
                        <span>Entrenamientos</span>
                    </a>
                </li>
            </ul>
            <div class="sidebar-footer">
                <a href="#" class="sidebar-link">
                    <i class="lni lni-exit"></i>
                    <span>Cerrar sesiòn</span>
                </a>
            </div>
        </aside>
        <div class="main p-3">
            <div class="text-center">
                <h1>
                Categoria Productos
                </h1>

            </div>
        </div>
    </div>
`;
contenedorMenu.innerHTML = menuHTML;

