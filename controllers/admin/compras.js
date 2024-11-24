const COMPRAS_API = 'services/admin/compras.php';
const PRODUCTOS_API = 'services/admin/productos.php';
const DETALLEPRODUCTOS_API = 'services/admin/detallesproductos.php';
const METODOS_API = 'services/admin/metodospagos.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
const FILTER_FORM = document.getElementById('filterForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody');
const ROWS_FOUND = document.getElementById('rowsFound');
const TABLE_BODY2 = document.getElementById('tableBody2');
const ROWS_FOUND2 = document.getElementById('rowsFound2');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal');
const MODAL_TITLE = document.getElementById('modalTitle');
const SAVE_FORM = document.getElementById('saveForm');
const ID_COMPRA = document.getElementById('idCompra');
const ESTADO_COMPRA = document.getElementById('selectEstadoOrden');
const DETALLE_FORM = new bootstrap.Modal('#detailModal');
const DETAIL_FORM = document.getElementById('detailForm');
const ID_DETALLE = document.getElementById('idDetalle');
const MODAL_TITLED = document.getElementById('modalTitleD');
const IMAGEN_PRODUCTO = document.getElementById('imagenProductoDetalle');
const NOMBRE_PRODUCTO = document.getElementById('nombreProductoDetalle');
const PRECIO_PRODUCTO = document.getElementById('precioProductoDetalle');
const CANTIDAD_PRODUCTO = document.getElementById('cantidadProductoDetalle');
const TOTAL_PAGADO = document.getElementById('TotalPagadoProductoDetalle');
const FECHA_FILTRO = document.getElementById('fechaCompra');

const MODAL_COMPRA = new bootstrap.Modal('#modalCompletarCompra');
const COMPRA_FORM = document.getElementById('saveFormCompra');
const MODAL_TITLE2 = document.getElementById('modalTitle2');

const MODAL_METODOS = new bootstrap.Modal('#modalMetodos');
const METODOS_FORM = document.getElementById('metodosForm');
const MODAL_TITLE3 = document.getElementById('modalTitle3');
const METODOS_CARDS = document.getElementById('cardsMetodos');
const COMPRA_SELECT = document.getElementById('cardsMetodos');

// Variable para rastrear la vista actual
let isUsingReadAll2 = false;

document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    //MAIN_TITLE.textContent = 'Gestionar categorías';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
    
    // Configuración del botón para alternar entre vistas
    document.getElementById('toggleViewBtn').addEventListener('click', () => {
        isUsingReadAll2 = !isUsingReadAll2;
        document.getElementById('toggleViewBtn').textContent = isUsingReadAll2 ? 'Filtrar por ID' : 'Filtrar por fecha de la compra';
        fillTable(); // Recarga la tabla con la vista seleccionada
    });
});

document.getElementById('fechaCompra').addEventListener('change', function() {
    fillTable(); // Llama a fillTable al cambiar la fecha
});

// Método del evento para cuando se envía el formulario de buscar.
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
    const action = (ID_COMPRA.value) ? 'updateRow' : 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(COMPRAS_API, action, FORM);
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

