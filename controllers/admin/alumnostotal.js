// Constante para completar la ruta de la API.
const ALUMNOS_API = 'services/admin/alumnos.php';
const COMPRA_API = 'services/admin/compras.php';
const CATEGORIAS_ALUMNOSAPI = 'services/admin/categoriasalumnos.php';
const CLIENTES_API = 'services/admin/clientes.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');

// Constantes para establecer los elementos de la tabla.
//const TABLE_BODY = document.getElementById('tableBody'),
//ROWS_FOUND = document.getElementById('rowsFound');
const ALUMNOS_FORM = document.getElementById('alumnosForm');
const CARD_ALUMNOS = document.getElementById('cardsAlumnos');
const CARD_ALUMNOS2 = document.getElementById('cardsAlumnos2');
//CARD_CATEGORIAS = document.getElementById('cardCategorias');
// Constantes para establecer los elementos del componente Modal.

const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

const SAVE_MODAL2 = new bootstrap.Modal('#detailModal'),
    MODAL_TITLE2 = document.getElementById('modalTitleD');
const SAVE_MODAL3 = new bootstrap.Modal('#alumnoCategoria'),
    MODAL_TITLE3 = document.getElementById('modalTitleD2');

let currentMethod = 'readAll';

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_ALUMNO = document.getElementById('idAlumno'),
    NOMBRE_ALUMNO = document.getElementById('nombreAlumno'),
    APELLIDO_ALUMNO = document.getElementById('apellidoAlumno'),
    FECHA_NACIMIENTO = document.getElementById('fechaNacimiento'),
    POSICION_ALUMNO = document.getElementById('selectPosicion'),
    ID_STAFFCATEGORIA = document.getElementById('selectCategoriaEncargado'),
    ID_DIASPAGO = document.getElementById('selectDias'),
    ESTADO_ALUMNO = document.getElementById('selectEstado'),
    ENCARGADO_ALUMNO = document.getElementById('selectEncargado'),
    FOTO_aLUMNO = document.getElementById('fotoAlumno'),
    FECHA_INSCRIPCION = document.getElementById('fechaInscripcion');

const SAVE_FORM2 = document.getElementById('detailForm');
const ESTADO_SELECT = document.getElementById('estado');
const BSUCADOR = document.getElementById('Buscador');

const SAVE_FORM3 = document.getElementById('formaAlumnoCategoria');
const ID_ALUMNOCAT = document.getElementById('idAlumnoCategoria');
const SELECT_ALUMNO = document.getElementById('selectAlumno');
const SELECT_NOMBREALUMNO = document.getElementById('nombreAlumnoo');
const SELECT_CATEGORIAA = document.getElementById('selectCategoriaa');


document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    //MAIN_TITLE.textContent = 'Gestionar categorías';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();

    document.getElementById('toggleViewBtn').addEventListener('click', () => {
        if (currentMethod === 'readAll') {
            currentMethod = 'readAllAlumnosRecientes';
            document.getElementById('toggleViewBtn').textContent = 'Ver inscripciones antiguas'
        }
        else if (currentMethod === 'readAllAlumnosRecientes') {
            currentMethod = 'readAllAlumnosAntiguos';
            document.getElementById('toggleViewBtn').textContent = 'Ver por edades de mayor a menor'
        }
        else if (currentMethod === 'readAllAlumnosAntiguos') {
            currentMethod = 'readAllAlumnosMayorEdad';
            document.getElementById('toggleViewBtn').textContent = 'Ver por edades de menor a mayor'
        }
        else if (currentMethod === 'readAllAlumnosMayorEdad') {
            currentMethod = 'readAllAlumnosMenorEdad';
            document.getElementById('toggleViewBtn').textContent = 'Alumnos con más días de entreno'
        }
        else if (currentMethod === 'readAllAlumnosMenorEdad') {
            currentMethod = 'readAllAlumnosMasDias';
            document.getElementById('toggleViewBtn').textContent = 'Alumnos con menos días de entreno'
        }
        else if (currentMethod === 'readAllAlumnosMasDias') {
            currentMethod = 'readAllAlumnosMenosDias';
            document.getElementById('toggleViewBtn').textContent = 'Ver jugadores de campo'
        }
        else if (currentMethod === 'readAllAlumnosMenosDias') {
            currentMethod = 'readAllAlumnosJugadoresCampo';
            document.getElementById('toggleViewBtn').textContent = 'Ver porteros'
        }
        else if (currentMethod === 'readAllAlumnosJugadoresCampo') {
            currentMethod = 'readAllAlumnosPorteros';
            document.getElementById('toggleViewBtn').textContent = 'Ver por ID'
        }
        else {
            currentMethod = 'readAll';
            document.getElementById('toggleViewBtn').textContent = 'Ver inscripciones recientes'
        }
        fillTable();
    })
});

