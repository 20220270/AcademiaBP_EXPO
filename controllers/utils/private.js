/*
*   Controlador de uso general en las páginas web del sitio privado.
*   Sirve para manejar la plantilla del encabezado y pie del documento.
*/

// Constante para completar la ruta de la API.
const USER_API = 'services/admin/administrador.php';
// Constante para establecer el elemento del contenido principal.
const MAIN = document.querySelector('main');

MAIN.classList.add('container');



/*  Función asíncrona para cargar el encabezado y pie del documento.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const loadTemplate = async () => {
    
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'getUser');
    // Se verifica si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
    if (DATA.session) {
        // Se comprueba si existe un alias definido para el usuario, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se agrega el encabezado de la página web antes del contenido principal.
            MAIN.insertAdjacentHTML('beforebegin', `

            <aside id="sidebar" class="vh-100">
                <div class="d-flex">
                    <button class="toggle-btn" type="button">
                        <img src="../../resources/images/logoAcademiaBP.png" alt="" width="30px" height="30px">
                    </button>
                    <div class="sidebar-logo">
                        <a href="menu.html">Menú</a>
                    </div>
                </div>

                <ul class="sidebar-nav">
                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse" data-bs-target="#auth456" aria-expanded="false" aria-controls="auth">
                        <i class="lni lni-home"></i>
                        </a>
                        <ul id="auth456" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li class="sidebar-item">
                        <a href="menu.html" class="sidebar-link">
                            <i class="lni lni-home"></i>
                            Inicio
                        </a>
                        </li>
                        </ul>
                    </li>

                    

                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse" data-bs-target="#auth456" aria-expanded="false" aria-controls="auth">
                            <i class="lni lni-agenda icon-redirect"></i>
                        </a>
                        <ul id="auth456" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            <li class="sidebar-item">
                                <a href="categoriaProductos.html" class="sidebar-link">
                                    <i class="lni lni-agenda"></i>
                                    Categorías de productos
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse" data-bs-target="#auth456" aria-expanded="false" aria-controls="auth">
                            <i class="lni lni-shopping-basket"></i>
                        </a>
                        <ul id="auth456" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            
                                <li class="sidebar-item">
                                    <a href="productos.html" class="sidebar-link">
                                <i class="lni lni-shopping-basket"></i>
                                    Productos
                                    </a>
                                </li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse" data-bs-target="#auth456" aria-expanded="false" aria-controls="auth">
                        <i class="lni lni-graduation"></i>
                        </a>
                        <ul id="auth456" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            
                               
                            <li class="sidebar-item">
                            <a href="alumnostotal.html" class="sidebar-link">
                        <i class="lni lni-graduation"></i>
                        Alumnos
                        </a>
                        </li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse" data-bs-target="#auth456" aria-expanded="false" aria-controls="auth">
                        <i class="lni lni-dollar"></i>
                        </a>
                        <ul id="auth456" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            
                        <li class="sidebar-item">
                        <a href="pagosdemensualidad.html" class="sidebar-link">
                        <i class="lni lni-dollar"></i>
                            Pagos de mensualidad
                        </a>
                    </li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse" data-bs-target="#auth456" aria-expanded="false" aria-controls="auth">
                        <i class="lni lni-book"></i>
                        </a>
                        <ul id="auth456" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                            
                        <li class="sidebar-item">
                        <a href="inscripciones.html" class="sidebar-link">
                            <i class="lni lni-book"></i>
                            Inscripciones
                        </a>
                    </li>
                        </ul>
                    </li>

                    <li class="sidebar-item">
                    <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse" data-bs-target="#auth456" aria-expanded="false" aria-controls="auth">
                    <i class="lni lni-certificate"></i>
                    </a>
                    <ul id="auth456" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        
                    <li class="sidebar-item">
                    <a href="staff.html" class="sidebar-link">
                        <i class="lni lni-certificate"></i>
                        Staff
                    </a>
                    </li>
                    </ul>
                    </li>

                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse" data-bs-target="#auth456" aria-expanded="false" aria-controls="auth">
                        <i class="lni lni-customer"></i>
                        </a>
                        <ul id="auth456" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li class="sidebar-item">
                        <a href="clientes.html" class="sidebar-link">
                            <i class="lni lni-customer"></i>
                            Clientes
                        </a>
                    </li>
                        </ul>
                    </li>
                    
                    
                    

                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                            data-bs-target="#auth456" aria-expanded="false" aria-controls="auth">
                            <img src="../../resources/images/tienda.png" alt="..." width="20px" height="20px"
                                class="me-2">
                        </a>
                        <ul id="auth456" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">

                            <li class="sidebar-item">
                                <a href="valores.html" class="sidebar-link">
                                    <i class="lni lni-spellcheck"></i>
                                    Valores
                                </a>
                            </li>

                            <li class="sidebar-item">
                                <a href="aliados.html" class="sidebar-link">
                                    <i class="lni lni-spellcheck"></i>
                                    Aliados
                                </a>
                            </li>



                            <li class="sidebar-item">
                                <a href="nivelescategorias.html" class="sidebar-link">
                                    <i class="lni lni-layers"></i>
                                    Niveles
                                </a>
                            </li>


                            <li class="sidebar-item">
                                <a href="entrenamientos.html" class="sidebar-link">
                                    <i class="lni lni-basketball"></i>
                                    Entrenamientos
                                </a>
                            </li>

                            <li class="sidebar-item">
                                <a href="categoriasalumnos.html" class="sidebar-link">
                                    <i class="lni lni-layers"></i>
                                    Categorías de alumnos
                                </a>
                            </li>

                        </ul>
                    </li>



                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                            data-bs-target="#auth23" aria-expanded="false" aria-controls="auth">
                            <i class="lni lni-cogs"></i>
                            <span>Opciones de usuario</span>
                        </a>
                        <ul id="auth23" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">

                            <li class="sidebar-item">

                                <a href="usuarios.html" class="sidebar-link "> <i class="lni lni-user"></i>
                                    Gestionar usuarios</a>

                            </li>

                            <li class="sidebar-item">

                                <a href="perfilusuario.html" class="sidebar-link "> <i class="lni lni-user"></i>
                                    Ver perfil</a>

                            </li>

                            <li class="sidebar-item">
                                <a href="../public/index.html" class="sidebar-link"><img
                                        src="../../resources/images/tienda.png" alt="..." width="20px" height="20px"
                                        class="me-2"></i>Ver sitio público</a>
                            </li>

                            <li class="sidebar-item">
                                <a class="sidebar-link" onclick="logOut()"> <i class="lni lni-exit"
                                        onclick="logOut()"></i>Cerrar sesión</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </aside>
            `);

        } else {
            sweetAlert(3, DATA.error, false, 'index.html');
        }
    } else {
        // Se comprueba si la página web es la principal, de lo contrario se direcciona a iniciar sesión.
        if (location.pathname.endsWith('index.html')) {
            // Se agrega el encabezado de la página web antes del contenido principal.
            MAIN.insertAdjacentHTML('beforebegin', `
            <div class="wrapper">
            <aside id="sidebar">
                <div class="d-flex">
                    <button class="toggle-btn" type="button">
                        <img src="../../resources/images/logoAcademiaBP.png" alt="" width="30px" height="30px">
                    </button>
                    <div class="sidebar-logo">
                        <a href="menu.html">Menú</a>
                    </div>
                </div>
                <ul class="sidebar-nav">
                    <li class="sidebar-item">
                        <a href="menu.html" class="sidebar-link">
                            <i class="lni lni-home"></i>
                            <span>inicio</span>
                        </a>
                    </li>

                    <li class="sidebar-item">
                        <a href="categoriaProductos.html" class="sidebar-link">
                            <i class="lni lni-agenda"></i>
                            <span>Categorías de productos</span>
                        </a>
                    </li>


                    <li class="sidebar-item">
                        <a href="productos.html" class="sidebar-link">
                            <i class="lni lni-shopping-basket"></i>
                            <span>Productos</span>
                        </a>
                    </li>


                    <li class="sidebar-item">
                        <a href="entrenamientos.html" class="sidebar-link">
                            <i class="lni lni-basketball"></i>
                            <span>Entrenamientos</span>
                        </a>
                    </li>


                    <li class="sidebar-item">
                        <a href="nivelescategorias.html" class="sidebar-link">
                            <i class="lni lni-layers"></i>
                            <span>Niveles</span>
                        </a>
                    </li>


                    <li class="sidebar-item">
                        <a href="alumnostotal.html" class="sidebar-link">
                            <i class="lni lni-graduation"></i>
                            <span>Alumnos</span>
                        </a>
                    </li>
                    <li class="sidebar-item">
                        <a href="pagosdemensualidad.html" class="sidebar-link">
                            <i class="lni lni-dollar"></i>
                            <span>Pagos de mensualidad</span>
                        </a>
                    </li>
                    <li class="sidebar-item">
                        <a href="inscripciones.html" class="sidebar-link">
                            <i class="lni lni-book"></i>
                            <span>Inscripciones</span>
                        </a>
                    </li>
                    <li class="sidebar-item">
                        <a href="staff.html" class="sidebar-link">
                            <i class="lni lni-certificate"></i>
                            <span>Staff</span>
                        </a>
                    </li>


                    <li class="sidebar-item">
                        <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                            data-bs-target="#auth23" aria-expanded="false" aria-controls="auth">
                            <i class="lni lni-cogs"></i>
                            <span>Opciones de usuario</span>
                        </a>
                    </li>
                </ul>
            </aside>
            `);


        } else {
            location.href = 'index.html';
        }
    }
}

