const HEADER = document.querySelector('header');
HEADER.innerHTML = `
<!-- Parte de arriba del header -->

<div class="container-fluid text-center mt-3">
            <div class="row"> <!---->
                <div class="col-lg-4 col-md-3 col-sm-4 col-6 ">
                    <!-- Contenedor con un display flex para alinear elementos horizontalmente -->
                    <div class="d-flex align-items-center mt-2">
                        <img src="../../../resources/images/soporte-tecnico-colorNegro.png" class="mt-4 me-1" alt="..."
                            height="40px" width="40px">
                        <div class="texto mt-4">
                            <span class="d-block texto1">Soporte técnico</span>
                            <!--Los elementos d-block nos ayudan a separar los span de modo que cada span se colocará debajo del otro-->
                            <!-- Segundo span con ajuste de margen superior negativo para colocarlo debajo del primer span -->
                            <span class="d-block mt-n2 texto2">+503 0000-0000</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-5 col-sm-5 col-6 align-self-center">
                    <a href="index.html">
                        <img src="../../../resources/images/logoAcademiaBP.png" alt="..." height="120px" width="120px">
                    </a>
                </div>

                <div class="mt-5 text-end col-lg-2 col-md-1 col-sm-1 col-6">
                <a href="perfil.html">
                    <img src="../../../resources/images/userIcon.png" class="me-5 mt-2 imagenUser text-end" alt="..."
                        width="30px" height="30px">
                </a>
                </div>
                <div class="mt-5 text-start col-lg-2 col-md-2 col-sm-2 col-6">
                    <button class="btn botonCarrito">
                        <img src="../../../resources/images/cesta2.png" alt="..." width="30px" height="30px"
                            class="me-1">
                        <span class="text" id="textoCarrito">Carrito de compras</span>
                    </button>

                </div>

            </div>
        </div>

        <!--Parte de abajo del navBar-->
        <div class="container-fluid text-center mt-2 conteNav">
            <div class="row">
                <div class="col">
                    <nav class="navbar navbar-expand-lg">
                        <div class="container-fluid">
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto">

                                    <li class="nav-item col-lg-3 col-md-12 text-start"><a class="nav-link me-2 text-white" href="#categorias">
                                            <img src="../../../resources/images/categorias.png" alt="..." width="20px"
                                                height="20px" class="me-2">Categorías</a>
                                    </li>

                                    <li class="nav-item col-lg-5 col-md-12 text-start"><a class="nav-link me-3 text-white" href="#">
                                            <img src="../../../resources/images/mensualidad.png" alt="..." width="20px"
                                                height="20px" class="me-1"> Pagos de mensualidad</a></li>

                                    <li class="nav-item col-lg-4 col-md-12 text-start"><a class="nav-link me-3 text-white" href="miscompras.html">
                                            <img src="../../../resources/images/cesta.png" alt="..." width="20px"
                                                height="20px" class="me-1"> Mis compras</a></li>

                                    <li class="nav-item col-lg-3 col-md-12 text-start">
                                        <a class="nav-link me-2 text-white" href="../about us/index.html">
                                            <img src="../../../resources/images/nosotros.png" class="me-1" alt="..."
                                                height="25px" width="25px">
                                            Conócenos
                                        </a>
                                    </li>

                                </ul>
                                <form class="d-flex justify-content-lg-end justify-content-md-end justify-content-sm-end justify-content-end
                                 position-relative col-lg-3 col-md-12 col-sm-12 col-10" role="search">
                                    <input class="form-control me-2 textoBuscar rounded-4" type="search"
                                        placeholder="Buscador de productos" aria-label="Search">
                                    <button type="submit"
                                        class="btn btn-link p-0 position-absolute end-0 align-middle lupa">
                                        <img src="../../../resources/images/lupa.png" id="imagenLupa" class="mt-1 mb-1"
                                            alt="..." width="20px" height="20px">
                                    </button>
                                </form>

                            </div>

                        </div>
                    </nav>
                </div>

            </div>
        </div>

`;