// Función para manejar la búsqueda al enviar el formulario
SEARCH_FORM.addEventListener('submit', (event) => {
    event.preventDefault();  // Evita el envío predeterminado del formulario
    const FORM = new FormData(SEARCH_FORM);  // Crea el objeto FormData
    fillTable(FORM);  // Realiza la búsqueda
});

// Función para realizar la búsqueda al cambiar el estado
function realizarBusqueda() {
    const estadoSeleccionado = ESTADO_SELECT.value;  // Captura el estado seleccionado
    BSUCADOR.value = estadoSeleccionado;  // Asigna el estado seleccionado al input BSUCADOR

    const FORM = new FormData(SEARCH_FORM);  // Crea el objeto FormData
    FORM.append('estado', estadoSeleccionado);  // Agrega el estado al FormData

    fillTable(FORM);  // Realiza la búsqueda
}

// Evento para cambiar el estado
ESTADO_SELECT.addEventListener('change', realizarBusqueda);  // Llama a la función de búsqueda al cambiar el estado


SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_ALUMNO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ALUMNOS_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

SAVE_FORM3.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_ALUMNOCAT.value) ? action = 'updateRowAlumnosCategorias' : action = 'createRowAlumnosCategorias';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM3);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ALUMNOS_API, action, FORM);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});



