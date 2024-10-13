// Constante para completar la ruta de la API.
const PEDIDO_API = 'services/public/compras.php';
// Constante para establecer el cuerpo de la tabla.
const TABLE_BODY = document.getElementById('tableBody');
// Constante para establecer la caja de diálogo de cambiar producto.
const ITEM_MODAL = new bootstrap.Modal('#itemModal');
const SAVE_MODAL = new bootstrap.Modal('#modalMetodos');
// Constante para establecer el formulario de cambiar producto.
const ITEM_FORM = document.getElementById('itemForm');
const CARD_CARRITO = document.getElementById('cardProductosCarrito');
const CARD_METODOS = document.getElementById('cardsMetodos');

const MODAL_METODOS = document.getElementById('metodosForm');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    //MAIN_TITLE.textContent = 'Carrito de compras';
    // Llamada a la función para mostrar los productos del carrito de compras.
    readDetail();
});


const fillTable = async (form = null) => {
    // Inicializa el contenido de las cards.
    CARD_METODOS.innerHTML = '';
    // Verifica la acción a realizar.
    const action = (form) ? 'searchRows' : 'readMetodosPago';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PEDIDO_API, action, form);
    // Comprueba si la respuesta es satisfactoria, de lo contrario muestra un mensaje con la excepción.
    if (DATA.status) {
        // Recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Crea y concatena las cards con los datos de cada registro.
            CARD_METODOS.innerHTML += `
                <div class="col-12 col-md-12 col-lg-6 mt-3 mb-3 mx-auto" >
                    <div class="card h-100" data-id-metodo="${row.id_metodo_pago}">
                        <div class="row mb-5 mt-2 mx-auto" onclick="seleccionarMetodoPago(${row.id_metodo_pago}, '${row.nombre_metodo}')">
                            <div class="col-3">
                                <div class="mt-4"><img src="${SERVER_URL}images/metodospagos/${row.imagen_metodo}" class="card-img-top"></div>
                            </div>
                            <div class="col-8 mt-3">
                                <div class="card-body text-start">
                                    <h5 class="card-title fs-2 mb-2"> ${row.nombre_metodo}</h5>
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


function mostrarInputs() {
    const metodoPago = document.getElementById('nombreMetodo').value;

    // Ocultar todos los inputs inicialmente
    document.getElementById('inputTarjeta').style.display = 'none';
    document.getElementById('nombreTarjeta').style.display = 'none';
    document.getElementById('fechaVencimiento').style.display = 'none';
    document.getElementById('codigoCVV').style.display = 'none';
    document.getElementById('inputPayPal').style.display = 'none';
    document.getElementById('inputTransferencia').style.display = 'none';
    document.getElementById('inputSWIFT').style.display = 'none';

    // Mostrar los inputs según el método de pago seleccionado
    if (metodoPago === "Tarjeta de crédito" || metodoPago === "Tarjeta de débito") {
        document.getElementById('inputTarjeta').style.display = 'block';
        document.getElementById('nombreTarjeta').style.display = 'block';
        document.getElementById('fechaVencimiento').style.display = 'block';
        document.getElementById('codigoCVV').style.display = 'block';
    } else if (metodoPago === "PayPal") {
        document.getElementById('inputPayPal').style.display = 'block';
    } else if (metodoPago === "Transferencia bancaria") {
        document.getElementById('inputTransferencia').style.display = 'block';
        document.getElementById('inputSWIFT').style.display = 'block';
    }
}



function seleccionarMetodoPago(id_metodo_pago, nombre_metodo) {
    // Asignar el id_metodo_pago y el nombre_metodo a los inputs ocultos
    document.getElementById('idMetodoPago').value = id_metodo_pago;
    document.getElementById('nombreMetodo').value = nombre_metodo;

    // Obtener todos los elementos que tengan la clase 'selected'
    const elementosSeleccionados = document.querySelectorAll('.selected');
    
    // Remover la clase 'selected' de los elementos previamente seleccionados
    elementosSeleccionados.forEach(elemento => {
        elemento.classList.remove('selected');
    });

    // Añadir la clase 'selected' al elemento seleccionado
    const metodoSeleccionado = document.querySelector(`[data-id-metodo="${id_metodo_pago}"]`);
    metodoSeleccionado.classList.add('selected');

    mostrarInputs();
}


function actualizarDatosPago() {
    // Obtener los valores de los inputs
    const nombreMetodo = document.getElementById('nombreMetodo').value;
    const numeroTarjeta = document.getElementById('numeroTarjeta').value;
    const nombreTarjeta = document.getElementById('nombreTarjeta').value;
    const fechaVencimiento = document.getElementById('fechaVencimiento').value;
    const codigoCVV = document.getElementById('codigoCVV').value;
    const paypalCorreo = document.getElementById('paypalCorreo').value;
    const numeroCuenta = document.getElementById('numeroCuenta').value;
    const codigoSWIFT = document.getElementById('codigoSWIFT').value;

    // Imprimir los valores en la consola para verificar
    console.log('Nombre Método:', nombreMetodo);
    console.log('Número Tarjeta:', numeroTarjeta);
    console.log('Nombre Tarjeta:', nombreTarjeta);
    console.log('Fecha Vencimiento:', fechaVencimiento);
    console.log('Código CVV:', codigoCVV);
    console.log('Correo PayPal:', paypalCorreo);
    console.log('Número Cuenta:', numeroCuenta);
    console.log('Código SWIFT:', codigoSWIFT);

    // Concatenar los valores separados por comas
    const datosConcatenados = [
        nombreMetodo,
        numeroTarjeta,
        nombreTarjeta,
        fechaVencimiento,
        codigoCVV,
        paypalCorreo,
        numeroCuenta,
        codigoSWIFT
    ].filter(Boolean) // Filtrar valores falsy
    .join(', '); // Unir los valores con coma

    // Asignar el valor concatenado al input oculto
    document.getElementById('datosPago').value = datosConcatenados;

    // Imprimir el resultado en la consola
    console.log('Datos Concatenados:', datosConcatenados);
}



const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    // Se prepara el formulario.
    MODAL_METODOS.reset();

    fillTable();
    mostrarInputs();
}

// Método del evento para cuando se envía el formulario de cambiar cantidad de producto.
ITEM_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(ITEM_FORM);
    // Petición para actualizar la cantidad de producto.
    const DATA = await fetchData(PEDIDO_API, 'updateDetail', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se actualiza la tabla para visualizar los cambios.
        readDetail();
        // Se cierra la caja de diálogo del formulario.
        ITEM_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función para obtener el detalle del carrito de compras.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
async function readDetail() {
    // Petición para obtener los datos del pedido en proceso.
    const DATA = await fetchData(PEDIDO_API, 'readDetail');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el cuerpo de la tabla.
        CARD_CARRITO.innerHTML = '';

        let subtotalcondescuento = 0;
        // Se declara e inicializa una variable para calcular el importe por cada producto.
        let subtotal = 0;
        // Se declara e inicializa una variable para sumar cada subtotal y obtener el monto final a pagar.
        let total = 0;
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            subtotal = row.precio_producto * row.cantidad_producto; // Calculo del subtotal
            subtotalcondescuento = subtotal - (subtotal * row.descuento_producto) / 100; // Calculo del subtotal aplicando el descuento
            total += subtotalcondescuento; // Ahora asignamos la nueva variable de subtotal con descuento para que se muestre en el total de la compra

            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CARD_CARRITO.innerHTML += `
                <div class="col-lg-6 col-md-10 col-sm-12 mb-4 mt-5 text-center mx-auto">
                    <div class="card h-100" id="cards">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="img-fluid rounded-end h-50 mt-5" alt="${row.nombre_producto}">
                            <h5 class="card-title mt-4">${row.nombre_producto}</h5>
                            <p class="mt-3">Talla adquirida: ${row.talla}</p>
                            <li class="list-group-item">
                                    Color: 
                                    <div class="color-box ms-2" style="background-color: #${row.color}; color: #${row.color}">${row.color}</div>
                                </li>
                                </div>
                            
                            <div class="col-md-8 card-body">
                            
                                
                                <label class="fw-bold mt-4">Precio del producto:</label>
                                <p>$${row.precio_producto}</p>
                                <label class="fw-bold mt-4">Cantidad:</label>
                                <p>${row.cantidad_producto}</p>
                                <label class="fw-bold mt-4">Sub total:</label>
                                <p>$${subtotal.toFixed(2)}</p>
                                <label class="fw-bold mt-4">Sub total con descuento:</label>
                                <p>$${subtotalcondescuento.toFixed(2)}</p>
                            </div>
                            
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_detalle_compra})">
                               
                                <img src="../../resources/images/quitarproducto.png" alt="" width="40px" height="40px" class="mb-4">
                            </button>
                            <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_detalle_compra}, ${row.cantidad_producto})">
                                
                                <img src="../../resources/images/editardatos.png" alt="" width="40px" height="40px" class="mb-4">
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        // Se muestra el total a pagar con dos decimales.
        document.getElementById('pago').textContent = total.toFixed(2);
    } else {
        sweetAlert(4, DATA.error, false, 'index.html');
    }
}


