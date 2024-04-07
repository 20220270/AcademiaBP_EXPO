const contenedorMenu = document.querySelector('#contenedor-menu');

const menuHTML = `
<!-- Menú lateral -->
<div class="menu-lateral">
    <!-- Encabezado de la barra lateral -->
    <div class="d-flex justify-content-between align-items-center px-4">
        <!-- Botón de toggle para expandir/cerrar el sidebar -->
        <button class="toggle-btn" type="button">
            <!-- Logotipo de la academia -->
            <img src="/resources/images/logoAcademiaBP.png" alt="..." width="100px" height="100px">
        </button>
        <!-- Nombre de la academia -->
        <div class="sidebar-logo"></div>
    </div>
    <div class="wrapper d-flex flex-column mt-3">
        <ul class="nav flex-column pl-0">
            <li class="nav-item">
                <a class="nav-link text-white" href="#">
                    <i class="bi bi-house-door" style="font-size: 1.7rem; color: #006400;"></i>
                    Inicio
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="#">
                    <i class="bi bi-inboxes" style="font-size: 1.7rem; color: #006400;"></i>                        
                    Categorias de Productos
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="#">
                    <i class="bi bi-box-seam" style="font-size: 1.7rem; color: #006400;"></i>                        
                    Productos
                </a>
            </li>
            <!-- Elemento con submenú colapsable -->
            <li class="nav-item">
                <a class="nav-link text-white" href="#">
                    <i class="bi bi-cash-stack" style="font-size: 1.7rem; color: #006400;"></i>
                    Pagos de mensualidad
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="#">
                    <i class="bi bi-file-person" style="font-size: 1.7rem; color: #006400;"></i>
                    Alumnos
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="#">
                    <i class="bi bi-people" style="font-size: 1.7rem; color: #006400;"></i>
                    Staff
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="#">
                    <i class="bi bi-chat-left-dots" style="font-size: 1.7rem; color: #006400;"></i>
                    Consultas
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="#">
                    <i class="bi bi-arrow-left" style="font-size: 1.7rem; color: #006400;"></i>
                    Cerrar Sesion
                </a>
            </li>
        </ul>
    </div>
</div>
`;
contenedorMenu.innerHTML = menuHTML;