const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    CARD_ALUMNOS.innerHTML = '';
    // Se verifica la acción a realizar.
    const action = form ? 'searchRows' : currentMethod;
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(ALUMNOS_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CARD_ALUMNOS.innerHTML += `
            <div class="col-4 col-md-4 mb-3" id="cardDiasPagos">
                <div class="card h-100" id="carttr">
                    <div class="card-body text-center">
                        <!-- Círculo indicador del estado -->
                        <div class="status-circle ${row.estado_alumno === 'Activo' ? 'activo' : row.estado_alumno === 'Pendiente' ? 'pendiente' : 'inactivo'}" title="Estado del alumno: ${row.estado_alumno}"></div>
                        <img src="${SERVER_URL}images/alumnos/${row.foto_alumno}" class="rounded-circle mt-4 mb-4" height="150px" width="150px">
                        <p class="card-text text-left"><b>Nombre del alumno: </b>${row.nombre}</p>
                    
                        <div class="d-flex justify-content-center gap-2">
                            <button type="button" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_alumno}, '${row.nombre}')" title="Eliminar ${row.nombre}">
                                <img src="../../resources/images/btnEliminarIMG.png" alt="Eliminar" width="30px" height="30px" class="mb-1">
                            </button>
                            <button type="button" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_alumno}, '${row.nombre}')" title="Actualizar ${row.nombre}">
                                <img src="../../resources/images/btnActualizarIMG.png" alt="Actualizar" width="30px" height="30px" class="mb-1">
                            </button>
                            <button type="button" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="verDatosAlumno(${row.id_alumno}, '${row.nombre}')" title="Ver datos del alumno ${row.nombre}">
                                <img src="../../resources/images/btnDetalles.png" alt="Ver datos" width="30px" height="30px" class="mb-1">
                            </button>
                            <button type="button" class="btn mt-1" data-id="${row.id_alumno}" onclick="submitForm(${row.id_alumno})" title="Iniciar compra. Alumno: ${row.nombre}">
                                <img src="../../resources/images/iniciarcompra.png" width="30px" height="30px" class="mb-1">
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

async function submitForm(id_alumno) {
    // Mostrar un mensaje de confirmación y capturar la respuesta
    const RESPONSE = await confirmAction('¿Está seguro de iniciar una compra?');
    
    // Verificar la respuesta del mensaje
    if (RESPONSE) {
        // Constante tipo objeto con los datos del formulario
        const FORM = new FormData(ALUMNOS_FORM);
        // Añadir el ID del alumno al formulario
        FORM.append('idAlumno', id_alumno);
        
        // Petición para iniciar la compra
        const DATA = await fetchData(COMPRA_API, 'startOrder2', FORM);
        
        // Comprobar si la respuesta es satisfactoria, de lo contrario mostrar un mensaje con la excepción
        if (DATA.status) {
            sweetAlert(1, DATA.message, true);
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}


//Función para mostrar datos dentro de una modal
const verDatosAlumno = async (id, nombre) => {
    const MODAL_BODY = document.getElementById('modalBodyD'); //Obtenemos el cuerpo de la modal mediante su ID
    MODAL_BODY.innerHTML = ''; //Cuando se obtenga el elemento, su contenido deberá estar vacío

    //La variable MODAL_TITLE2 almacena el título de la modal donde se verán los datos del alumno
    MODAL_TITLE2.textContent = 'Datos de ' + nombre; //Definimos el título que irá dentro la modal

    const FORM = new FormData(); //Definimos un nuevo objeto para el formulario
    FORM.append('idAlumno', id); //Se agregarán los datos a partir del ID que se envíe como parámetro de la función

    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ALUMNOS_API, 'readDatosAlumno', FORM);
    const DATA2 = await fetchData(ALUMNOS_API, 'readDatosAlumnosCategorias', FORM);

    //Se verifica que la variable DATA contenga datos
    if (DATA.status) {
        // Verifica si dataset es un arreglo antes de usar forEach
        if (Array.isArray(DATA.dataset)) {
            DATA.dataset.forEach(row => {
                MODAL_BODY.innerHTML += `
                <div class="row mx-auto">
                    <div class="col-md-4 col-sm-12 col-12">
                        <p class="card-text"><b>Nombre del alumno: </b>${row.nombre}</p>
                        <p class="card-text"><b>Encargado del alumno: </b>${row.Encargado}</p>
                        <p class="card-text"><b>Fecha de nacimiento: </b>${row.fecha_nacimiento}<b> -- </b>${row.edad} años</p>
                        <p class="card-text"><b>Inscrito desde: </b>${row.fecha_inscripcion}</p>
                    </div>
                    <div class="col-md-4 col-sm-12 col-12">
                        <p class="card-text"><b>Posición del alumno: </b>${row.posicion_alumno}</p>
                        <p class="card-text"><b>Número de días que entrena: </b>${row.numero_dias}</p>
                        <p class="card-text"><b>Mensualidad que paga: </b>$${row.mensualidad_pagar}</p>
                    </div>
                    <div class="col-md-4 col-sm-12 col-12">
                        <p class="card-text"><b>Último pago realizo: </b>${row.fecha_pago}</p>
                        <p class="card-text"><b>Próximo pago a realizar: </b>${row.fecha_proximo_pago}</p>
                        <p class="card-text"><b>Producto más comprado por el alumno: </b>${row.producto_mas_comprado} - ${row.total_producto_mas_comprado}</p>
                    </div>
                    <div class="separator"></div>
                    <div class="row align-items-center">
                    <!-- Título -->
                     <div class="col-md-10">
                        <h3 class="text-center">Categoría(s) en las que está el alumno ${row.nombre}</h3>
                    </div>
                    <!-- Botón -->
                        <div class="col-md-2 text-start">
                            <button type="button" class="btn btn-white me-md-2 mt-1" onclick="openCreate2(${row.id_alumno}, '${row.nombre}')" title="Asignar otra categoría a ${row.nombre}">
                                <img src="../../resources/images/agregar.png" alt="buttonpng" width="60rem" />
                            </button>
                        </div>
                    </div>

                </div>
                `;
            });
        } else {
            console.error('DATA.dataset no es un arreglo:', DATA.dataset);
            sweetAlert(4, "Error: los datos no son válidos.", true);
        }

        // Mostrar el modal después de llenar el contenido
        SAVE_MODAL2.show();
    } else {
        sweetAlert(4, DATA.error, true);
    }

    //Datos de las categorías del alumno
    if (DATA2.status) {
        // Verifica si dataset es un arreglo antes de usar forEach
        if (Array.isArray(DATA2.dataset)) {
            let listaCategorias = `
            <div class="row">
                <div class="col-md-12 listCategorias">
                    <ul class="list-group list-group-flush">
            `;
    
            DATA2.dataset.forEach(row => {
                listaCategorias += `
                    <li class="list-group-item d-flex align-items-center">
                        <span class="me-2">•</span> ${row.categoria} - A cargo de: <b class="mx-1">${row.encargadostaff}</b>
                        <button type="button" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete2(${row.id_alumno_categoria}, '${row.categoria}', '${row.alumno}')" title="Eliminar a ${row.alumno} de la categoría ${row.categoria}">
                            <img src="../../resources/images/btnEliminarIMG.png" alt="Eliminar" width="30px" height="30px" class="mb-1">
                        </button>
                        <button type="button" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate2(${row.id_alumno_categoria}, '${row.alumno}')" title="Actualizar categoría de ${row.alumno}">
                            <img src="../../resources/images/btnActualizarIMG.png" alt="Actualizar" width="30px" height="30px" class="mb-1">
                        </button>
                    </li>
                `;
            });
    
            listaCategorias += `
                    </ul>
                </div>
            </div>
            `;
    
            MODAL_BODY.innerHTML += listaCategorias;
        } else {
            console.error('DATA2.dataset no es un arreglo:', DATA2.dataset);
            sweetAlert(4, "Error: los datos no son válidos.", true);
        }
    
        // Mostrar el modal después de llenar el contenido
        SAVE_MODAL2.show();
    } else {
        sweetAlert(4, DATA2.error, true);
    }
    
}


const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Registrar alumno';

    // Se prepara el formulario.
    SAVE_FORM.reset();

    // Ocultar selectores
    document.getElementById('selectEstadopo').style.display = 'none';

    // Ocultar el campo de fecha de inscripción en el modo de creación
    document.getElementById('fechaInscripcionContainer').style.display = 'none';

    fillSelect(ALUMNOS_API, 'readAllDiasPago2', 'selectDias');
    fillSelect(CLIENTES_API, 'readAll', 'selectEncargado');
    validarFechaNacimiento();
}

const openCreate2 = (id, nombre) => {
    SAVE_MODAL2.hide();
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL3.show();
    MODAL_TITLE3.textContent = 'Asignar alumno a categoría';

    // Se prepara el formulario.
    SAVE_FORM3.reset();
    SELECT_ALUMNO.value = id;
    SELECT_NOMBREALUMNO.value = nombre;
    fillSelect(CATEGORIAS_ALUMNOSAPI, 'readCategoriasAlumnos', 'selectCategoriaa');

}

function validarFechaNacimiento() {
    var fechaActual = new Date().toISOString().slice(0, 10);
    var fechaMinima = '1990-01-01'; // Fecha mínima permitida (1980-01-01)

    FECHA_NACIMIENTO.setAttribute('min', fechaMinima);
    FECHA_NACIMIENTO.setAttribute('max', fechaActual);
}



const openUpdate = async (id, nombre) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idAlumno', id);

    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ALUMNOS_API, 'readOne', FORM);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar datos del alumno ' + nombre;

        // Se prepara el formulario.
        SAVE_FORM.reset();

        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_ALUMNO.value = ROW.id_alumno;
        NOMBRE_ALUMNO.value = ROW.nombre_alumno;
        APELLIDO_ALUMNO.value = ROW.apellido_alumno;
        FECHA_NACIMIENTO.value = ROW.fecha_nacimiento;
        POSICION_ALUMNO.value = ROW.posicion_alumno;
        FECHA_INSCRIPCION.value = ROW.fecha_inscripcion

        document.getElementById('selectEstadopo').style.display = 'block';

        // Hacer visible el campo de fecha de inscripción en el modo de actualización
        document.getElementById('fechaInscripcionContainer').style.display = 'block';

        fillSelect(ALUMNOS_API, 'readAllDiasPago2', 'selectDias', ROW.id_dia_pago);
        ESTADO_ALUMNO.value = ROW.estado_alumno;
        fillSelect(CLIENTES_API, 'readAll', 'selectEncargado', ROW.id_cliente);
        validarFechaNacimiento();

    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openUpdate2 = async (id, nombre) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idAlumnoCategoria', id);

    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ALUMNOS_API, 'readOneAlumnosCategorias', FORM);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL2.hide();
        SAVE_MODAL3.show();
        MODAL_TITLE3.textContent = 'Actualizar categoría del alumno ' + nombre;

        // Se prepara el formulario.
        SAVE_FORM3.reset();

        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_ALUMNOCAT.value = ROW.id_alumno_categoria;
        SELECT_ALUMNO.value = ROW.id_alumno;
        SELECT_NOMBREALUMNO.value = ROW.alumno;
        fillSelect(ALUMNOS_API, 'readComboStaffCategorias', 'selectCategoriaa', ROW.id_staff_categorias);


    } else {
        sweetAlert(2, DATA.error, false);
    }
}



const openDelete = async (id, nombre) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este alumno: ' + nombre + ', de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idAlumno', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(ALUMNOS_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const openDelete2 = async (id, categoria, nombre) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea remover la categoría: ' + categoria + ', del alumno ' + nombre + ', de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idAlumnoCategoria', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(ALUMNOS_API, 'deleteRowAlumnosCategorias', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/alumnos.php`);

    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}

