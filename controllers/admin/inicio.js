const contenedorMenu = document.querySelector('#contenedor-menu');

const menuHTML = `

<link rel="stylesheet" href="/resources/css/privado/navbar.css">


<!-- Menú lateral -->
<nav class="navbar navbar-dark bg-black fixed-top ">
        <div class="container-fluid">
            <img src="/resources/images/logoAcademiaBP.png" class="position-absolute top  end-0" alt="Logo" width=60px" height="60px">
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header bg-black">
                    <img src="/resources/images/logoAcademiaBP.png" class="position-absolute top-0 start-50 translate-middle-x" alt="Logo" width="60px" height="60px">
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body bg-black">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3 mt-3">
                        <li class="nav-item ">
                            <a href="/views/admin/inicio.html" class="nav-link active bg-black mt-3" aria-current="page">
                                <i class="bi bi-house-door fs-4 me-2"></i><span
                                    class="ms-1 d-none d-sm-inline text-white">Inicio</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/views/admin/categorias_de_producto.html" class="nav-link active bg-black mt-3">
                                <i class="bi bi-sliders fs-4 me-2"></i><span
                                    class="ms-1 d-none d-sm-inline text-white">Categoria
                                    de productos</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/views/admin/productos.html" class="nav-link active bg-black mt-3">
                                <i class="fa-solid fa-money-bills fs-4 me-2"></i><span
                                    class="ms-1 d-none d-sm-inline text-white">productos</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/views/admin/cancelacion_alumnos.html" class="nav-link active bg-black mt-3">
                                <i class="fas fa-hand-holding-usd fs-4 me-2"></i><span
                                    class="ms-1 d-none d-sm-inline text-white">Pagos de mensualidad</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link active bg-black mt-3">
                                <i class="bi bi-person-vcard fs-4 me-2"></i><span
                                    class="ms-1 d-none d-sm-inline text-white">Alumnos</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link active bg-black mt-3">
                                <i class="bi bi-journal-text fs-4 me-2"></i><span
                                    class="ms-1 d-none d-sm-inline text-white">Inscripciones</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link active bg-black mt-3">
                                <i class="fas fa-chalkboard-teacher fs-4 me-2"></i><span
                                    class="ms-1 d-none d-sm-inline text-white">Profesores</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/views/admin/categorias_de_alumnos.html" class="nav-link active bg-black mt-3">
                                <i class="fa-solid fa-table-cells fs-4 me-2"></i><span
                                    class="ms-1 d-none d-sm-inline text-white">Categoria de alumnos</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link active bg-black mt-4">
                                <i class="bi bi-box-arrow-right fs-4 me-2"></i><span
                                    class="ms-1 d-none d-sm-inline text-white ">Cerrar Sesion</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
`;
contenedorMenu.innerHTML = menuHTML;

