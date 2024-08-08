// Constante para completar la ruta de la API.
const ALUMNOS_API = 'services/admin/alumnos.php';

const CLIENTES_API = 'services/admin/clientes.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');

// Constantes para establecer los elementos de la tabla.
//const TABLE_BODY = document.getElementById('tableBody'),
//ROWS_FOUND = document.getElementById('rowsFound');

const CARD_ALUMNOS = document.getElementById('cardsAlumnos');

//CARD_CATEGORIAS = document.getElementById('cardCategorias');
// Constantes para establecer los elementos del componente Modal.

const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');


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
    FOTO_aLUMNO = document.getElementById('fotoAlumno');


document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    //MAIN_TITLE.textContent = 'Gestionar categorías';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

SEARCH_FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM = new FormData(SEARCH_FORM);
    fillTable(FORM);
  });

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



const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    CARD_ALUMNOS.innerHTML = '';
    // Se verifica la acción a realizar.
    const action = form ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(ALUMNOS_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CARD_ALUMNOS.innerHTML += `
            <div class="col-12 col-md-6 mb-3" id="cardDiasPagos">
            <div class="card h-100" id="carttr">
                <div class="card-body text-start">
                    <!-- Círculo indicador del estado -->
                    <div class="status-circle ${row.estado_alumno === 'Activo' ? 'activo' : 'inactivo'}"></div>
                    <img src="${SERVER_URL}images/alumnos/${row.foto_alumno}" class="rounded-circle" height="200px" width="200px">
                    <h5 class="card-title"><b>ID: </b>${row.id_alumno}</h5>
                    <p class="card-text"><b>Nombre del alumno: </b>${row.nombre_alumno} ${row.apellido_alumno}</p>
                    <p class="card-text"><b>Encargado del alumno: </b>${row.Encargado}</p>
                    <p class="card-text"><b>Fecha de nacimiento: </b>${row.fecha_nacimiento}<b> -- </b>${row.edad} años</p>
                    <p class="card-text"><b>Posición del alumno: </b>${row.posicion_alumno}</p>
                    <p class="card-text"><b>Categoría: </b>${row.categoria}</p>
                    <p class="card-text"><b>Encargado de la categoría: </b>${row.nombre_staff} ${row.apellido_staff}</p>
                    <p class="card-text"><b>Número de días que entrena: </b>${row.numero_dias}</p>
                    <p class="card-text"><b>Mensualidad que paga: </b>$${row.mensualidad_pagar}</p>
                    <div class="d-flex justify-content-center gap-2">
                        <button type="button" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_alumno})">
                            <img src="../../resources/images/btnEliminarIMG.png" alt="Eliminar" width="30px" height="30px" class="mb-1">
                        </button>
                        <button type="button" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_alumno})">
                            <img src="../../resources/images/btnActualizarIMG.png" alt="Actualizar" width="30px" height="30px" class="mb-1">
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



const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Registrar alumno';
    // Se prepara el formulario.
    SAVE_FORM.reset();

    // Ocultar selectores
    document.getElementById('selectEstadopo').style.display = 'none';
    document.getElementById('selectCategoriaEncargadopo').style.display = 'none';

    fillSelect(ALUMNOS_API, 'readAllDiasPago', 'selectDias');
    fillSelect(CLIENTES_API, 'readAll', 'selectEncargado');
    validarFechaNacimiento();
    
}

function validarFechaNacimiento() {
    var fechaActual = new Date().toISOString().slice(0, 10);
    var fechaMinima = '1990-01-01'; // Fecha mínima permitida (1980-01-01)
    
    FECHA_NACIMIENTO.setAttribute('min', fechaMinima);
    FECHA_NACIMIENTO.setAttribute('max', fechaActual);
}



const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idAlumno', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ALUMNOS_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar datos del alumno';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_ALUMNO.value = ROW.id_alumno;
        NOMBRE_ALUMNO.value = ROW.nombre_alumno;
        APELLIDO_ALUMNO.value = ROW.apellido_alumno;
        FECHA_NACIMIENTO.value = ROW.fecha_nacimiento;
        POSICION_ALUMNO.value = ROW.posicion_alumno;

        document.getElementById('selectEstadopo').style.display = 'block';
    document.getElementById('selectCategoriaEncargadopo').style.display = 'block';

        fillSelect(ALUMNOS_API, 'readAllStaffCategorias', 'selectCategoriaEncargado', ROW.id_staff_categorias);
        fillSelect(ALUMNOS_API, 'readAllDiasPago', 'selectDias', ROW.id_dia_pago);
        ESTADO_ALUMNO.value = ROW.estado_alumno;
        fillSelect(CLIENTES_API, 'readAll', 'selectEncargado', ROW.id_cliente);
        validarFechaNacimiento();

    } else {
        sweetAlert(2, DATA.error, false);
    }
}



const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este alumno de forma permanente?');
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

