//Perfil de usuario

//Metodo para habilitar y deshabilitar los inputs

document.addEventListener("DOMContentLoaded", function() {
    const botonActualizarDatos = document.getElementById("botonActualizarDatos");

    botonActualizarDatos.addEventListener("click", function() {
        const inputs = document.querySelectorAll(".formsPerfil");

        inputs.forEach(function(input) {
            if (input.disabled) {
                input.disabled = false; // Habilitar input
            } else {
                input.disabled = true; // Deshabilitar input
            }
        });
    });
});