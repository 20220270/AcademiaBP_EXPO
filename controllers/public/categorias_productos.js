


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


//Barra de busqueda para los productos
document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("Buscador1");
    const cardContainer = document.getElementById("cardContainer");
    const noResultsMessage = document.getElementById("noResultsMessage");
    const cards = document.querySelectorAll(".card");

    input.addEventListener("input", function () {
        const searchTerm = input.value.trim().toLowerCase();
        let hasResults = false;

        //Mostramos las cards en caso de que se encuentren coincidencias
        cards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            if (cardText.includes(searchTerm)) {
                card.style.display = "block";
                hasResults = true;
                //Sino, no se mostrarán
            } else {
                card.style.display = "none";
            }
        });

        // Ocultamos el título y el botón de valoración si no hay resultados
        if (hasResults) {
            noResultsMessage.style.display = "none";
            cardContainer.style.display = "block";
        } else {
            noResultsMessage.style.display = "block";
            cardContainer.style.display = "none";
        }
    });
});

