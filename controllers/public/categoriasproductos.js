// Constantes para completar la ruta de la API y obtener los parámetros de la URL.
const PRODUCTO_API = 'services/public/productos.php';
const PARAMS = new URLSearchParams(location.search);

// Elementos del DOM
const PRODUCTOS = document.getElementById('productos');
const PRODUCTOS1 = document.getElementById('productos1');
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
                // Se crean y concatenan las tarjetas con los datos de cada producto.
                PRODUCTOS.innerHTML += `
                    <div class="col-sm-12 col-md-6 col-lg-3 mb-3">
                        <div class="card h-100">
                            <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top img-fluid mt-5" alt="${row.nombre_producto}">
                            <div class="card-body">
                                <h5 class="card-title text-center">${row.nombre_producto}</h5>
                                <ul class="list-group list-group-flush">
                                    
                                    <button type="button" class="btn mt-1" id="btnDetalles" name="btnDetalles" onclick="fillTable(${row.id_producto})">
                                        <img src="../../resources/images/verdetalles.png" alt="" width="30px" height="30px" class="mb-1">
                                    </button>

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
                // Establece un icono para el estado del producto.
                const icon = (row.estado_producto) ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill';

                let descuento;
                if (parseFloat(row.descuento_producto) > 0.00) {
                    descuento = `<span class="descuento">${row.descuento_producto}% de descuento</span>`;
                } else {
                    descuento = `<span class="sin-descuento">Sin descuento</span>`;
                }
                // Crea y concatena las cards con los datos de cada registro.
                PRODUCTOS1.innerHTML += `
                    <div class="col-sm-12 col-md-6 col-lg-6 mb-3">
                        <div class="card h-100">
                            <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top img-fluid mt-5" alt="${row.nombre_producto}">
                            <div class="card-body">
                                <h5 class="card-title text-center">${row.nombre_producto}</h5>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Precio del producto: $${row.precio_producto}</li>
                                    <li class="list-group-item">Existencias: ${row.existencias_producto}</li>
                                    <li class="list-group-item">Talla: ${row.talla}</li>
                                    <li class="list-group-item d-flex align-items-center">
                                        Color: 
                                        <div class="color-box ms-2" style="background-color: #${row.color}; color: #${row.color}">${row.color}</div>
                                    </li>
                                    <li class="list-group-item mt-4 mb-4 text-center">${descuento}</li>
                                </ul>
                            </div>
                            <div class="card-body text-center">
                                <a href="detallesproductos.html?idDetalle=${row.id_detalle_producto}&idProducto=${row.id_producto}" class="btn" id="btnVermas">Comenzar compra</a>
                            </div>
                        </div>
                    </div>
                `;
            });
            // Mostrar la modal después de llenar los detalles del producto.
            SAVE_MODAL.show();
            MODAL_TITLE.textContent = 'Productos';
        } else {
            sweetAlert(4, DATA.error, true);
        }
    } catch (error) {
        console.error('Error al cargar detalles del producto:', error);
        sweetAlert(4, 'Error al cargar detalles del producto', true);
    }
}
