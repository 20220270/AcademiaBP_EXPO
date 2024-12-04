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


    document.getElementById('labeltarjeta').style.display = 'none';
    document.getElementById('nombretarjeta').style.display = 'none';
    document.getElementById('mesvecnimientotarjeta').style.display = 'none';
    document.getElementById('aniovecnimientolabeltarjeta').style.display = 'none';
    document.getElementById('cvvtarjeta').style.display = 'none';
    document.getElementById('correoPaypal').style.display = 'none';
    document.getElementById('cuentanumero').style.display = 'none';

    document.getElementById('inputCorreoTransferencia').style.display = 'none';
    document.getElementById('selectTipoCuenta').style.display = 'none';
    document.getElementById('inputReceptor').style.display = 'none';
    
    document.getElementById('codigos').style.display = 'none';

    document.getElementById('inputTotalPagar').style.display = 'none';
    document.getElementById('InputTotalDado').style.display = 'none';
    document.getElementById('inputVuelto').style.display = 'none';

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
        document.getElementById('cuentanumero').style.display = 'block';
        document.getElementById('inputCorreoTransferencia').style.display = 'block';
        document.getElementById('selectTipoCuenta').style.display = 'block';
        document.getElementById('inputReceptor').style.display = 'block';

    }
    else if (metodoPago === "Efectivo") {
        document.getElementById('codigos').style.display = 'block';
        document.getElementById('inputTotalPagar').style.display = 'block';
        document.getElementById('InputTotalDado').style.display = 'block';
        document.getElementById('inputVuelto').style.display = 'block';  
    }
}

// Función genérica para manejar el evento 'change' de ambos select
const handleSelectChange = (event) => {
    // Obtener el combobox que disparó el evento
    const comboBox = event.target;

    // Comprobar si se ha seleccionado una opción (no está vacío)
    if (comboBox.selectedIndex !== -1) {
        // Obtener el texto de la opción seleccionada
        const dato = comboBox.options[comboBox.selectedIndex].text;

        // Extraer el precio (todo lo que sigue después del último ' - ')
        const precio = dato.split(' - ').pop(); // Obtener el último elemento después de ' - '

        // Asignar el precio al campo 'totalPagar'
        document.getElementById('totalPagar').value = precio;
    } else {
        // Si no hay opción seleccionada, mostrar una alerta
        alert('Debe seleccionar una compra');
    }
};

// Agregar el evento 'change' a ambos select
document.getElementById('idPago').addEventListener('change', handleSelectChange);


// Obtén los elementos de los inputs
const inputTotalPagar = document.getElementById('inputTotalPagar');
const inputTotalDado = document.getElementById('InputTotalDado');
const inputVuelto = document.getElementById('inputVuelto');

// Función para realizar la resta y asignar el resultado
function calcularVuelto() {
  const totalPagar = parseFloat(inputTotalPagar.value) || 0; // Si no hay valor, se asigna 0
  const totalDado = parseFloat(inputTotalDado.value) || 0;  // Si no hay valor, se asigna 0

  const vuelto = totalDado - totalPagar;  // Realiza la resta
  inputVuelto.value = vuelto.toFixed(2);   // Asigna el resultado al input 'vuelto' con dos decimales
}

// Escucha los cambios en los inputs
inputTotalPagar.addEventListener('input', calcularVuelto);
inputTotalDado.addEventListener('input', calcularVuelto);


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

    const correoEmisor = document.getElementById('CorreoTransferencia').value;
    const tipoCuenta = document.getElementById('selectCuenta').value;
    const nombreTitularReceptor = document.getElementById('receptorNombre').value;

    const totalDado = document.getElementById('totalDado').value; // Input donde el usuario ingresa el dinero dado
    const totalPagar = document.getElementById('totalPagar').value; // Total a pagar (obtenido como texto y convertido a número)
    const cambioDado = document.getElementById('cambioDado').value; // Elemento donde se mostrará el cambio


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

        if (!numeroCuenta || !correoEmisor|| !tipoCuenta|| !nombreTitularReceptor) { // Agregar ||
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

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoEmisor || !emailRegex.test(correoEmisor)) {
            document.getElementById('botonFinalizar').style.display = 'none';
            alert('Debe ingresar un correo válido.');
            document.getElementById('CorreoTransferencia').value = ''; // Limpia el campo si no es válido
            return;
        }
    }

    if (metodoPago === "Efectivo") {

        // Verifica que el input totalDado esté definido y sea un input con valor
        if (!totalPagar) {
            console.error("El campo 'totalDado' no está definido o no tiene valor.");
            return;
        }
    
        // Expresión regular para validar el input (solo números y un punto)
        const regex = /^[0-9]*\.?[0-9]*$/;
    
        if (!regex.test(totalPagar)) {
            alert('Por favor, introduce solo números o un punto decimal.');
            totalPagar = totalPagar.value.slice(0, -1); // Elimina caracteres inválidos
        } else {
            // Convertimos a número para realizar cálculos
            const dinerodado = document.getElementById('totalDado').value;
            const dinerocambio = dinerodado - totalPagar;
    
            document.getElementById('cambioDado').value = dinerocambio;
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
    const datosConcatenadosTransferencia = `${metodoPago}, ${numeroCuenta}, ${correoEmisor}, ${tipoCuenta}, ${nombreTitularReceptor}`;
    const datosConcatenadosEfectivo = `${metodoPago}, ${totalPagar}, ${totalDado}, ${totalDado - totalPagar}`;

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
    else if (metodoPago === "Efectivo") {
        inputDatosGuardados.value = datosConcatenadosEfectivo;
        document.getElementById('botonFinalizar').style.display = 'block';
    }
}
// Crear una versión "debounced" de actualizarDatosPago
const debouncedActualizarDatosPago = debounce(actualizarDatosPago, 1000); // Espera 3000ms de inactividad
