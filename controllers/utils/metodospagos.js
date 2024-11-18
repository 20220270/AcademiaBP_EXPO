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
