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

        // Generar un número aleatorio de 8 dígitos
        var numeroAleatorio = Math.floor(10000000 + Math.random() * 90000000);
    
        // Actualizar el valor del elemento de entrada de texto
        var inputNumero = document.getElementById("numeroGenerado");
        inputNumero.value = numeroAleatorio;
    
        // Mostrar un popup con el número generado
        alert("El código generado es: " + numeroAleatorio);
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

//Codigo para validar el ingreso de 8 caracteres dentro del input
document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencia al inputCodigo
    var inputCodigo = document.getElementById("inputCodigo");

    // Agregar un event listener al campo de entrada inputCodigo
    inputCodigo.addEventListener("input", function() {
        // Obtener el valor actual del campo de entrada
        var codigo = inputCodigo.value;

        // Remover cualquier caracter que no sea un número
        inputCodigo.value = codigo.replace(/[^0-9]/g, '');

        // Verificar si la longitud del código es mayor a 8
        if (inputCodigo.value.length > 8) {
            // Si es mayor a 8, recortar el valor a 8 caracteres
            inputCodigo.value = inputCodigo.value.slice(0, 8);
        }
    });
});


