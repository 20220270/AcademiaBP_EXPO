// Función para mostrar el contenedor2 y mover el contenedor1 ligeramente a la izquierda
function mostrarContenedor2() {
    // Obtener el contenedor1 y contenedor2 por su clase
    var contenedor1 = document.querySelector('.contenedor1');
    var contenedor2 = document.querySelector('.contenedor2');
    
    // Mover el contenedor1 ligeramente a la izquierda
    contenedor1.style.left = 'calc(45% - 250px)'; // Ajustamos el valor de desplazamiento a la izquierda
    contenedor1.style.top = '50%'; // Alineamos verticalmente el contenedor1

    // Mostrar y posicionar el contenedor2 a la derecha, ligeramente desplazado a la izquierda
    contenedor2.style.display = 'block';
    contenedor2.style.right = 'calc(30% - 250px)'; // Ajustamos el valor de desplazamiento a la derecha

    // Asignamos la propiedad readonly al input del contenedor1 cuando el contenedor2 sea visible
    var inputCorreo = document.getElementById('inputCorreo');
    inputCorreo.readOnly = true;
}

// Agregar un evento de clic al botón botonEnviarCorreo
document.getElementById('botonEnviarCorreo').addEventListener('click', function() {
    // Llamar a la función mostrarContenedor2 cuando se haga clic en el botón
    mostrarContenedor2();
});

// Función para mostrar el contenedor3 y ajustar posición de contenedor1 y contenedor2
// Función para mostrar el contenedor3 y ajustar posición de contenedor1 y contenedor2
function mostrarContenedor3() {
    // Obtener los contenedores por su clase
    var contenedor1 = document.querySelector('.contenedor1');
    var contenedor2 = document.querySelector('.contenedor2');
    var contenedor3 = document.querySelector('.contenedor3');
    
    // Ajustar posición del contenedor1 a la izquierda
    contenedor1.style.left = 'calc(35.7% - 240px)'; // Ajustamos el valor de desplazamiento a la izquierda
    contenedor1.style.top = '50%'; // Alinea verticalmente el contenedor1

    // Ajustar posición del contenedor2 al centro
    contenedor2.style.display = 'block';
    contenedor2.style.right = 'calc(50% - 250px)'; // Ajustamos el valor de desplazamiento a la derecha, en este caso para que quede al centro

    // Mostrar y posicionar el contenedor3 a la derecha
    contenedor3.style.display = 'block';
    contenedor3.style.right = 'calc(21% - 250px)'; // Ajustamos el valor de desplazamiento a la derecha

    // Asignamos la propiedad readonly al input del contenedor1 cuando el contenedor2 sea visible
    var inputCorreo = document.getElementById('inputCorreo');
    inputCorreo.readOnly = true;

    // Asignamos la propiedad readonly al input del contenedor1 y contenedor2 cuando el contenedor3 sea visible
    var inputCorreo = document.getElementById('inputCodigo');
    inputCorreo.readOnly = true;
}

// Agregar un evento de clic al botón botonVerificarCodigo
document.getElementById('botonVerificarCodigo').addEventListener('click', function() {
    // Llamar a la función mostrarContenedor3 cuando se haga clic en el botón
    mostrarContenedor3();
});

// Función para ocultar el contenedor2 y restaurar el contenedor1 a su posición original
function ocultarContenedor2() {
    // Obtener los contenedores por su clase
    var contenedor1 = document.querySelector('.contenedor1');
    var contenedor2 = document.querySelector('.contenedor2');
    
    // Ocultar el contenedor2
    contenedor2.style.display = 'none';

    // Restaurar la posición original del contenedor1 al centro de la pantalla
    contenedor1.style.left = '50%';
    contenedor1.style.top = '50%';

    // Remover la propiedad readonly del input del contenedor1
    var inputCorreo = document.getElementById('inputCorreo');
    inputCorreo.readOnly = false;
}

// Agregar un evento de clic al botón regresarBoton1
document.getElementById('regresarBoton1').addEventListener('click', function() {
    // Llamar a la función ocultarContenedor2 cuando se haga clic en el botón
    ocultarContenedor2();
});

// Función para ocultar el contenedor3
function ocultarContenedor3() {
    // Obtener el contenedor3 por su clase
    var contenedor3 = document.querySelector('.contenedor3');
    
    // Ocultar el contenedor3
    contenedor3.style.display = 'none';

    // Remover la propiedad readonly del input del contenedor1
    var inputCorreo = document.getElementById('inputCorreo');
    inputCorreo.readOnly = true;

    // Remover la propiedad readonly del input del contenedor2
    var inputCodigo = document.getElementById('inputCodigo');
    inputCodigo.readOnly = true;

    mostrarContenedor2();
}

// Agregar un evento de clic al botón regresarBoton2
document.getElementById('regresarBoton2').addEventListener('click', function() {
    // Llamar a la función ocultarContenedor3 cuando se haga clic en el botón
    ocultarContenedor3();
});



