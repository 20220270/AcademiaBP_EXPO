// Constantes para completar las rutas de la API.
const PRODUCTO_API = 'services/admin/productos.php';
const CATEGORIA_API = 'services/admin/categoriasproductos.php';
const DETALLES_PRODUCTOS_API = 'services/admin/detallesproductos.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
const SEARCH_FORM2 = document.getElementById('searchForm2');

const CARD_PRODUCTOS = document.getElementById('cardsProductos');
const CARD_DETALLES = document.getElementById('cardsDetalles');

// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal');
const MODAL_TITLE = document.getElementById('modalTitle');

const SAVE_MODAL2 = new bootstrap.Modal('#saveModal2');
const MODAL_TITLE2 = document.getElementById('modalTitle2');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm');
const ID_PRODUCTO = document.getElementById('idProducto');
const CATEGORIA_PRODUCTO = document.getElementById('selectCategoria');
const NOMBRE_PRODUCTO = document.getElementById('nombreProducto');
const DESCRIPCION_PRODUCTO = document.getElementById('descripcionProducto');
const PRECIO_PRODUCTO = document.getElementById('PrecioProducto');
const IMAGEN_PRODUCTO = document.getElementById('inputImgProducto');
const ESTADO_PRODUCTO = document.getElementById('selectEstado');
const DESCUENTO_PRODUCTO = document.getElementById('descuentoProducto');

const SAVE_FORM2 = document.getElementById('saveForm2');
const ID_DETALLE = document.getElementById('idDetalleProducto');
const ID_PRODUCTOO = document.getElementById('selectproducto');
const ID_TALLA = document.getElementById('selectTalla');
const ID_COLOR = document.getElementById('selectColor');
const EXISTENCIAS_PRODUCTO = document.getElementById('existenciasProducto');

document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
    fillTable2();
});

SEARCH_FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM = new FormData(SEARCH_FORM);
    fillTable(FORM);
});

SEARCH_FORM2.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM2 = new FormData(SEARCH_FORM2);
    fillTable2(FORM2);
});

SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    const action = (ID_PRODUCTO.value) ? 'updateRow' : 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PRODUCTO_API, action, FORM);
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

