// Constantes para completar la ruta de la API.
const PRODUCTO_API = 'services/public/productos.php';
const ORDEN_API = 'services/public/compras.php';
// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
// Constante para establecer el formulario de agregar un producto al carrito de compras.
const SHOPPING_FORM = document.getElementById('shoppingForm');
const CANTIDAD = document.getElementById('cantidadProducto');
const CARD = document.getElementById('cardComentarios');

// Método del eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    //MAIN_TITLE.textContent = 'Detalles del producto';
    // Constante tipo objeto con los datos del producto seleccionado.
    CARD.innerHTML = '';
    const FORM = new FormData();
    FORM.append('idDetalle', PARAMS.get('id'));

    const FORM2 = new FormData();
    FORM2.append('idProducto', PARAMS.get('id'));
    
    // Petición para solicitar los datos del producto seleccionado.
    const DATA = await fetchData(PRODUCTO_API, 'readOnee', FORM);
    const DATA2 = await fetchData(PRODUCTO_API, 'commentsProduct', FORM2);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se colocan los datos en la página web de acuerdo con el producto seleccionado previamente.
        document.getElementById('imagenProducto').src = SERVER_URL.concat('images/productos/', DATA.dataset.imagen_producto);
        document.getElementById('nombreProducto').textContent = DATA.dataset.nombre_producto;
        document.getElementById('descripcionProducto').textContent = DATA.dataset.descripcion_producto;
        document.getElementById('precioProducto').textContent = DATA.dataset.precio_producto;
        document.getElementById('existenciasProducto').textContent = DATA.dataset.existencias_producto;
        document.getElementById('descuentoProducto').textContent = DATA.dataset.descuento_producto;

        document.getElementById('idProducto').value = DATA.dataset.id_producto;
        document.getElementById('idDetalle').value = DATA.dataset.id_detalle_producto;

    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        document.getElementById('mainTitle').textContent = DATA.error;
        document.getElementById('detalle').innerHTML = `
        <div class="col-md-12 col-lg-12 mt-3 mb-1">
                <div class="card-body" id="borde">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div class="d-flex align-items-center">
                            <img src="${SERVER_URL}images/clientes/${row.foto_cliente}" alt="..." height="40px" width="40px" class="mr-2  rounded-circle">
                            <span class="card-text>${row.nombre_cliente} ${row.apellido_cliente}</span>
                        </div>
                        <span class="card-text">${row.fecha_valoracion}</span>
                    </div>
                    <span class="card-text d-block">${row.comentario_producto}</span>
                    <span class="card-text d-block">${generateStars(row.calificacion_producto)} ${row.calificacion_producto}</span>     
                </div>
            </div>
        `;
    }

    if (DATA2.status) {
        DATA2.dataset.forEach(row => {
            CARD.innerHTML += `
            <div class="col-md-12 col-lg-12 mt-3 mb-1">
                <div class="card-body" id="borde">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div class="d-flex align-items-center">
                            <img src="${SERVER_URL}images/clientes/${row.foto_cliente}" alt="..." height="40px" width="40px" class="mr-2 rounded-circle">
                            <span class="card-text">${row.nombre_cliente} ${row.apellido_cliente}</span>
                        </div>
                        <span class="card-text">${row.fecha_valoracion}</span>
                    </div>
                    <span class="card-text d-block">${row.comentario_producto}</span>
                    <span class="card-text d-block">${generateStars(row.calificacion_producto)} ${row.calificacion_producto}</span>     
                </div>
            </div>
            `;
        })
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        document.getElementById('mainTitle').textContent = DATA.error;
        // Se limpia el contenido cuando no hay datos para mostrar.
        document.getElementById('cardComentarios').innerHTML = `
        <div class="center-content">
            <img src="../../resources/images/nocomments.png" alt="No comments available" height="100px" width="110px">
            <b>No hay comentarios disponibles</b>
        </div>
        `;
    }
});


// Método del evento para cuando se envía el formulario de agregar un producto al carrito.
SHOPPING_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SHOPPING_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ORDEN_API, 'createDetail', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se constata si el cliente ha iniciado sesión.
    if (DATA.status) {
        sweetAlert(1, DATA.message, false, 'carrito.html');
    } else if (DATA.session) {
        sweetAlert(2, DATA.error, false);
    } else {
        sweetAlert(3, DATA.error, true, 'login.html');
    }
});

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