/*
*   Función para abrir la caja de diálogo con el formulario de cambiar cantidad de producto.
*   Parámetros: id (identificador del producto) y quantity (cantidad actual del producto).
*   Retorno: ninguno.
*/
function openUpdate(id, quantity) {
    // Se abre la caja de diálogo que contiene el formulario.
    ITEM_MODAL.show();
    // Se inicializan los campos del formulario con los datos del registro seleccionado.
    document.getElementById('idDetalle').value = id;
    document.getElementById('cantidadProducto').value = quantity;
}

/*
*   Función asíncrona para mostrar un mensaje de confirmación al momento de finalizar el pedido.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
async function finishOrder() {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Está seguro de finalizar la compra?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        const FORM = new FormData(MODAL_METODOS);
        // Petición para finalizar el pedido en proceso.
        const DATA = await fetchData(PEDIDO_API, 'finishOrder', FORM);
        console.log(DATA);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            sweetAlert(1, DATA.message, true, 'index.html');
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

/*
*   Función asíncrona para mostrar un mensaje de confirmación al momento de eliminar un producto del carrito.
*   Parámetros: id (identificador del producto).
*   Retorno: ninguno.
*/
async function openDelete(id) {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Está seguro de remover el producto del carrito?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define un objeto con los datos del producto seleccionado.
        const FORM = new FormData();
        FORM.append('idDetalle', id);
        // Petición para eliminar un producto del carrito de compras.
        const DATA = await fetchData(PEDIDO_API, 'deleteDetail', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            readDetail();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