SAVE_FORM2.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    const action = (ID_DETALLE.value) ? 'updateRow' : 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM2);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(DETALLES_PRODUCTOS_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL2.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable2();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

const fillTable = async (form = null) => {
    // Inicializa el contenido de las cards.
    CARD_PRODUCTOS.innerHTML = '';
    // Verifica la acción a realizar.
    const action = (form) ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PRODUCTO_API, action, form);
    // Comprueba si la respuesta es satisfactoria, de lo contrario muestra un mensaje con la excepción.
    if (DATA.status) {
        // Recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Establece un icono para el estado del producto.
            const icon = (row.estado_producto) ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill';
            // Crea y concatena las cards con los datos de cada registro.
            CARD_PRODUCTOS.innerHTML += `
                <div class="col">
                    <div class="card mb-3">
                        <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top" alt="${row.nombre_producto}">
                        <div class="card-body text-start">
                            <h5 class="card-title fs-2 mb-2">${row.nombre_producto}</h5>
                            <p class="card-text"><b>Categoría:</b> ${row.categoria_producto}</p>
                            <p class="card-text"><b>Descripción:</b> ${row.descripcion_producto}</p>
                            <p class="card-text"><b>Precio: $</b>${row.precio_producto}</p>
                            <p class="card-text"><b>Estado:</b> ${row.estado_producto}</p>
                            <p class="card-text"><b>Descuento:</b> ${row.descuento_producto}%</p>
                            <p class="card-text"><small class="text-muted">Registrado desde: ${row.fecha_registro}</small></p>
                            
                            <div class="d-flex justify-content-center gap-1">
                            <button type="submit" class="btn" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_producto})">
                            <i class="bi bi-search"></i>
                            <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                            </button>
                            <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_producto})">
                            <i class="bi bi-x-square-fill"></i>
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

const fillTable2 = async (form = null) => {
    // Inicializa el contenido de las cards.
    CARD_DETALLES.innerHTML = '';
    // Verifica la acción a realizar.
    const action = (form) ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(DETALLES_PRODUCTOS_API, action, form);
    // Comprueba si la respuesta es satisfactoria, de lo contrario muestra un mensaje con la excepción.
    if (DATA.status) {
        // Recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Crea y concatena las cards con los datos de cada registro.
            CARD_DETALLES.innerHTML += `
                <div class="col">
    <div class="card mb-3">
        <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top" alt="${row.nombre_producto}">
        <div class="card-body text-start">
            <h5 class="card-title fs-2 mb-3">Detalle: ${row.id_detalle_producto}</h5>
            <p class="card-text"><b>Producto: </b> ${row.nombre_producto}</p>
            <p class="card-text"><b>Talla: </b> ${row.talla}</p>
            
            <div class="d-flex align-items-center">
                <h5 class="card-title me-3"><b>Color:</b> #${row.color}</h5>
                <div class="color-box2" width="100%" height="20%"  style="background-color: #${row.color};"></div>
            </div>
            
            <p class="card-text mt-2"><b>Existencias: </b> ${row.existencias_producto}</p>
            
            <div class="d-flex justify-content-center gap-1 mt-3">
                <button type="submit" class="btn" id="btnEliminar" name="btnEliminar" onclick="openDelete2(${row.id_detalle_producto})">
                    <i class="bi bi-search"></i>
                    <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                </button>
                <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate2(${row.id_detalle_producto})">
                    <i class="bi bi-x-square-fill"></i>
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

const openCreate = () => {
    // Muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear producto';
    // Prepara el formulario.
    SAVE_FORM.reset();
    fillSelect(CATEGORIA_API, 'readAll', 'selectCategoria');
}

const openCreate2 = () => {
    // Muestra la caja de diálogo con su título.
    SAVE_MODAL2.show();
    MODAL_TITLE2.textContent = 'Asignar detalle a productos';
    // Prepara el formulario.
    SAVE_FORM2.reset();
    fillSelect(DETALLES_PRODUCTOS_API, 'readProductosCombobox', 'selectproducto');
    fillSelect(DETALLES_PRODUCTOS_API, 'readTallasCombobox', 'selectTalla');
    fillSelect(DETALLES_PRODUCTOS_API, 'readColoresCombobox', 'selectColor');
}


const openUpdate = async (id) => {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar producto';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_PRODUCTO.value = ROW.id_producto;
        NOMBRE_PRODUCTO.value = ROW.nombre_producto;
        DESCRIPCION_PRODUCTO.value = ROW.descripcion_producto;
        PRECIO_PRODUCTO.value = ROW.precio_producto;
        DESCUENTO_PRODUCTO.value = ROW.descuento_producto;
        ESTADO_PRODUCTO.value = ROW.estado_producto;

        fillSelect(CATEGORIA_API, 'readAll', 'selectCategoria', ROW.id_categoria_producto);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openUpdate2 = async (id) => {
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idDetalleProducto', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(DETALLES_PRODUCTOS_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL2.show();
        MODAL_TITLE2.textContent = 'Actualizar detalle';
        // Se prepara el formulario.
        SAVE_FORM2.reset();
        //ESTADO_PRODUCTO.disabled = false;
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_DETALLE.value = ROW.id_detalle_producto;
        EXISTENCIAS_PRODUCTO.value = ROW.existencias_producto;

        fillSelect(DETALLES_PRODUCTOS_API, 'readProductosCombobox', 'selectproducto', ROW.id_producto);
        fillSelect(DETALLES_PRODUCTOS_API, 'readTallasCombobox', 'selectTalla', ROW.id_talla);
        fillSelect(DETALLES_PRODUCTOS_API, 'readColoresCombobox', 'selectColor', ROW.id_color);
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
    const RESPONSE = await confirmAction('¿Desea eliminar el producto de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idProducto', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(PRODUCTO_API, 'deleteRow', FORM);
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

const openDelete2 = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el producto de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idDetalleProducto', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(DETALLES_PRODUCTOS_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable2();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/productos.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}

const openReport2 = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/prediccion_productos_ventas.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}

const openReport3 = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/prediccion_productos_valoraciones.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}