// Función para llenar la tabla con datos
const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';

    // Verificar si el input de fecha tiene un valor.
    const fechaCompra = document.getElementById('fechaCompra').value;
    let action;

    if (fechaCompra) {
        // Si hay una fecha seleccionada, usar 'readAll3' para filtrar por fecha.
        action = 'readAll3';
        form = new FormData();  // Crear un nuevo FormData si no existe uno
        form.append('fechaCompra', fechaCompra);
    } else {
        // Si no hay fecha seleccionada, usar la acción según la lógica previa.
        action = form ? 'searchRows' : (isUsingReadAll2 ? 'readAll2' : 'readAll');
    }

    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(COMPRAS_API, action, form);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
              <tr>
                  <td>${row.id_compra}</td>
                  <td>${row.nombre_completo}</td>
                  <td>${row.direccion_compra}</td>
                  <td>${row.fecha_registro}</td>
                  <td>${row.estado_compra}</td>
                    <td>${row.nombre_metodo}</td>
                  <td>
                    <button type="submit" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_compra})" title="Eliminar compra número ${row.id_compra}, del cliente ${row.nombre_completo}" >
                        <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                    </button>
                    <button type="submit" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_compra})" title="Actualizar compra número ${row.id_compra}, del cliente ${row.nombre_completo}">
                        <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                    </button>
                    <button type="submit" class="btn mt-1" id="btnDetalles" name="btnDetalles" onclick="openDetail(${row.id_compra})" title="Ver detalles de la compra ${row.id_compra}, del cliente ${row.nombre_completo}">
                        <img src="../../resources/images/btnDetalles.png" alt="" width="30px" height="30px" class="mb-1">
                    </button>
                    <button type="submit" class="btn mt-1" id="btnDetalles" name="btnDetalles" onclick="openReport(${row.id_compra})" title="Ver factura de la compra número ${row.id_compra} del cliente ${row.nombre_completo}">
                        <img src="../../resources/images/report.png" alt="" width="30px" height="30px" class="mb-1">
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
};


