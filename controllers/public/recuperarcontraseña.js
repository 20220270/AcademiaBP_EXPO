document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencia a los botones y a los contenedores
    var botonEnviarCorreo = document.getElementById("botonEnviarCorreo");
    var botonVerificarCodigo = document.getElementById("botonVerificarCodigo");
    var BOTONREGRESAR = document.getElementById("regresarBoton1");
    var BOTONREGRESAR2 = document.getElementById("regresarBoton2");
    var contenedor1 = document.querySelector(".contenedor1");
    var contenedor2 = document.querySelector(".contenedor2");
    var contenedor3 = document.querySelector(".contenedor3");

    // Agregar un event listener al botón botonEnviarCorreo
    botonEnviarCorreo.addEventListener("click", function() {
        // Ocultar contenedor1 y mostrar contenedor2
        contenedor1.style.display = "none";
        contenedor2.style.display = "block";

        // Centrar contenedor2 en la pantalla
        contenedor2.style.position = "absolute";
        contenedor2.style.top = "50%";
        contenedor2.style.left = "50%";
        contenedor2.style.transform = "translate(-62%, -50%)";
    });

    // Agregar un event listener al botón botonVerificarCodigo
    botonVerificarCodigo.addEventListener("click", function() {
        // Ocultar contenedor2 y mostrar contenedor3
        contenedor2.style.display = "none";
        contenedor3.style.display = "block";

        // Centrar contenedor3 en la pantalla
        contenedor3.style.position = "absolute";
        contenedor3.style.top = "50%";
        contenedor3.style.left = "50%";
        contenedor3.style.transform = "translate(-50%, -50%)";
    });

    BOTONREGRESAR.addEventListener("click", function() {
        // Ocultar contenedor2 y mostrar contenedor3
        contenedor1.style.display = "block";
        contenedor2.style.display = "none";

        // Centrar contenedor3 en la pantalla
        contenedor1.style.position = "absolute";
        contenedor1.style.top = "50%";
        contenedor1.style.left = "50%";
        contenedor1.style.transform = "translate(-50%, -50%)";
    });

    BOTONREGRESAR2.addEventListener("click", function() {
        // Ocultar contenedor2 y mostrar contenedor3
        contenedor2.style.display = "block";
        contenedor3.style.display = "none";

        // Centrar contenedor3 en la pantalla
        contenedor2.style.position = "absolute";
        contenedor2.style.top = "50%";
        contenedor2.style.left = "50%";
        contenedor2.style.transform = "translate(-62%, -50%)";
    });
});
