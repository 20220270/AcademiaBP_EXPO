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