const fillTable2 = async (form = null) => {
    // Inicializa el contenido de las cards.
    METODOS_CARDS.innerHTML = '';
    // Verifica la acción a realizar.
    const action = (form) ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(METODOS_API, action, form);
    // Comprueba si la respuesta es satisfactoria, de lo contrario muestra un mensaje con la excepción.
    if (DATA.status) {
        // Recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Crea y concatena las cards con los datos de cada registro.
            METODOS_CARDS.innerHTML += `
                <div class="col-12 col-md-12 col-lg-6 mt-3 mb-3 mx-auto" >
                    <div class="card h-100" data-id-metodo="${row.id_metodo_pago}">
                        <div class="row mb-5 mt-2 mx-auto" onclick="seleccionarMetodoPago(${row.id_metodo_pago}, '${row.nombre_metodo}')">
                            <div class="col-3">
                                <div class="mt-4"><img src="${SERVER_URL}images/metodospagos/${row.imagen_metodo}" class="card-img-top"></div>
                            </div>
                            <div class="col-8 mt-3">
                                <div class="card-body text-start">
                                    <h5 class="card-title fs-3 mb-2"> ${row.nombre_metodo}</h5>
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

const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    MODAL_COMPRA.show();
    MODAL_TITLE2.textContent = 'Continuar compra';
    // Se prepara el formulario.
    COMPRA_FORM.reset();

    fillSelect(COMPRAS_API, 'readAllCompraNueva', 'idCompraSelect');
    fillSelect3(DETALLEPRODUCTOS_API, 'readDetalles', 'idDetalleSelect');
}

async function openCreate2() {
    // Se muestra la caja de diálogo con su título.
    MODAL_METODOS.show();
    MODAL_TITLE3.textContent = 'Completar compra';
    // Se prepara el formulario.
    METODOS_FORM.reset();
    fillSelect(COMPRAS_API, 'readCompras', 'idPago');
    fillTable2();

    mostrarInputs();

}

async function finishOrder2() {

    const idPago = document.getElementById('idPago').value
    const idMetodoPago = document.getElementById('idMetodoPago').value
    const datosPago = document.getElementById('datosPago').value

     // Mostrar un mensaje de confirmación y capturar la respuesta
    const RESPONSE = await confirmAction('¿Está seguro de finalizar la compra?');
    // Verificar la respuesta del mensaje
    if (RESPONSE) {
        // Constante tipo objeto con los datos del formulario
        const FORM = new FormData(METODOS_FORM);
        // Añadir el ID del alumno al formulario
        FORM.append('idPago', idPago);
        FORM.append('idMetodoPago', idMetodoPago);
        FORM.append('datosPago', datosPago);
        
        // Petición para actualizar los datos personales del usuario
        const DATA = await fetchData(COMPRAS_API, 'finishOrder2', FORM);
        // Comprobar si la respuesta es satisfactoria, de lo contrario mostrar un mensaje con la excepción
        if (DATA.status) {
            sweetAlert(1, DATA.message, true);
            fillTable()
            
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}


// Añadir evento al botón de guardar
document.getElementById("btnGuardar").addEventListener("click", async (event) => {
    event.preventDefault(); // Prevenir el envío automático del formulario

    // Capturar los valores de los campos de entrada
    const idCompra = document.getElementById("idCompraSelect").value;
    const idDetalle = document.getElementById("idDetalleSelect").value;
    const cantidad = document.getElementById("cantidadProducto").value;
    const personalizacion = document.getElementById("datosPersonalizacion").value;

    // Mostrar un mensaje de confirmación y capturar la respuesta
    const RESPONSE = await confirmAction('¿Está seguro de continuar la compra?');
    
    // Verificar la respuesta del mensaje
    if (RESPONSE) {
        // Crear un objeto FormData con los datos del formulario
        const FORM = new FormData();
        FORM.append('idCompraSelect', idCompra);
        FORM.append('idDetalleSelect', idDetalle);
        FORM.append('cantidadProducto', cantidad);
        FORM.append('datosPersonalizacion', personalizacion);
        
        // Petición para iniciar la compra
        const DATA = await fetchData(COMPRAS_API, 'createDetail2', FORM);
        
        // Comprobar si la respuesta es satisfactoria, de lo contrario mostrar un mensaje con la excepción
        if (DATA.status) {
            sweetAlert(1, DATA.message, true);
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
});



const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCompra', id);
    console.log(id)
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(COMPRAS_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar estado de la compra ' + id;
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_COMPRA.value = ROW.id_compra;
        ESTADO_COMPRA.value = ROW.estado_compra;

    } else {
        sweetAlert(2, DATA.error, false);
    }
}

//Metodo para visualizar el detalle de cada orden
const openDetail = async (id) => {
    ROWS_FOUND2.textContent = '';
    TABLE_BODY2.innerHTML = '';
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCompra', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(COMPRAS_API, 'readDetails', FORM);

    //Variable para calcular el total de la compra a partir de los sub totales
    let totalCompra = 0;

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        if (DATA.status) {
            // Se recorre el conjunto de registros fila por fila.
            DATA.dataset.forEach(row => {
                // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                TABLE_BODY2.innerHTML += `
                  <tr>
                      <td>${row.id_detalle_compra}</td>
                      <td><img src="${SERVER_URL}images/productos/${row.imagen_producto}" alt="..." width="200px" height="200px" name="imagenProductoDetalle"
                      id="imagenProductoDetalle"></td>
                      <td>${row.nombre_producto}</td>
                      <td>$${row.precio_producto}</td>
                      <td>${row.cantidad_producto}</td>
                      <td>${row.descuento_producto}%</td>
                      <td>${row.personalizacion}</td>
                      <td>$${row.SubtotalConDescuento}</td>
                      
                  </tr>
              `;

              totalCompra += parseFloat(row.SubtotalConDescuento);
            });
            // Se muestra un mensaje de acuerdo con el resultado.
            ROWS_FOUND.textContent = DATA.message;
        } else {
            sweetAlert(4, DATA.error, true);
        }

        TABLE_BODY2.innerHTML += `
                  <tr>
                    <td colspan="7" class="bg-dark text-white fw-bold">Total de la compra</td>
                    <td class="bg-dark text-white fw-bold">$${totalCompra.toFixed(2)}</td>
                </tr>
              `
        
        // Se muestra la caja de diálogo con su título.
        DETALLE_FORM.show();
        MODAL_TITLED.textContent = 'Detalles del pedido ' + id;

        
        // Se prepara el formulario.
        DETAIL_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_DETALLE.value = ROW.id_detalle_compra;
        
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
    const RESPONSE = await confirmAction('¿Desea eliminar esta compra: Compra #' +id+ ' de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idCompra', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(COMPRAS_API, 'deleteRow', FORM);
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

const openReport = (id) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/compra_productos.php`);
    // Se agrega un parámetro a la ruta con el valor del registro seleccionado.
    PATH.searchParams.append('idCompra', id);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}


const openReport2 = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/prediccion_productos_ventas.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}
