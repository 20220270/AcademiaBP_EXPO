const CLIENTE_API = 'services/public/cliente.php';
const MENSUALIDAD_API = 'services/public/pagosmensualidad.php';

// Constantes para establecer los elementos del formulario de editar perfil.
const PROFILE_FORM = document.getElementById('profileForm'),
    ID_CLIENTE = document.getElementById('idCliente'),
    NOMBRE_CLIENTE = document.getElementById('nombreCliente'),
    APELLIDO_CLIENTE = document.getElementById('apellidoCliente'),
    DUI_CLIENTE = document.getElementById('duiCliente'),
    CORREO_CLIENTE = document.getElementById('correoCliente'),
    TELEFONO_CLIENTE = document.getElementById('telefonoCliente'),
    DIRECCION_CLIENTE = document.getElementById('direccionCliente'),
    FECHA_REGISTRO = document.getElementById('fecharegistroCliente'),
    FOTO_CLIENTE = document.getElementById('imagen'),
    PRODUCTOMASCOMPRADO = document.getElementById('productoMasAdquirido'),
    ULTIMAFECHACOMPRA = document.getElementById('ultimafechaCompra');

const PROFILE_FORM2 = document.getElementById('profileForm2'),
    CARDS_ALUMNOSREG = document.getElementById('cardAlumnos');

// Constante para establecer la modal de cambiar contraseña.
const PASSWORD_MODAL = new bootstrap.Modal('#passwordModal');
const SAVE_MODAL = new bootstrap.Modal('#modalMetodos');
// Constante para establecer el formulario de cambiar contraseña.
const PASSWORD_FORM = document.getElementById('passwordForm');
const CARD_METODOS = document.getElementById('cardsMetodos');

const MODAL_METODOS = document.getElementById('metodosForm');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    const DATA = await fetchData(USER_API, 'readProfile');
    const DATA2 = await fetchData(USER_API, 'readProductoMasCompradoCliente');
    const DATA3 = await fetchData(USER_API, 'readUltimaCompraCliente');
    
    let ROW; // Definir ROW en un alcance más amplio
    let ROW2;
    let ROW3;

    if (DATA.status) {
        ROW = DATA.dataset;
        ID_CLIENTE.value = ROW.id_cliente;
        NOMBRE_CLIENTE.value = ROW.nombre_cliente;
        APELLIDO_CLIENTE.value = ROW.apellido_cliente;
        DUI_CLIENTE.value = ROW.dui_cliente;
        CORREO_CLIENTE.value = ROW.correo_cliente;
        TELEFONO_CLIENTE.value = ROW.telefono_cliente;
        FECHA_REGISTRO.value = ROW.fecha_registro;
        DIRECCION_CLIENTE.value = ROW.direccion_cliente;

        FOTO_CLIENTE.src = `${SERVER_URL}images/clientes/${ROW.foto_cliente}`;

        // Llamar fillTable con el correo del cliente
        fillTable(ROW.correo_cliente);
    } else {
        sweetAlert(2, DATA.error, null);
    }

    if(DATA2.status){
        ROW2 = DATA2.dataset;
        PRODUCTOMASCOMPRADO.value = ROW2.nombre_producto;
    }else {
        sweetAlert(2, DATA.error, null);
    }

    if(DATA3.status){
        ROW3 = DATA3.dataset;
        ULTIMAFECHACOMPRA.value = ROW3.fecha_registro;
    }else {
        sweetAlert(2, DATA.error, null);
    }

    //popup del boton para actualizar datos
    document.getElementById('botonActualizarDatos').addEventListener('mouseenter', function () {
        var popover = new bootstrap.Popover(this, {
            title: 'Editar datos',
            content: 'Haz clic aquí para editar o guardar tus datos. La contraseña no puedes editarla aquí',
            placement: 'top',
            trigger: 'manual',
            boundary: 'viewport'
        });
        popover.show();
    });

    document.getElementById('botonActualizarDatos').addEventListener('mouseleave', function () {
        var popover = bootstrap.Popover.getInstance(this);
        if (popover) {
            popover.hide();
        }
    });

    //popup del boton para actualizar la contraseña
    document.getElementById('botonActualizarContrasena').addEventListener('mouseenter', function () {
        var popover = new bootstrap.Popover(this, {
            title: 'Editar contraseña',
            content: 'Haz clic aquí para editar tu contraseña.',
            placement: 'top',
            trigger: 'manual',
            boundary: 'viewport'
        });
        popover.show();
    });

    document.getElementById('botonActualizarContrasena').addEventListener('mouseleave', function () {
        var popover = bootstrap.Popover.getInstance(this);
        if (popover) {
            popover.hide();
        }
    });

    //popup del boton para cerrar ventana - imagen de comentarios
    document.getElementById('botonCerrarCon').addEventListener('mouseenter', function () {
        var popover = new bootstrap.Popover(this, {
            title: 'Cerrar ventana',
            content: 'Haz clic aquí para cerrar este ventana. Puedes dar clic en nuestro logo para cerrar la ventana de igual forma',
            placement: 'top',
            trigger: 'manual',
            boundary: 'viewport'
        });
        popover.show();
    });

    document.getElementById('botonCerrarCon').addEventListener('mouseleave', function () {
        var popover = bootstrap.Popover.getInstance(this);
        if (popover) {
            popover.hide();
        }
    });

    //popup del boton para cerrar ventana - logo de La Academia
    document.getElementById('botonCerrarCon2').addEventListener('mouseenter', function () {
        var popover = new bootstrap.Popover(this, {
            title: 'Cerrar ventana',
            content: 'Haz clic aquí para cerrar este ventana. Puedes dar clic en la imagen de comentarios para cerrar la ventana de igual forma',
            placement: 'top',
            trigger: 'manual',
            boundary: 'viewport'
        });
        popover.show();
    });

    document.getElementById('botonCerrarCon2').addEventListener('mouseleave', function () {
        var popover = bootstrap.Popover.getInstance(this);
        if (popover) {
            popover.hide();
        }
    });

    document.getElementById('botonCerrarModalContra').addEventListener('mouseenter', function () {
        var popover = new bootstrap.Popover(this, {
            title: 'Cerrar ventana',
            content: 'Haz clic aquí para cerrar este ventana. Puedes dar clic en la imagen de comentarios para cerrar la ventana de igual forma',
            placement: 'top',
            trigger: 'manual',
            boundary: 'viewport'
        });
        popover.show();
    });

    document.getElementById('botonCerrarModalContra').addEventListener('mouseleave', function () {
        var popover = bootstrap.Popover.getInstance(this);
        if (popover) {
            popover.hide();
        }
    });

});

