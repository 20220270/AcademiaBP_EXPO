const COMPRAS_API = 'services/admin/compras.php';
const PRODUCTOS_API = 'services/admin/productos.php';
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


const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCompra', id);
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
                    <td colspan="6" class="bg-dark text-white fw-bold">Total de la compra</td>
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



//Código anterior

/**
 * const COMPRAS_API = 'services/admin/compras.php';
const PRODUCTOS_API = 'services/admin/productos.php';
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
    ID_COMPRA = document.getElementById('idCompra'),
    ESTADO_COMPRA = document.getElementById('selectEstadoOrden');
// Constantes para establecer los elementos del formulario del detalle.
const DETALLE_FORM = new bootstrap.Modal('#detailModal'),
    DETAIL_FORM = document.getElementById('detailForm')
    const TABLE_BODY2 = document.getElementById('tableBody2'),
    ROWS_FOUND2 = document.getElementById('rowsFound2');
    ID_DETALLE = document.getElementById('idDetalle'),
    MODAL_TITLED = document.getElementById('modalTitleD');
    IMAGEN_PRODUCTO = document.getElementById('imagenProductoDetalle');
    NOMBRE_PRODUCTO = document.getElementById('nombreProductoDetalle'),
    PRECIO_PRODUCTO = document.getElementById('precioProductoDetalle'),
    CANTIDAD_PRODUCTO = document.getElementById('cantidadProductoDetalle'),
    TOTAL_PAGADO = document.getElementById('TotalPagadoProductoDetalle');


document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    //MAIN_TITLE.textContent = 'Gestionar categorías';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
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
    (ID_COMPRA.value) ? action = 'updateRow' : action = 'createRow';
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

const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(COMPRAS_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += 
              <tr>
                  <td>${row.id_compra}</td>
                  <td>${row.nombre_completo}</td>
                  <td>${row.direccion_compra}</td>
                  <td>${row.fecha_registro}</td>
                  <td>${row.estado_compra}</td>
                  <td>
                      

                    
                    <button type="submit" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_compra})">
                        
                        <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px"
                            class="mb-1">

                    </button>
                    <button type="submit" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_compra})">
                        
                        <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px"
                            class="mb-1">
                    </button>

                    <button type="submit" class="btn mt-1" id="btnDetalles" name="btnDetalles" onclick="openDetail(${row.id_compra})">
                    
                    <img src="../../resources/images/btnDetalles.png" alt="" width="30px" height="30px"
                        class="mb-1">
                    </button>

                    <button type="submit" class="btn mt-1" id="btnDetalles" name="btnDetalles" onclick="openReport(${row.id_compra})">
                    
                    <img src="../../resources/images/report.png" alt="" width="30px" height="30px"
                        class="mb-1">
                    </button>

                  </td>
              </tr>
          ;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCompra', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(COMPRAS_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar estado de la compra';
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
                TABLE_BODY2.innerHTML += 
                  <tr>
                      <td>${row.id_detalle_compra}</td>
                      <td><img src="${SERVER_URL}images/productos/${row.imagen_producto}" alt="..." width="200px" height="200px" name="imagenProductoDetalle"
                      id="imagenProductoDetalle"></td>
                      <td>${row.nombre_producto}</td>
                      <td>$${row.precio_producto}</td>
                      <td>${row.cantidad_producto}</td>
                      <td>${row.descuento_producto}%</td>
                      <td>$${row.SubtotalConDescuento}</td>
                      
                  </tr>
              ;

              totalCompra += parseFloat(row.SubtotalConDescuento);
            });
            // Se muestra un mensaje de acuerdo con el resultado.
            ROWS_FOUND.textContent = DATA.message;
        } else {
            sweetAlert(4, DATA.error, true);
        }

        TABLE_BODY2.innerHTML += 
                  <tr>
                    <td colspan="6" class="bg-dark text-white fw-bold">Total de la compra</td>
                    <td class="bg-dark text-white fw-bold">$${totalCompra.toFixed(2)}</td>
                </tr>
              
        
        // Se muestra la caja de diálogo con su título.
        DETALLE_FORM.show();
        MODAL_TITLED.textContent = 'Detalles del pedido';

        
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

const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este detalle de forma permanente?');
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
    const PATH = new URL(${SERVER_URL}reports/admin/compra_productos.php);
    // Se agrega un parámetro a la ruta con el valor del registro seleccionado.
    PATH.searchParams.append('idCompra', id);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}


const openReport2 = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(${SERVER_URL}reports/admin/prediccion_productos_ventas.php);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}
 */