// Constante para completar la ruta de la API.
const DIAS_PAGO_API = 'services/admin/diasentreno.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');

// Constantes para establecer los elementos de la tabla.
//const TABLE_BODY = document.getElementById('tableBody'),
//ROWS_FOUND = document.getElementById('rowsFound');

const CARD_DIASPAGOS = document.getElementById('cardDiasPago');

//CARD_CATEGORIAS = document.getElementById('cardCategorias');
// Constantes para establecer los elementos del componente Modal.

const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_DIA = document.getElementById('idDiasPago'),
    NUMERO_DIAS = document.getElementById('numeroDias'),
    MENSUALIDAD_PAGAR = document.getElementById('precioDia');


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
    (ID_DIA.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(DIAS_PAGO_API, action, FORM);
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
    CARD_DIASPAGOS.innerHTML = '';
    // Se verifica la acción a realizar.
    const action = form ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(DIAS_PAGO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CARD_DIASPAGOS.innerHTML += `
            <div class="col-md-4 mb-3" id="cardDiasPagos">
                <div class="card">
                    <div class="card-body text-start">
                        <h5 class="card-title">ID: ${row.id_dia_pago}</h5>
                        <p class="card-text">Número de días: ${row.numero_dias}</p>
                        <p class="card-text">Mensualidad a pagar por día: $${row.mensualidad_pagar}</p>
                        <div class="d-flex justify-content-center gap-2">
                            <button type="button" class="btnr mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_dia_pago})">
                                <img src="../../resources/images/btnEliminarIMG.png" alt="Eliminar" width="30px" height="30px" class="mb-1">
                            </button>
                            <button type="button" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_dia_pago})">
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
    MODAL_TITLE.textContent = 'Registrar número de días y pago';
    // Se prepara el formulario.
    SAVE_FORM.reset();
}

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idDiasPago', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(DIAS_PAGO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar número de días y pago';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_DIA.value = ROW.id_dia_pago;
        NUMERO_DIAS.value = ROW.numero_dias;
        MENSUALIDAD_PAGAR.value = ROW.mensualidad_pagar;

        
    } else {
        sweetAlert(2, DATA.error, false);
    }
  }

  const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este día y pago de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idDiasPago', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(DIAS_PAGO_API, 'deleteRow', FORM);
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