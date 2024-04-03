// Función para mostrar el contenedor2 y mover el contenedor1 ligeramente a la izquierda
function mostrarContenedor2() {
    // Obtener el contenedor1 y contenedor2 por su clase
    var contenedor1 = document.querySelector('.contenedor1');
    var contenedor2 = document.querySelector('.contenedor2');
    
    // Mover el contenedor1 ligeramente a la izquierda
    contenedor1.style.position = 'absolute';
    contenedor1.style.left = 'calc(45% - 250px)'; // Ajusta según el ancho de tu contenedor1
    contenedor1.style.top = '50%'; // Alinea verticalmente el contenedor1

    // Mostrar y posicionar el contenedor2 a la derecha, ligeramente desplazado a la izquierda
    contenedor2.style.display = 'block';
    contenedor2.style.position = 'absolute';
    contenedor2.style.right = 'calc(40% - 250px)'; // Ajusta el valor de desplazamiento según tu preferencia
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
    contenedor1.style.position = 'absolute';
    contenedor1.style.left = 'calc(35.7% - 240px)'; // Ajusta según el ancho de tu contenedor1
    contenedor1.style.top = '50%'; // Alinea verticalmente el contenedor1

    // Ajustar posición del contenedor2 al centro
    contenedor2.style.display = 'block';
    contenedor2.style.position = 'absolute';
    contenedor2.style.right = 'calc(50% - 250px)'; // Ajusta el valor de desplazamiento según tu preferencia

    // Mostrar y posicionar el contenedor3 a la derecha
    contenedor3.style.display = 'block';
    contenedor3.style.position = 'absolute';
    contenedor3.style.right = 'calc(21% - 250px)'; // Ajusta el valor de desplazamiento según tu preferencia
}

// Agregar un evento de clic al botón botonVerificarCodigo
document.getElementById('botonVerificarCodigo').addEventListener('click', function() {
    // Llamar a la función mostrarContenedor3 cuando se haga clic en el botón
    mostrarContenedor3();
});



