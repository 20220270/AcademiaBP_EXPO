


//Funcion para añadir un numero al texto Carrito de Compras
// Obtener el botón y el contador del carrito
const botonAgregarCarrito = document.querySelectorAll('.agregar');
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
document.getElementById('botonCerrarComen').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Cerrar ventana',
        content: 'Haz clic aquí para cerrar este ventana. Puedes dar clic en nuestro logo para cerrar la ventana de igual forma',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonCerrarComen').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});

//popup del boton para cerrar ventana - logo de La Academia
document.getElementById('botonCerrarComen2').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Cerrar ventana',
        content: 'Haz clic aquí para cerrar este ventana. Puedes dar clic en la imagen de comentarios para cerrar la ventana de igual forma',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonCerrarComen2').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});

//Barra de busqueda de productos
const buscadorInput = document.getElementById('Buscador1');

// Añadir un EventListener para el evento "keydown" en el input de búsqueda
buscadorInput.addEventListener('keydown', function(event) {
    // Verificar si la tecla presionada es "Enter"
    if (event.key === 'Enter') {
        // Obtener el valor del input de búsqueda
        const searchTerm = buscadorInput.value.trim();
        
        // Verificar si hay un término de búsqueda ingresado
        if (searchTerm !== '') {
            // Construir la URL de redirección con el término de búsqueda como parámetro
            const url = `categorias_productos.html?search=${encodeURIComponent(searchTerm)}`;
            
            // Redirigir a la página de categorías con el término de búsqueda
            window.location.href = url;
        }
    }
});