const fotoInput = document.getElementById('fotoInput');
// Escuchar cambios en el elemento de entrada de archivo
fotoInput.addEventListener('change', function () {
    // Verificar si se seleccionó un archivo
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // Mostrar la imagen cargada en el elemento de imagen
            const imagen = document.getElementById('imagen');
            imagen.src = e.target.result;
        };
        // Leer el archivo como una URL de datos
        reader.readAsDataURL(this.files[0]);
    } else {
        FOTO_CLIENTE.src = `${SERVER_URL}images/clientes/${ROW.foto_cliente}`; //Mandamos a llamar la foto del administrador
    }
});

const fillTable = async (correo) => {
    // Limpiar contenido previo de la tabla de alumnos
    CARDS_ALUMNOSREG.innerHTML = '';

    // Crear un nuevo objeto FormData para enviar datos en la solicitud
    const FORM = new FormData();
    FORM.append('correoCliente', correo); // Agregar el correo del cliente al formulario

    try {
        // Realizar la solicitud a la API para obtener los datos de los alumnos
        const DATA = await fetchData(CLIENTE_API, 'readAlumnos', FORM);

        // Verificar si la solicitud fue exitosa
        if (DATA.status) {
            // Convertir el conjunto de datos a un array si no lo es ya
            const rows = Array.isArray(DATA.dataset) ? DATA.dataset : [DATA.dataset];

            // Iterar sobre cada fila de datos para construir las tarjetas de los alumnos
            rows.forEach(row => {
                CARDS_ALUMNOSREG.innerHTML += `
                    <div class="card mb-4 mt-4" id="borderAlumnos">
                        <div class="card-body">
                        <img src="${SERVER_URL}images/alumnos/${row.foto_alumno}" class="card-img-top rounded-circle mb-4" height="30px" width="30px">
                            <input id="SelectDatosPago-${row.id_alumno}" type="text" name="SelectDatosPago" class="form-control" value="${row.id_alumno}" hidden>
                            <p class="card-text"><b>Nombre del alumno: </b>${row.nombre}</p>
                            <p class="card-text"><b>Edad: </b>${row.edad} años</p>
                            <p class="card-text"><b>Categoria: </b>${row.categoria}</p>
                            <p class="card-text"><b>Numero de dias que entrena: </b>${row.numero_dias}</p>
                            <button type="button" class="btn .btn-pagar btnPagar" onclick= openCreate(${row.id_alumno}) data-id="${row.id_alumno}">
                                <img src="../../resources/images/mensualidadp.png" height="25px" width="25px" class="me-2"> Pagar mensualidad
                            </button>
                            <button type="button" class="btn btnPagar mt-3" data-id="${row.id_alumno}" onclick="openReport(this)">
                                <img src="../../resources/images/mensualidadp.png" height="25px" width="25px" class="me-2"> Historial de pago del alumno
                            </button>


                        </div>
                    </div>
                `;
            });
        } else {
            // Mostrar una alerta dulce (sweetAlert) en caso de error
            sweetAlert(4, DATA.error, true);
        }
    } catch (error) {
        // Capturar y manejar cualquier error de la solicitud
        console.error('Error fetching data:', error);
        sweetAlert(4, 'Error al obtener los datos', true);
    }
};

