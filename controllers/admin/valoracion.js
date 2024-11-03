const VALORACION_API = 'services/admin/valoracion.php'
// Constante para completar la ruta de la API.
const CLIENTE_API = 'services/admin/clientes.php';
const PRODUCTO_API = 'services/admin/productos.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_VALORACION = document.getElementById('idValoracion'),
    ID_DETALLEORDEN = document.getElementById('idDetalle'),
    ESTADO_COMENTARIO = document.getElementById('selectEstadoC');

let currentMethod = 'readAll';

document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    //MAIN_TITLE.textContent = 'Gestionar categorías';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();

    document.getElementById('toggleViewBtn').addEventListener('click', () => {

        if (currentMethod === 'readAll') {
            currentMethod = 'readAllValoracionesRecientes';
            document.getElementById('toggleViewBtn').textContent = 'Ver valoraciones más altas';
        }
        else if (currentMethod === 'readAllValoracionesRecientes') {
            currentMethod = 'readAllMayorValoracion';
            document.getElementById('toggleViewBtn').textContent = 'Ver valoraciones más bajas';
        }
        else if (currentMethod === 'readAllMayorValoracion') {
            currentMethod = 'readAllMenorValoracion';
            document.getElementById('toggleViewBtn').textContent = 'Ver valoraciones habilitadas';
        }
        else if (currentMethod === 'readAllMenorValoracion') {
            currentMethod = 'readAllValoracionesHabilitadas';
            document.getElementById('toggleViewBtn').textContent = 'Ver valoraciones deshabilitadas';
        }
        else if (currentMethod === 'readAllValoracionesHabilitadas') {
            currentMethod = 'readAllValoracionesDehabilitadas';
            document.getElementById('toggleViewBtn').textContent = 'Ver valoraciones antiguas';
        }
        else {
            currentMethod = 'readAll';
            document.getElementById('toggleViewBtn').textContent = 'Ver valoraciones recientes';
        }

        fillTable();

    })
});

SEARCH_FORM.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable(FORM);
});

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_VALORACION.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(VALORACION_API, action, FORM);
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
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = currentMethod;
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(VALORACION_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td>
                        <p>${row.nombre_completo}</p>
                        <p>${row.correo_cliente}</p>
                    </td>
                    <td>${row.nombre_producto}</td>
                    <td>${convertRatingToStars(row.calificacion_producto)} ${row.calificacion_producto}</td>
                    <td>${row.comentario_producto}</td>
                    <td>${row.fecha_valoracion}</td>
                    <td>${row.estado_comentario}</td>
                    <td>
                     <button type="submit" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_valoracion})" title="Eliminar valoración del producto ${row.nombre_producto}">
                        
                        <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px"
                            class="mb-1">

                    </button>
                    <button type="submit" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_valoracion})" title="Actualizar estado de la valoración del producto ${row.nombre_producto}">
                        
                        <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px"
                            class="mb-1">
                    </button>
  
  
                    </td>
                </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

//Funcion para convertir la calificacion a estrellas
const convertRatingToStars = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars += '<i class="fas fa-star text-success"></i>'; // estrella llena
        } else {
            stars += '<i class="far fa-star text-success"></i>'; // estrella vacía
        }
    }
    return stars;
};


/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idValoracion', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(VALORACION_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar estado del comentario';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_VALORACION.value = ROW.id_valoracion;
        ID_DETALLEORDEN.value = ROW.id_detalle;
        ESTADO_COMENTARIO.value = ROW.estado_comentario;


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
    const RESPONSE = await confirmAction('¿Desea eliminar esta valoración de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idValoracion', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(VALORACION_API, 'deleteRow', FORM);
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
    const PATH = new URL(`${SERVER_URL}reports/admin/prediccion_productos_valoraciones.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}