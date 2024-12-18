// Constantes para completar la ruta de la API.
const PRODUCTO_API = 'services/public/productos.php';
const ORDEN_API = 'services/public/compras.php';
// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
const idDetalle = PARAMS.get('idDetalle');
const idProducto = PARAMS.get('idProducto');
const nombreProducto = PARAMS.get('nombreProducto');

// Constante para establecer el formulario de agregar un producto al carrito de compras.
const SHOPPING_FORM = document.getElementById('shoppingForm');
const CANTIDAD = document.getElementById('cantidadProducto');
const CARD = document.getElementById('cardComentarios');

const divNombre = document.getElementById('nombreP');
const divNumero = document.getElementById('numeroP');
const divLabelNombre = document.getElementById('labelCamisa');
const divLabelNumero = document.getElementById('labelNumero');
const datosPersonalizacion = document.getElementById('datosPersonalizacion');

// Método del eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    //MAIN_TITLE.textContent = 'Detalles del producto';
    // Constante tipo objeto con los datos del producto seleccionado.
    CARD.innerHTML = '';
    const FORM = new FormData();
    FORM.append('idDetalle', idDetalle);

    const FORM2 = new FormData();
    FORM2.append('idProducto', idProducto);

    // Petición para solicitar los datos del producto seleccionado.
    const DATA = await fetchData(PRODUCTO_API, 'readOnee', FORM);
    const DATA2 = await fetchData(PRODUCTO_API, 'commentsProduct', FORM2);

    //Para mostrarlo solamente si la búsqueda incluye ese campo
    if (nombreProducto.includes("Camisa")) {
        divNombre.style.display = 'block';
        divNumero.style.display = 'block';
        divLabelNombre.style.display = 'block';
        divLabelNumero.style.display = 'block';
    }
    else if (nombreProducto.includes("Short")) {
        divNumero.style.display = 'block';
        divLabelNumero.style.display = 'block';
    }
    else {
        divNombre.style.display = 'none';
        divNumero.style.display = 'none';
    }

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se colocan los datos en la página web de acuerdo con el producto seleccionado previamente.
        document.getElementById('imagenProducto').src = SERVER_URL.concat('images/productos/', DATA.dataset.imagen_producto);
        document.getElementById('nombreProducto').textContent = DATA.dataset.nombre_producto;
        document.getElementById('descripcionProducto').textContent = DATA.dataset.descripcion_producto;
        document.getElementById('precioProducto').textContent = "$" + DATA.dataset.precio_producto;
        document.getElementById('existenciasProducto').textContent = DATA.dataset.existencias_producto;
        document.getElementById('descuentoProducto').textContent = DATA.dataset.descuento_producto;
        document.getElementById('talla').textContent = DATA.dataset.talla;
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = `#${DATA.dataset.color}`;
        colorBox.style.color = `#${DATA.dataset.color}`;
        colorBox.textContent = DATA.dataset.color;
        document.getElementById('color').appendChild(colorBox);

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
    }

    if (DATA2.status) {
        DATA2.dataset.forEach(row => {
            CARD.innerHTML += `
            <div class="col-md-12 col-lg-12 mt-3 mb-1">
                <div class="card-body" id="borde">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div class="d-flex align-items-center">
                            <img src="${SERVER_URL}images/clientes/${row.foto_cliente}" alt="..." height="40px" width="40px" class="mr-2 rounded-circle">
                            <span class="card-text mx-2">${row.nombre_cliente} ${row.apellido_cliente}</span>
                        </div>
                        <span class="card-text">${row.fecha_valoracion}</span>
                    </div>
                    <span class="card-text d-block">${generateStars(row.calificacion_producto)} ${row.calificacion_producto}</span>
                    <span class="card-text d-block">${row.comentario_producto}</span>
                         
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

// Función para actualizar el valor de datosPersonalizacion
function updateDatosPersonalizacion() {
    const valorNombreP = nombreP.value;
    const valorNumeroP = numeroP.value;

    const nombreRegex = /^[a-zA-Z-áéíóúÁÉÍÓÚ\s]+$/; // Regex para permitir solo letras y espacios
    if (!nombreRegex.test(valorNombreP) && valorNombreP !== '') {
        alert('El nombre no debe contener números.');
        nombreP.value = ''; // Limpia el campo de entrada si no es válido
        return; // Salir de la función
    }

    const numeroRegex = /^\d+$/; // Regex para permitir solo números
    if (!numeroRegex.test(valorNumeroP) && valorNumeroP !== '') {
        alert('El número no debe contener letras.');
        numeroP.value = ''; // Limpia el campo de entrada si no es válido
        return; // Salir de la función
    }

    if (valorNumeroP > 1000) {
        alert('El número no debe ser mayor a 1000.');
        numeroP.value = ''; // Limpia el campo de entrada si el número es mayor a 1000
        return; // Salir de la función
    }

    // Verificar si ambos valores están vacíos
    if (!nombreP.value && !numeroP.value) {
        datosPersonalizacion.value = "Sin Personalizar"; // Si ambos están vacíos
    } else {
        // Concatenar los valores de nombreP y numeroP
        datosPersonalizacion.value = `${nombreP.value || 'Sin nombre'}, ${numeroP.value || '0'}`; // Usa 'Sin nombre' si nombreP está vacío y '0' si numeroP está vacío
    }
}

// Agregar eventos a los campos para actualizar en tiempo real
nombreP.addEventListener('input', updateDatosPersonalizacion);
numeroP.addEventListener('input', updateDatosPersonalizacion);


// Agregar eventos a los campos
nombreP.addEventListener('input', updateDatosPersonalizacion);
numeroP.addEventListener('input', updateDatosPersonalizacion);


// Método del evento para cuando se envía el formulario de agregar un producto al carrito.
SHOPPING_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();

    updateDatosPersonalizacion();

    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SHOPPING_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ORDEN_API, 'createDetail', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se constata si el cliente ha iniciado sesión.
    if (DATA.status) {
        sweetAlert(1, DATA.message, false, 'carrito.html');
    } else if (DATA.session) {
        sweetAlert(2, DATA.error, false);
        sweetAlert(2, DATA.exception, false);
    } else {
        sweetAlert(3, DATA.error, true, 'index.html');
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


//Funcionalidad para los botones de incrementar y decrementar el valor de la cantidad de productos adquirida
$(document).ready(function () {
    // Incrementar cantidad
    $('#btnIncrementar').click(function () {
        let cantidad = parseInt($('#cantidadProducto').val());
        // Si el campo está vacío o NaN, establecemos la cantidad a 1
        if (isNaN(cantidad) || cantidad <= 0) {
            $('#cantidadProducto').val(1);
        } else {
            $('#cantidadProducto').val(cantidad + 1);
        }
    });

    // Decrementar cantidad
    $('#btnDecrementar').click(function () {
        let cantidad = parseInt($('#cantidadProducto').val());
        // Si el campo está vacío o NaN, establecemos la cantidad a 1
        if (isNaN(cantidad) || cantidad <= 0) {
            $('#cantidadProducto').val(1);
        } else if (cantidad > 1) {
            $('#cantidadProducto').val(cantidad - 1);
        }
    });
});


