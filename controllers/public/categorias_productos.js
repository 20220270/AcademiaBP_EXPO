


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


//Metodo 1 de busqueda: Cuando se busquen productos dentro de la ventana de categorias_productos
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


//Metodo 2 de busqueda: Cuando se busque por medio de otra pantalla
document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("Buscador1");
    const cardContainer = document.getElementById("cardContainer");
    const noResultsMessage = document.getElementById("noResultsMessage");
    const cards = document.querySelectorAll(".card");

    // Obtener el término de búsqueda guardado en el almacenamiento local
    const savedSearchTerm = localStorage.getItem('lastSearchTerm');
    
    // Verificar si hay un término de búsqueda guardado
    if (savedSearchTerm) {
        // Establecer el valor del campo de búsqueda en la página de categorías
        input.value = savedSearchTerm;

        // Filtrar las cards al cargar la página con el término de búsqueda guardado
        filterCards(savedSearchTerm);
    }

    input.addEventListener("input", function () {
        const searchTerm = input.value.trim().toLowerCase();
        // Filtrar las cards con el término de búsqueda actual
        filterCards(searchTerm);
    });

    function filterCards(searchTerm) {
        const searchTermLower = searchTerm.toLowerCase().trim();
        let hasResults = false;
    
        // Mostrar u ocultar las tarjetas según el término de búsqueda
        cards.forEach(card => {
            const productName = card.querySelector('.card-title').textContent.toLowerCase();
            if (productName.includes(searchTermLower)) {
                card.style.display = "block";
                hasResults = true;
            } else {
                card.style.display = "none";
            }
        });
    
        // Ocultar o mostrar el mensaje de "No hay resultados" y el contenedor de tarjetas
        if (hasResults) {
            noResultsMessage.style.display = "none";
            cardContainer.style.display = "flex";
        } else {
            noResultsMessage.style.display = "block";
            cardContainer.style.display = "none";
        }
    }
    
    
});

