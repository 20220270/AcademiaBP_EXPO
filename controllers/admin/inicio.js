const contenedorMenu = document.querySelector('#contenedor-menu');

const menuHTML = `
<!-- Menú lateral -->
<div class="container-fluid">
        <div class="row flex-nowrap">
            <div class="bg-black col-auto col-md-3 min-vh-100 col-lg-3 ">
                <div class="bg-black p-2">
                    <a class="d-flex text-decoration-none mt-1 align-items-center ">
                        <span class="fs-4 d-none d-sm-inline"><img src="/resources/images/logoAcademiaBP.png" alt="Logo"width="120px" height="125px" style="margin-left: 90px;">
                        </span>
                    </a>
                    <ul class="nav nav-pills flex-column">
                        <li class="nav-item ">
                            <a href="" class="nav-link active bg-black mt-3" aria-current="page">
                                <i class="bi bi-house-door fs-4 me-2"></i><span class="ms-1 d-none d-sm-inline">Home</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link active bg-black mt-3">
                                <i class="bi bi-sliders fs-4 me-2" ></i><span class="ms-1 d-none d-sm-inline">Categoria de productos</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link active bg-black mt-3">
                                <i class="fa-solid fa-money-bills fs-4 me-2"></i><span class="ms-1 d-none d-sm-inline">productos</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link active bg-black mt-3">
                                <i class="fas fa-hand-holding-usd fs-4 me-2"></i><span class="ms-1 d-none d-sm-inline">Pagos de mensualidad</span> 
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link active bg-black mt-3">
                                <i class="bi bi-person-vcard fs-4 me-2"></i><span class="ms-1 d-none d-sm-inline">Alumnos</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link active bg-black mt-3">
                                <i class="bi bi-journal-text fs-4 me-2"></i><span class="ms-1 d-none d-sm-inline">Inscripciones</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link active bg-black mt-3">
                                <i class="fas fa-chalkboard-teacher fs-4 me-2"></i><span class="ms-1 d-none d-sm-inline">Profesores</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link active bg-black mt-3">
                                <i class="fa-solid fa-table-cells fs-4 me-2"></i><span class="ms-1 d-none d-sm-inline">Categoria de alumnos</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link active bg-black mt-4">
                                <i class="bi bi-box-arrow-right fs-4 me-2"></i><span class="ms-1 d-none d-sm-inline">Cerrar Sesion</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-9">
            <div class="container mt-5">
                <div style="margin-left: 100px;">
                <h1>Bienvenido usuario</h1>
                <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text bg-white border-right-0"><i class="fas fa-search text-dark p-1"></i></span>
                                </div>
                                <input type="text" class="form-control border-left-0" placeholder="Buscar">
                            </div>
                            <div class="overflow-x-auto" style="max-height: 700px;">
                            <div class="col-md-6">
                                <div class="d-flex">
                                    <img class="px-5" src="https://img.freepik.com/foto-gratis/vista-balon-futbol-campo_23-2150885897.jpg" alt="Imagen" class="img-fluid mt-3 mr-2" style="max-width: 750px;">
                                    <img class="px-5" src="https://www.tudn.com/api/image/x/us/futbol" alt="Imagen" class="img-fluid mt-3 mr-2" style="max-width: 750px;">
                                    <img class="px-5" src="https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?cs=srgb&dl=pexels-pixabay-274422.jpg&fm=jpg" alt="Imagen" class="img-fluid mt-3" style="max-width: 750px;">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;
contenedorMenu.innerHTML = menuHTML;

