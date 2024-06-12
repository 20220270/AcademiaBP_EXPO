// Constante para completar la ruta de la API.
const STAFF_API = 'services/admin/staff.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
//const TABLE_BODY = document.getElementById('tableBody'),
//ROWS_FOUND = document.getElementById('rowsFound');

    CARD_STAFF = document.getElementById('CardStaff');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_STAFF = document.getElementById('idStaff'),
    NOMBRE_STAFF = document.getElementById('nombreStaff'),
    APELLIDO_STAFF = document.getElementById('apellidoStaff'),
    DESCRIPCION_STAFF = document.getElementById('descripcionStaff'),
    IMAGEN_STAFF = document.getElementById('imagenStaff');


document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    //MAIN_TITLE.textContent = 'Gestionar categorías';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

SEARCH_FORM.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable(FORM);
  });

  SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_STAFF.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(STAFF_API, action, FORM);
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

  const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Agregar staff';
    // Se prepara el formulario.
    SAVE_FORM.reset();
  }

  const fillTable = async (form = null) => {
    // Inicializa el contenido de las cards.
    CARD_STAFF.innerHTML = '';
    // Verifica la acción a realizar.
    const action = (form) ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(STAFF_API, action, form);
    // Comprueba si la respuesta es satisfactoria, de lo contrario muestra un mensaje con la excepción.
    if (DATA.status) {
        // Recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Crea y concatena las cards con los datos de cada registro.
            CARD_STAFF.innerHTML += `
                <div class="col">
                    <div class="card mb-3">
                        <img src="${SERVER_URL}images/staff/${row.imagen_staff}" class="card-img-top">
                        <div class="card-body text-start">
                            <h5 class="card-title fs-2 mb-2">${row.id_staff}</h5>
                            <p class="card-text"><b>Nombre completo: </b>${row.nombre_staff} ${row.apellido_staff} </p>
                            <p class="card-text"><b>Descripción: </b> ${row.descripcion_extra}</p>
                            
                            <div class="d-flex justify-content-center gap-1">
                            <button type="submit" class="btn" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_staff})">
                            
                            <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                            </button>
                            <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_staff})">
                            
                            <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
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

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idStaff', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(STAFF_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar datos';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_STAFF.value = ROW.id_staff;
        NOMBRE_STAFF.value = ROW.nombre_staff;
        APELLIDO_STAFF.value = ROW.apellido_staff;
        DESCRIPCION_STAFF.value = ROW.descripcion_extra;
    } else {
        sweetAlert(2, DATA.error, false);
    }
  }
  
  /*
  *   Función asíncrona para eliminar un registro.
  *   Parámetros: id (identificador del registro seleccionado).
  *   Retorno: ninguno.
  */
  const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este dato de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idStaff', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(STAFF_API, 'deleteRow', FORM);
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