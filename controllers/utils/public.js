/*
*   Controlador es de uso general en las páginas web del sitio público.
*   Sirve para manejar las plantillas del encabezado y pie del documento.
*/

// Constante para completar la ruta de la API.
const USER_API = 'services/public/cliente.php';

// Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');


MAIN.classList.add('container-fluid');

//Agregamos estilos para eliminar todo el margen que nos genera el contenedor fluid
MAIN.style.marginLeft = '0';
MAIN.style.marginRight = '0';
MAIN.style.paddingLeft = '0';
MAIN.style.paddingRight = '0';

/*  Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/


const loadTemplate = async () => {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'getUser');
    // Se comprueba si el usuario está autenticado para establecer el encabezado respectivo.
    if (DATA.session) {
        // Se verifica si la página web no es el inicio de sesión, de lo contrario se direcciona a la página web principal.
        if (!location.pathname.endsWith('registrosesion.html')) {
            // Se agrega el encabezado de la página web antes del contenido principal.
            MAIN.insertAdjacentHTML('beforebegin', `
                <header>
                    <div class="container-fluid text-center mt-3">
            <div class="row"> <!---->
                <div class="col-lg-4 col-md-3 col-sm-4 col-4">
                    <!-- Contenedor con un display flex para alinear elementos horizontalmente -->
                    <div class="d-flex align-items-center mt-2">
                        <img src="../../resources/images/soporte-tecnico-colorNegro.png" class="mt-4 me-1 iconoito" alt="..."
                            height="40px" width="40px">
                        <div class="texto mt-4">
                            <span class="d-block texto1">Soporte técnico</span>
                            <!--Los elementos d-block nos ayudan a separar los span de modo que cada span se colocará debajo del otro-->
                            <!-- Segundo span con ajuste de margen superior negativo para colocarlo debajo del primer span -->
                            <span class="d-block mt-n2 texto2">+503 0000-0000</span>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-5 col-1 align-self-center">
                    <a href="index.html">
                        <img src="../../resources/images/logoAcademiaBP.png" alt="..." height="120px" width="120px" id="imagenLogoA">
                    </a>
                </div>

                <div class="mt-5 text-end col-lg-2 col-md-1 col-sm-1 col-6">
                <a href="perfil.html">
                    <img src="../../resources/images/userIcon.png" class="mt-2 imagenUser text-end" alt="..."
                        width="30px" height="30px">
                </a>
                </div>

                <div class="mt-5 text-end col-lg-2 col-md-2 col-sm-2 col-3">
                <a href="carrito.html"><img src="../../resources/images/cart-dark.png" alt="..." width="25px"
                                            height="25px" class="me-5 mt-2 imagenUser"></a>
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
                            <div class="collapse navbar-collapse " id="navbarSupportedContent">
                                <ul class="navbar-nav">

                                    <li class="nav-item col-lg-2 col-md-12 text-start"><a class="nav-link me-1 text-white" href="index.html#categorias">
                                            <img src="../../resources/images/categorias.png" alt="..." width="20px"
                                                height="20px" class="me-2">Categorías</a>
                                    </li>

                                    <li class="nav-item col-lg-3 col-md-12 text-start"><a class="nav-link me-1 text-white" href="index.html#familia">
                                            <img src="../../resources/images/camera.png" alt="..." width="20px"
                                                height="18px" class="me-2">Familia Academia</a>
                                    </li>  

                                    <li class="nav-item col-lg-3 col-md-12 text-start"><a class="nav-link me-1 text-white" href="index.html#ayuda">
                                            <img src="../../resources/images/help.png" alt="..." width="20px"
                                                height="20px" class="me-2">¿Necesitas ayuda?</a>
                                    </li>

                                        
                                    <li class="nav-item col-lg-3 col-md-12 text-start"><a class="nav-link me-4 text-white" href="miscompras.html">
                                            <img src="../../resources/images/cesta.png" alt="..." width="25px"
                                                height="25px" class="me-1"> Mis compras</a></li>


                                    <li class="nav-item col-lg-5 col-md-12 text-start">
                                        <a class="nav-link me-2 text-white" href="conocenos.html">
                                            <img src="../../resources/images/nosotros.png" class="me-1" alt="..."
                                                height="25px" width="25px">
                                            Conócenos
                                        </a>
                                    </li>

                                </ul>

                            </div>

                        </div>
                    </nav>
                </div>

            </div>
        </div>

                </header>
            `);
        } else {
            location.href = 'index.html';
        }
    } else {
        // Se agrega el encabezado de la página web antes del contenido principal.
        MAIN.insertAdjacentHTML('beforebegin', `
            <header>
            <div class="container-fluid text-center mt-3">
            <div class="row"> <!---->
                <div class="col-lg-4 col-md-3 col-sm-4 col-6 ">
                    <!-- Contenedor con un display flex para alinear elementos horizontalmente -->
                    <div class="d-flex align-items-center mt-2">
                        <img src="../../resources/images/soporte-tecnico-colorNegro.png" class="mt-4 me-1" alt="..."
                            height="40px" width="40px" id="imagenita">
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
                        <img src="../../resources/images/logoAcademiaBP.png" alt="..." height="120px" width="120px" id="imagenLogoA">
                    </a>
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

                                    <li class="nav-item col-lg-4 col-md-12 text-start"><a class="nav-link me-2 text-white" href="index.html#categorias">
                                            <img src="../../resources/images/categorias.png" alt="..." width="20px"
                                                height="20px" class="me-2">Categorías</a>
                                    </li>

                                    <li class="nav-item col-lg-5 col-md-12 text-start">
                                        <a class="nav-link me-2 text-white" href="conocenos.html">
                                            <img src="../../resources/images/nosotros.png" class="me-1" alt="..."
                                                height="25px" width="25px">
                                            Conócenos
                                        </a>
                                    </li>

                                    <li class="nav-item col-lg-5 col-md-12 text-start">
                                        <a class="nav-link me-2 text-white" href="registrosesion.html">
                                            <img src="../../resources/images/nosotros.png" class="me-1" alt="..."
                                                height="25px" width="25px">
                                            Iniciar sesión
                                        </a>
                                    </li>

                                </ul>

                            </div>

                        </div>
                    </nav>
                </div>

            </div>
        </div>

            </header>
        `);
    }
    // Se agrega el pie de la página web después del contenido principal.
    MAIN.insertAdjacentHTML('afterend', `
        <footer>
        <div class="text-center">
            <h2 class="mt-2">Nuestras redes sociales</h2>
        </div>

        <div class="container text-center iconos mt-4">
            <div class="row">
                <div class="col">
                    <a href="https://www.facebook.com/academiafcelsalvador" target="_blank" class="aa">
                        <img src="../../resources/images/logoFacebook.png" alt="Facebook" width="35px" height="35px">

                        <span>La Academia FC</span>
                    </a>
                </div>
                <div class="col">
                    <a href="https://www.instagram.com/academiabp.sv/" target="_blank" class="aa">
                        <img src="../../resources/images/logoInsta.png" alt="Instagram" width="35px" height="35px">

                        <span>academiafc.sv</span>
                    </a>
                </div>
                <div class="col">
                    <a href="https://www.instagram.com/adacademiabp/" target="_blank" class="aa">
                        <img src="../../resources/images/logoInsta.png" alt="Instagram" width="35px" height="35px">

                        <span>adacademiabp</span>
                    </a>
                </div>
                <div class="col">
                    <h6 class="d-block">No olvides utlizar el</h6>
                    <h6>#SomosAcademia</h6>
                </div>
            </div>
        </div>
        <div class="row filaCopy">
            <div class="col-md-12 text-center">
                <p>&copy; 2024 Copyright <a href="#" class="text-white">Academia BP</a></p>
            </div>
        </div>
        </footer>
    `);
}