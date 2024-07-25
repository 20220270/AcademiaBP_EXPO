
const ORDENES_API = 'services/public/compras.php';
const VALORACION_API = 'services/public/valoracion.php';

const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
    const SAVE_MODAL = new bootstrap.Modal('#modalValorar');
    const MODAL_TITLE = document.getElementById('modalTitle');
    const SAVE_FORM = document.getElementById('formularioValoracion'),
    VALORACION_PRODUCTO = document.getElementById('calificacion'),
    COMENTARIO_PRODUCTO = document.getElementById('comentario'),
    ID_DETALLE = document.getElementById('idDetalle');


    CARD_ORDENES = document.getElementById('ordenes');


document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    //MAIN_TITLE.textContent = 'Editar perfil';
    // Petición para obtener los datos del usuario que ha iniciado sesión.
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

const fillTable = async (form = null) => {
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    CARD_ORDENES.innerHTML = '';

    const action = form ? 'searchOrders' : 'myOrders'; //
    const DATA = await fetchData(ORDENES_API, action, form);

    if (DATA.status) {
        const rows = DATA.dataset.map(row => `
            <div class="col-lg-10 col-md-12 col-sm-12 mt-2 mx-auto" id="orden">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-6 col-md-12 mb-3 mt-5">
                                <div class="row mb-2">
                                    <div class="col-12">
                                        <strong>Orden número: ${row.id_compra}</strong>
                                    </div>
                                </div>

                                <div class="row mb-2">
                                    <div class="col-6">
                                        <strong>Precio de la compra:</strong>
                                    </div>
                                    <div class="col-6">
                                        <span class="precioCompra">$${row.SubtotalConDescuento}</span>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col-6">
                                        <strong>Fecha de la compra:</strong>
                                    </div>
                                    <div class="col-6">
                                        <span class="fechaCompra">${row.fecha_registro}</span>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col-6">
                                        <strong>Estado de la compra:</strong>
                                    </div>
                                    <div class="col-6">
                                        <span class="estadoCompra">${row.estado_compra}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 col-md-12">
                                <div class="row mb-2">
                                
                                <div class="row mb-2">
                                    <div class="col-12 text-center">
                                        <img src="${SERVER_URL}images/productos/${row.imagen_producto}" alt="Producto" height="180px" width="200px">
                                    </div>
                                </div>
                                    <div class="col-6">
                                        <strong>Nombre del producto:</strong>
                                    </div>
                                    <div class="col-6">
                                        <span class="nombreProducto">${row.nombre_producto}</span>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col-6">
                                        <strong>Precio del producto:</strong>
                                    </div>
                                    <div class="col-6">
                                        <span class="precioProducto">$${row.precio_producto}</span>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col-6">
                                        <strong>Cantidad adquirida:</strong>
                                    </div>
                                    <div class="col-6">
                                        <span class="cantidadCompra">${row.cantidad_producto}</span>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col-6">
                                        <strong>Descuento aplicado:</strong>
                                    </div>
                                    <div class="col-6">
                                        <span class="cantidadCompra">${row.descuento_producto}%</span>
                                    </div>
                                </div>
                                
                                <div class="text-center mt-3">
                                    <strong>Valorar producto:</strong>
                                    <button type="submit" class="btn mt-1 mostrarModalValoracion" id="mostrarModalValoracion" name="mostrarModalValoracion" onclick="openRating(${row.id_detalle_compra})">
                                    
                                    <img src="../../resources/images/valorarP.png" alt="" width="60px" height="60px" class="mb-1">
                                    </button>
                                </div>

                                <div class="text-center mt-3">
                                    <strong>Generar factura:</strong>
                                    <button type="submit" class="btn mt-1 mostrarModalValoracion" id="mostrarReporte" name="mostrarReporte" onclick="openReport(${row.id_compra})">
                                    
                                    <img src="../../resources/images/report.png" alt="" width="45px" height="60px" class="mb-1">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join(''); //Utilizamos join para que toda la cadena del arreglo de datos se vea mas ordenada, 
        //y se utilizan las porpiedades de bootstrap para crear columnas dentro de la card.

        CARD_ORDENES.innerHTML = rows;
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
};

SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    //(ID_ADMINISTRADOR.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(VALORACION_API, 'createRating', FORM);
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

const openRating = async (id) => {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Valora esta compra';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        ID_DETALLE.value = id;
  }

  const openReport = (id) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/public/ordenes.php`);
    // Se agrega un parámetro a la ruta con el valor del registro seleccionado.
    PATH.searchParams.append('idCompra', id);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}

  //Popups

  document.getElementById('microphone-button').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: '¡Habla para buscar!',
        content: 'Haz clic aquí, habla al micrófono y realiza tus búsquedas de compras.',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('microphone-button').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});

document.getElementById('botonCerrarCo').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Cerrar ventana',
        content: 'Haz clic aquí para cerrar este ventana. Puedes dar clic en nuestro logo para cerrar la ventana de igual forma',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonCerrarCo').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});

//popup del boton para cerrar ventana - logo de La Academia
document.getElementById('botonCerrarCo2').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Cerrar ventana',
        content: 'Haz clic aquí para cerrar este ventana. Puedes dar clic en la imagen de comentarios para cerrar la ventana de igual forma',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonCerrarCo2').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});






