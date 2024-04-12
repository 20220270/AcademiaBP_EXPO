// Obtener el botón y el contador del carrito
const botonAgregarCarrito = document.querySelectorAll('.agregarCarrito');
const contadorCarrito = document.getElementById('textoCarrito');

// Inicializar el contador
let contador = 0;

// Agregar evento de clic a cada botón de agregar al carrito
botonAgregarCarrito.forEach(boton => {
    boton.addEventListener('click', () => {
        contador++; // Aumentar el contador
        contadorCarrito.textContent = `Carrito de compras (${contador})`; // Actualizar el contenido del contador
    });
});

//popup del boton para cerrar ventana - imagen de comentarios
document.getElementById('botonCerrarCo').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Cerrar ventana',
        content: 'Haz clic aquí para cerrar este ventana. Puedes dar clic en nuestro logo para cerrar la ventana de igual forma',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonCerrarCo').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});

//popup del boton para cerrar ventana - logo de La Academia
document.getElementById('botonCerrarCo2').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Cerrar ventana',
        content: 'Haz clic aquí para cerrar este ventana. Puedes dar clic en la imagen de comentarios para cerrar la ventana de igual forma',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonCerrarCo2').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});