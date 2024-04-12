//Perfil de usuario

//Metodo para habilitar y deshabilitar los inputs

document.addEventListener("DOMContentLoaded", function() {
    const botonActualizarDatos = document.getElementById("botonActualizarDatos");

    botonActualizarDatos.addEventListener("click", function() {
        const inputs = document.querySelectorAll(".formsPerfil");

        inputs.forEach(function(input) {
            if (input.disabled && input.id !== "formsPerfilContra") {
                input.disabled = false; // Habilitar input si está deshabilitado y no es el campo de contraseña
            } else if (input.id !== "formsPerfilContra") {
                input.disabled = true; // Deshabilitar input si está habilitado y no es el campo de contraseña
            }
        });
    });
});

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


