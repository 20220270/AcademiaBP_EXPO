// Constantes para completar las rutas de la API.
const SOPORTE_API = 'services/admin/soportetecnico.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');

const CARD_MENSAJES = document.getElementById('cardsMensajes');

// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal');
const MODAL_TITLE = document.getElementById('modalTitle');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm');
const ID_SOPORTE = document.getElementById('idSoporte');
const ESTADO_MENSAJE = document.getElementById('selectEstadoMensaje');



// Método del evento para cuando el documento ha cargado.
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
    const action = (ID_SOPORTE.value) ? 'updateRow' : 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(SOPORTE_API, action, FORM);
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
    // Inicializa el contenido de las cards.
    CARD_MENSAJES.innerHTML = '';
    // Verifica la acción a realizar.
    const action = (form) ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(SOPORTE_API, action, form);
    // Comprueba si la respuesta es satisfactoria, de lo contrario muestra un mensaje con la excepción.
    if (DATA.status) {
        // Recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Establece un icono para el estado del producto.
            const icon = (row.estado_producto) ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill';
            // Crea y concatena las cards con los datos de cada registro.
            CARD_MENSAJES.innerHTML += `
                <div class="col-12 col-md-6 col-lg-6 mt-3 mb-3" >
    <div class="card h-100" >
        <div class="row no-gutters" id="cont">
            <div class="col-4">
                <div class="mt-4"><img src="${SERVER_URL}images/clientes/${row.foto_cliente}" class="card-img-top rounded-circle"></div>
            </div>
            <div class="col-8 mt-3">
                <div class="card-body text-start">
                    <h5 class="card-title fs-2 mb-2">ID: ${row.id_soporte}</h5>
                    <p class="card-text"><b>Mensaje:</b> ${row.mensaje}</p>
                    <p class="card-text"><b>Cliente que envió el mensaje:</b> ${row.cliente}</p>
                    <p class="card-text"><b>Correo del cliente:</b> ${row.correo_cliente}</p>
                    <p class="card-text"><b>Estado del mensaje:</b> 
                        <span class="estado-mensaje">
                            ${row.estado_mensaje === "Pendiente" ? '<i class="far fa-check-circle"></i>' :
                              row.estado_mensaje === "Visto" ? '<i class="far fa-check-circle"></i><i class="far fa-check-circle"></i>' :
                              row.estado_mensaje === "Atendido" ? '<i class="fas fa-check-circle" style="color: green;"></i><i class="fas fa-check-circle" style="color: green;"></i>' : ''}
                        </span>${row.estado_mensaje}
                    </p>
                    <p class="card-text"><small class="text-muted">Mensaje enviado en la fecha: ${row.fecha_envio}</small></p>
                    
                    <div class="d-flex justify-content-center gap-1">
                        <button type="submit" class="btn" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_soporte})" title="Eliminar mensaje">
                            <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                        </button>
                        <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_soporte})" title="Actualizar estado del mensaje">
                            <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                        </button>
                    </div>
                </div>
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
    FORM.append('idSoporte', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(SOPORTE_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar estado del mensaje';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_SOPORTE.value = ROW.id_soporte;
        ESTADO_MENSAJE.value = ROW.estado_mensaje;
        
    } else {
        sweetAlert(2, DATA.error, false);
    }
  }

  const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este mensaje de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idSoporte', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(SOPORTE_API, 'deleteRow', FORM);
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