const fillTable2 = async (form = null) => {
    // Inicializa el contenido de las cards.
    CARD_METODOS.innerHTML = '';
    // Verifica la acción a realizar.
    const action = (form) ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(MENSUALIDAD_API, action, form);
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
    document.getElementById('numeroTarjeta').style.display = 'none';
    document.getElementById('nombreTarjeta').style.display = 'none';
    document.getElementById('mesVencimiento').style.display = 'none';
    document.getElementById('anioVencimiento').style.display = 'none';
    document.getElementById('codigoCVV').style.display = 'none';
    document.getElementById('inputPayPal').style.display = 'none';
    document.getElementById('inputTransferencia').style.display = 'none';
    document.getElementById('inputSWIFT').style.display = 'none';

    document.getElementById('labeltarjeta').style.display = 'none';
    document.getElementById('nombretarjeta').style.display = 'none';
    document.getElementById('mesvecnimientotarjeta').style.display = 'none';
    document.getElementById('aniovecnimientolabeltarjeta').style.display = 'none';
    document.getElementById('cvvtarjeta').style.display = 'none';
    document.getElementById('correoPaypal').style.display = 'none';
    document.getElementById('cuentanumero').style.display = 'none';
    document.getElementById('codigos').style.display = 'none';
    document.getElementById('botonFinalizar').style.display = 'none';

    // Mostrar los inputs según el método de pago seleccionado
    if (metodoPago === "Tarjeta de crédito" || metodoPago === "Tarjeta de débito") {
        document.getElementById('numeroTarjeta').style.display = 'block';
        document.getElementById('nombreTarjeta').style.display = 'block';
        document.getElementById('mesVencimiento').style.display = 'block';
        document.getElementById('anioVencimiento').style.display = 'block';
        document.getElementById('codigoCVV').style.display = 'block';
        document.getElementById('labeltarjeta').style.display = 'block';
        document.getElementById('nombretarjeta').style.display = 'block';
        document.getElementById('mesvecnimientotarjeta').style.display = 'block';
        document.getElementById('aniovecnimientolabeltarjeta').style.display = 'block';
        document.getElementById('cvvtarjeta').style.display = 'block';
    } else if (metodoPago === "PayPal") {
        document.getElementById('inputPayPal').style.display = 'block';
        document.getElementById('correoPaypal').style.display = 'block';
    } else if (metodoPago === "Transferencia bancaria") {
        document.getElementById('inputTransferencia').style.display = 'block';
        document.getElementById('inputSWIFT').style.display = 'block';
        document.getElementById('cuentanumero').style.display = 'block';
        document.getElementById('codigos').style.display = 'block';
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

//Función para esperar un cambio en los inputs para ejecutar la función actualizarPago
function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

function actualizarDatosPago() {
    // Obtén los valores de los inputs
    const metodoPago = document.getElementById('nombreMetodo').value;
    const numeroTarjeta = document.getElementById('numeroTarjeta').value;
    const nombreTarjeta = document.getElementById('nombreTarjeta').value;
    const mesVencimiento = document.getElementById('mesVencimiento').value;
    const anioVencimiento = document.getElementById('anioVencimiento').value;
    const codigoCVV = document.getElementById('codigoCVV').value;
    const correoPaypal = document.getElementById('paypalCorreo').value;
    const numeroCuenta = document.getElementById('numeroCuenta').value;
    const codigoSWIFT = document.getElementById('codigoSWIFT').value;

    // Validaciones generales
    if (!metodoPago) {
        alert('Debe seleccionar un método de pago.');
        return;
    }

    // Validaciones para Tarjeta
    if (metodoPago === "Tarjeta de crédito" || metodoPago === "Tarjeta de débito") {
        if (!numeroTarjeta || !nombreTarjeta || !mesVencimiento || !anioVencimiento || !codigoCVV) {
            document.getElementById('botonFinalizar').style.display = 'none';
            alert('Debe completar todos los campos de la tarjeta.');
            return;
        }

        // 2. Validación máscara número de tarjeta: 0000-0000-0000-0000
        const tarjetaRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        if (!tarjetaRegex.test(numeroTarjeta)) {
            document.getElementById('botonFinalizar').style.display = 'none';
            alert('El número de tarjeta debe tener el formato 0000-0000-0000-0000.');
            document.getElementById('numeroTarjeta').value = ''; // Limpia el campo si no es válido
            return;
        }

        // 3. Validación de nombreTarjeta no debe contener números
        const nombreRegex = /^[a-zA-Z\s]+$/;
        if (!nombreRegex.test(nombreTarjeta)) {
            document.getElementById('botonFinalizar').style.display = 'none';
            alert('El nombre de la tarjeta no debe contener números.');
            document.getElementById('nombreTarjeta').value = ''; // Limpia el campo si no es válido
            return;
        }

        // 4. Validación del mes de vencimiento entre 1 y 12
        if (mesVencimiento < 1 || mesVencimiento > 12) {
            document.getElementById('botonFinalizar').style.display = 'none';
            alert('El mes de vencimiento debe estar entre 1 y 12.');
            document.getElementById('mesVencimiento').value = ''; // Limpia el campo si no es válido
            return;
        }

        // 5. Comparación del mes y año de vencimiento con la fecha actual
        const fechaActual = new Date();
        const mesActual = fechaActual.getMonth() + 1; // Los meses en JavaScript son de 0 a 11
        const anioActual = fechaActual.getFullYear();

        if (anioVencimiento < anioActual || (anioVencimiento == anioActual && mesVencimiento < mesActual)) {
            alert('Tarjeta vencida.');
            document.getElementById('botonFinalizar').style.display = 'none';
            document.getElementById('mesVencimiento').value = ''; // Limpia mes de vencimiento
            document.getElementById('anioVencimiento').value = ''; // Limpia año de vencimiento
            return;
        }

        // 6. Validación del código CVV de 3 dígitos
        const cvvRegex = /^\d{3}$/;
        if (!cvvRegex.test(codigoCVV)) {
            document.getElementById('botonFinalizar').style.display = 'none';
            alert('El código CVV debe tener exactamente 3 dígitos.');
            document.getElementById('codigoCVV').value = ''; // Limpia el campo si no es válido
            return;
        }
    }

    if (metodoPago === "PayPal") {
        // Validación de correo en formato válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoPaypal || !emailRegex.test(correoPaypal)) {
            document.getElementById('botonFinalizar').style.display = 'none';
            alert('Debe ingresar un correo de PayPal válido.');
            document.getElementById('paypalCorreo').value = ''; // Limpia el campo si no es válido
            return;
        }
    }

    // Validaciones para Transferencia
    if (metodoPago === "Transferencia bancaria") {
        if (!numeroCuenta || !codigoSWIFT) {
            document.getElementById('botonFinalizar').style.display = 'none';
            alert('Debe completar todos los campos de la transferencia.');
            return;
        }

        // 7. Validación de que numeroCuenta no contenga letras
        const cuentaRegex = /^\d+(-\d+)*$/;
        if (!cuentaRegex.test(numeroCuenta)) {
            document.getElementById('botonFinalizar').style.display = 'none';
            alert('El número de cuenta no debe contener letras.');
            document.getElementById('numeroCuenta').value = ''; // Limpia el campo si no es válido
            return;
        }

        // 8. Validación de longitud del código SWIFT entre 8 y 11 caracteres
        if (codigoSWIFT.length < 8 || codigoSWIFT.length > 11) {
            document.getElementById('botonFinalizar').style.display = 'none';
            alert('El código SWIFT debe tener entre 8 y 11 caracteres.');
            document.getElementById('codigoSWIFT').value = ''; // Limpia el campo si no es válido
            return;
        }
    }

    // Validaciones para PayPal
    if (metodoPago === "PayPal" && !correoPaypal) {
        alert('Debe ingresar un correo de PayPal.');
        return;
    }

    // Concatenación de datos
    const datosConcatenadosTarjeta = `${metodoPago}, ${numeroTarjeta}, ${nombreTarjeta}, ${mesVencimiento}, ${anioVencimiento}, ${codigoCVV}`;
    const datosConcatenadosPaypal = `${metodoPago}, ${correoPaypal}`;
    const datosConcatenadosTransferencia = `${metodoPago}, ${numeroCuenta}, ${codigoSWIFT}`;

    // Selección de la variable donde se guardarán los datos dependiendo del método de pago
    const inputDatosGuardados = document.getElementById('datosPago');

    // Lógica para seleccionar qué datos guardar según el método de pago
    //El botón se mostrará hasta que todas las validaciones de confirmen
    if (metodoPago === "Tarjeta de crédito" || metodoPago === "Tarjeta de débito") {
        inputDatosGuardados.value = datosConcatenadosTarjeta;
        document.getElementById('botonFinalizar').style.display = 'block'; 
    } else if (metodoPago === "PayPal") {
        inputDatosGuardados.value = datosConcatenadosPaypal;
        document.getElementById('botonFinalizar').style.display = 'block';
    } else if (metodoPago === "Transferencia bancaria") {
        inputDatosGuardados.value = datosConcatenadosTransferencia;
        document.getElementById('botonFinalizar').style.display = 'block';
    }
}
// Crear una versión "debounced" de actualizarDatosPago
const debouncedActualizarDatosPago = debounce(actualizarDatosPago, 1000); // Espera 3000ms de inactividad



const openCreate = (idAlumno) => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    // Se prepara el formulario.
    MODAL_METODOS.reset();

    // Asigna el valor del idAlumno al elemento deseado
    document.getElementById('idAlumno').value = idAlumno;

    fillTable2();
    mostrarInputs();
};


