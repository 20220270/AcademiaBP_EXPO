// Constantes para completar la ruta de la API y obtener los parámetros de la URL.
const PRODUCTO_API = 'services/public/productos.php';
const PARAMS = new URLSearchParams(location.search);

// Elementos del DOM
const PRODUCTOS = document.getElementById('productos');
const PRODUCTOS1 = document.getElementById('productos1');
const PRODUCTOS_COMENTARIOS = document.getElementById('productos2');
const SAVE_MODAL2 = new bootstrap.Modal(document.getElementById('saveModal2'));
const SAVE_FORM2 = document.getElementById('saveForm2'),
    MODAL_TITLE2 = document.getElementById('modalTitle2');
const MAIN_TITLE = document.getElementById('mainTitle');
const SEARCH_FORM = document.getElementById('searchForm');
const SAVE_MODAL = new bootstrap.Modal(document.getElementById('saveModal'));
const SAVE_FORM = document.getElementById('saveForm'),
    MODAL_TITLE = document.getElementById('modalTitle');


// Método manejador de eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se define un objeto con los datos de la categoría seleccionada.
    const FORM = new FormData();
    FORM.append('idCategoria', PARAMS.get('id'));

    try {
        // Petición para solicitar los productos de la categoría seleccionada.
        const DATA = await fetchData(PRODUCTO_API, 'readProductosCategorias', FORM);

        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se asigna como título principal la categoría de los productos.
            MAIN_TITLE.textContent = `Categoría: ${PARAMS.get('nombre')}`;
            // Se inicializa el contenedor de productos.
            PRODUCTOS.innerHTML = '';

            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {

                let descuento;
                if (parseFloat(row.descuento_producto) > 0.00) {
                    descuento = `<span class="descuento">${row.descuento_producto}% de descuento</span>`;
                } else {
                    descuento = ``;
                }
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                PRODUCTOS.innerHTML += `
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
                        <div class="card h-100">
                        <h5 class="card-title text-center">${descuento}</h5>
                            <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top img-fluid mt-3" alt="${row.nombre_producto}">
                                <div class="card-body">
                                    <h5 class="card-title text-center">${row.nombre_producto}</h5>
                                        <ul class="list-group list-group-flush">
                                <!-- Contenedor flex para alinear los botones en la misma línea -->
                                <div class="d-flex justify-content-center">
                                <button type="button" class="btn mt-1 mx-1" id="btnDetalles" name="btnDetalles" onclick="fillTable(${row.id_producto})">
                                    <img src="../../resources/images/verdetalles.png" alt="" width="30px" height="30px" class="mb-1">
                                </button>
                                <button type="button" class="btn mt-1 mx-1" id="btnComentarios" name="btnComentarios" onclick="fillTable2(${row.id_producto}, '${row.nombre_producto}')" title="Ver valoraciones realizadas: ${row.total_valoraciones} valoraciones">
                                    <img src="../../resources/images/comentarios.png" alt="" width="30px" height="30px" class="mb-1"> ${row.total_valoraciones}
                                </button>
                                    </div>
                                        </ul>
                            </div>
                        </div>
                    </div>

                `;
            });
        } else {
            // Se presenta un mensaje de error cuando no existen datos para mostrar.
            MAIN_TITLE.textContent = DATA.error;
        }
    } catch (error) {
        console.error('Error al cargar productos:', error);
        sweetAlert(4, 'Error al cargar productos', true);
    }

    document.getElementById('btnDetalles').addEventListener('mouseenter', function () {
        var popover = new bootstrap.Popover(this, {
            title: 'Mira nuestras tallas y colores',
            content: 'Aquí puedes ver detalles como las tallas disponibles y los colores de nuestros productos.',
            placement: 'top',
            trigger: 'manual',
            boundary: 'viewport'
        });
        popover.show();
    });

    document.getElementById('btnDetalles').addEventListener('mouseleave', function () {
        var popover = bootstrap.Popover.getInstance(this);
        if (popover) {
            popover.dispose(); // Dispose el popover para eliminarlo completamente
        }
    });

    document.getElementById('btnDismiss').addEventListener('mouseenter', function () {
        var popover = new bootstrap.Popover(this, {
            title: 'Cerra ventana',
            content: 'Haz clic aquí para cerrar la ventana.',
            placement: 'top',
            trigger: 'manual',
            boundary: 'viewport'
        });
        popover.show();
    });

    document.getElementById('btnDismiss').addEventListener('mouseleave', function () {
        var popover = bootstrap.Popover.getInstance(this);
        if (popover) {
            popover.dispose(); // Dispose el popover para eliminarlo completamente
        }
    });
});


