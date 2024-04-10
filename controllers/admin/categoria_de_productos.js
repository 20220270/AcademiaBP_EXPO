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
            <div class="container py-5">
            <span class="position-absolute top-0 end-0 m-2">
    <i class="bi bi-plus-circle fs-3 text-dark"></i>
</span>
<div class="row">
        <div class="col-md-4 py-5 px-5">
            <div class="py-5 rounded p-3 bg-success text-white text-center mb-3">
                <p class="m-0">Botellas</p>
            </div>
        </div>
        <div class="col-md-4 py-5 px-5">
            <div class="py-5 rounded p-3 bg-success text-white text-center mb-3">
                <p class="m-0">Camisas</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 py-5 px-5">
            <div class="py-5 rounded p-3 bg-success text-white text-center mb-3">
                <p class="m-0">Pelotas</p>
            </div>
        </div>
        <div class="col-md-4 py-5 px-5">
            <div class="py-5 rounded p-3 bg-success text-white text-center mb-3">
                <p class="m-0">Guantes</p>
            </div>
        </div>
    </div>
</div>

        </div>
    </div>
</div>
`;
contenedorMenu.innerHTML = menuHTML;