async function submitForm(event) {
    // Evitar recargar la página después de enviar el formulario si es un evento de formulario
    if (event) {
        event.preventDefault();
    }

    // Obtener el ID del alumno desde el botón
    const alumnoId = document.getElementById('idAlumno').value
    const idMetodoPago = document.getElementById('idMetodoPago').value
    const datosPago = document.getElementById('datosPago').value
    console.log(alumnoId)

    // Mostrar un mensaje de confirmación y capturar la respuesta
    const RESPONSE = await confirmAction('¿Está seguro de realizar el pago de mensualidad del alumno?');
    // Verificar la respuesta del mensaje
    if (RESPONSE) {
        // Constante tipo objeto con los datos del formulario
        const FORM = new FormData(PROFILE_FORM2);
        // Añadir el ID del alumno al formulario
        FORM.append('SelectDatosPago', alumnoId);
        FORM.append('idMetodoPago', idMetodoPago);
        FORM.append('datosPago', datosPago);
        
        // Petición para actualizar los datos personales del usuario
        const DATA = await fetchData(MENSUALIDAD_API, 'createRow', FORM);
        // Comprobar si la respuesta es satisfactoria, de lo contrario mostrar un mensaje con la excepción
        if (DATA.status) {
            sweetAlert(1, DATA.message, true);
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

// Agregamos el event listener al formulario
PROFILE_FORM2.addEventListener('submit', submitForm);

document.addEventListener('click', function (event) {
    if (event.target && event.target.closest('.btn-pagar')) {
        submitForm(event);
    }
});



// Método del evento para cuando se envía el formulario de editar perfil.
PROFILE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PROFILE_FORM);
    // Petición para actualizar los datos personales del usuario.
    const DATA = await fetchData(USER_API, 'editProfile', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false); //
    }
});

// Mètodo del evento para cuando se envía el formulario de cambiar contraseña.
PASSWORD_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(PASSWORD_FORM);
    // Petición para actualizar la constraseña.
    const DATA = await fetchData(USER_API, 'changePassword', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        PASSWORD_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función para preparar el formulario al momento de cambiar la constraseña.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openPassword = () => {
    // Se abre la caja de diálogo que contiene el formulario.
    PASSWORD_MODAL.show();
    // Se restauran los elementos del formulario.
    PASSWORD_FORM.reset();
}



const openReport = (buttonElement) => {
    // Obtener el valor de data-id del botón clickeado.
    const id = buttonElement.getAttribute('data-id');
    
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/public/historial_pagosmensualidad_alumno.php`);
    
    // Se añade el parámetro id directamente a la URL.
    PATH.searchParams.append('id', id);
    
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}