// Función para llenar la tabla de detalles del producto
const fillTable = async (id) => {
    // Inicializa el contenido de las cards de detalles.
    PRODUCTOS1.innerHTML = '';
    const FORM = new FormData();
    FORM.append('idCategoria', PARAMS.get('id'));
    FORM.append('idProducto', id); // Agregar el idProducto al formulario

    try {
        // Petición para obtener los detalles del producto seleccionado.
        const DATA = await fetchData(PRODUCTO_API, 'readProductosCategoria', FORM);

        // Comprueba si la respuesta es satisfactoria, de lo contrario muestra un mensaje con la excepción.
        if (DATA.status) {
            // Recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {

                let descuento;
                if (parseFloat(row.descuento_producto) > 0.00) {
                    descuento = `<span class="descuento">${row.descuento_producto}% de descuento</span>`;
                } else {
                    descuento = ``;
                }

                // Crea y concatena las cards con los datos de cada registro.
                PRODUCTOS1.innerHTML += `
                    <div class="col-6 col-sm-7 col-md-6 col-lg-4 mb-3 mx-auto">
                        <div class="card h-100">
                        <h5 class="card-title text-center">${descuento}</h5>
                        <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top img-fluid mb-3 mt-3 mx-auto" alt="${row.nombre_producto}">
                            <div class="card-body">
                                <div class="d-flex flex-wrap justify-content-center gap-4">
                                    <div class="talla-rect col-auto">${row.talla}</div>
                                    <div class="color-rect col-auto" style="background-color: #${row.color}; color: #${row.color}">${row.color}</div>
                                </div>
                            </div>
                            <div class="card-body text-center">
                                <a href="detallesproductos.html?idDetalle=${row.id_detalle_producto}&idProducto=${row.id_producto}&nombreProducto=${row.nombre_producto}&idTalla=${row.id_talla}&idColor=${row.id_color}" class="btn" id="btnVermas" title="Inicia tu compra">Comenzar compra</a>
                            </div>
                        </div>
                    </div>
                `;
            });
            // Mostrar la modal después de llenar los detalles del producto.
            SAVE_MODAL.show();
            MODAL_TITLE.textContent = 'Detalles de productos';
        } else {
            sweetAlert(4, DATA.error, true);
        }
    } catch (error) {
        console.error('Error al cargar detalles del producto:', error);
        sweetAlert(4, 'Error al cargar detalles del producto', true);
    }
}

const fillTable2 = async (id, nombre) => {
    // Inicializa el contenido de las cards de detalles.
    PRODUCTOS_COMENTARIOS.innerHTML = '';
    const FORM = new FormData();
    FORM.append('idProducto', id); // Agregar el idProducto al formulario

    try {
        // Petición para obtener los detalles del producto seleccionado.
        const DATA = await fetchData(PRODUCTO_API, 'commentsProduct', FORM);
        console.log(DATA)

        // Comprueba si la respuesta es satisfactoria, de lo contrario muestra un mensaje con la excepción.
        if (DATA.status) {
            // Recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {

                // Crea y concatena las cards con los datos de cada registro.
                PRODUCTOS_COMENTARIOS.innerHTML += `
                    <div class="col-md-12 col-lg-12 mt-3 mb-1">
                        <div class="card-body" id="borde">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <div class="d-flex align-items-center mx-2 mt-2">
                            <img src="${SERVER_URL}images/clientes/${row.foto_cliente}" alt="..." height="40px" width="40px" class="mr-2 rounded-circle">
                            <span class="card-text mx-2">${row.nombre_cliente} ${row.apellido_cliente}</span>
                        </div>
                        <span class="card-text me-4">${row.fecha_valoracion}</span>
                    </div>
                    <span class="card-text d-block mx-2">${generateStars(row.calificacion_producto)} ${row.calificacion_producto}</span>
                    <span class="card-text d-block mx-2 mb-3">${row.comentario_producto}</span>
                         
                </div>
            </div>
                `;
            });
            // Mostrar la modal después de llenar los detalles del producto.
            SAVE_MODAL2.show();
            MODAL_TITLE2.textContent = 'Comentarios del producto ' + nombre;
        } else {
            sweetAlert(4, DATA.error, true);
        }
    } catch (error) {
        console.error('Error al cargar detalles del producto:', error);
        sweetAlert(4, 'Error al cargar detalles del producto', true);
    }
}

// Función para generar estrellas basado en la calificación
function generateStars(rating) {
    const maxStars = 5;
    let stars = '';
    for (let i = 1; i <= maxStars; i++) {
        if (i <= rating) {
            stars += '<span class="star filled">★</span>';
        } else {
            stars += '<span class="star">☆</span>';
        }
    }
    return stars;
}


