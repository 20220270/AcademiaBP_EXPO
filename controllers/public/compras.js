
document.addEventListener("DOMContentLoaded", function () {
    // Obtenemos todas las cards
    const cards = document.querySelectorAll(".card");

    // Verificamos el estado de la compra en cada card
    cards.forEach(function(card) {
        // Obtenemos el label de estado dentro de la tarjeta actual
        const estadoOrdenLabel = card.querySelector(".estadoOrdenD");
        // Obtenemos el botón de mostrar modal dentro de la tarjeta actual
        const modalValorarButton = card.querySelector(".btnMostrarModalVa");
        // Obtenemos el título de valoración dentro de la tarjeta actual
        const tituloValoracion = card.querySelector(".tituloValoracion");
        // Obtenemos el botón de devolución dentro de la tarjeta actual
        const btnDevolucion = card.querySelector(".btnDevolucion");
        // Obtenemos el título de devolución dentro de la tarjeta actual
        const tituloDevolucion = card.querySelector(".tituloDevolucion");

        // Verificamos si el estado de la compra es "Entregada"
        if (estadoOrdenLabel && estadoOrdenLabel.textContent.trim().toLowerCase() === "entregada") {
            // Si es "Entregada", mostrar el botón y el título de valoración
            modalValorarButton.style.display = "block";
            tituloValoracion.style.display = "block";
        }

        // Verificamos si el estado de la compra es "Pendiente"
        if (estadoOrdenLabel && estadoOrdenLabel.textContent.trim().toLowerCase() === "pendiente") {
            // Si es "Pendiente", mostrar el botón y el título de devolución
            btnDevolucion.style.display = "block";
            tituloDevolucion.style.display = "block";
        }

        // Verificamos si el estado de la compra es "Finalizada"
        if (estadoOrdenLabel && estadoOrdenLabel.textContent.trim().toLowerCase() === "finalizada") {
            // Si es "Pendiente", mostrar el botón y el título de devolución
            modalValorarButton.style.display = "block";
            modalValorarButton.disabled = "true";
            tituloValoracion.style.display = "block";
        }
    });
});



//Busqueda de datos
document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("Buscador");
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

//Funcion para el spinner
document.addEventListener("DOMContentLoaded", function () {
    // Función para incrementar y decrementar el valor del spinner
    function handleSpinner(btn, input) {
        // Obtenemos el botón de incremento y decremento
        const incrementBtn = btn.querySelector(".incrementBtn");
        const decrementBtn = btn.querySelector(".decrementBtn");

        // Agregamos evento de clic al botón de incremento
        incrementBtn.addEventListener("click", function () {
            // Incrementar el valor en el input
            input.value = parseInt(input.value) + 1;
        });

        // Agregamos evento de clic al botón de decremento
        decrementBtn.addEventListener("click", function () {
            // Obtener el valor actual del input
            let value = parseInt(input.value);
            // Decrementar el valor solo si es mayor que 0
            if (value > 1) {
                input.value = value - 1;
            }
        });
    }

    // Obtenemos todos los spinners en la página
    const spinners = document.querySelectorAll(".spinner");

    // Iterar sobre cada spinner y llamar a la función handleSpinner
    spinners.forEach(function(spinner) {
        const input = spinner.querySelector(".cantidadAdevolver");
        handleSpinner(spinner, input);
    });
});



//Estrellas

//Almacenamos todos los objetos que tienen la clase star
const stars = document.querySelectorAll('.star');

//Variable para almacenar la cantidad de estrellas seleccionadas
const ratingText = document.getElementById('texto');

//Función para pintar y despintar las estrellas a las que se les de click
stars.forEach(function (star, index) {
    star.addEventListener('click', function () {
        //Aquí las pinta dependiendo el index de la estrella
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('checked');
        }
        //Aquí las despinta dependiendo el index de la estrella
        for (let i = index + 1; i < stars.length; i++) {
            stars[i].classList.remove('checked');
        }
        //Se almacena la cantidad de estrellas seleccionadas
        ratingText.value = (index + 1).toString();
    })
});


document.addEventListener("DOMContentLoaded", function () {
    // Obtenemos todas las tarjetas
    const cards = document.querySelectorAll(".card");

    // Verificamos si la card contiene un label con estado "Pendiente"
    cards.forEach(function(card) {
        // Obtenemos el label de estado dentro de la tarjeta actual
        const estadoOrdenLabel = card.querySelector("#estadoOrdenD");
        // Obtenemos el botón de mostrar modal dentro de la tarjeta actual
        const modalValorarButton = card.querySelector(".btnMostrarModalVa");

        // Verificamos si el label de estado es "Pendiente"
        if (estadoOrdenLabel && estadoOrdenLabel.textContent.trim().toLowerCase() === "pendiente") {
            // Si es "Pendiente", deshabilitamos el botón de mostrar modal
            modalValorarButton.disabled = true;
        }
    });
});

//Popups

//Popup para la imagen 1
document.getElementById('botonCerrar').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Cerrar ventana',
        content: 'Haz clic aquí para cerrar esta ventana, o haz clic en la imagen de nuestro logo para cerrar.',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonCerrar').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});

//Popup para la imagen 2
document.getElementById('botonCerrar2').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Cerrar ventana',
        content: 'Haz clic aquí para cerrar esta ventana, o haz clic en la imagen de comentarios para cerrar.',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonCerrar2').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});

//Popup para la imagen 1 - modal devolucion
document.getElementById('botonCerrarDevo').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Cerrar ventana',
        content: 'Haz clic aquí para cerrar esta ventana, o haz clic en la imagen de nuestro logo para cerrar.',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonCerrarDevo').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});

//Popup para la imagen 2 - modal devolucion
document.getElementById('botonCerrarDevo2').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Cerrar ventana',
        content: 'Haz clic aquí para cerrar esta ventana, o haz clic en la imagen de devolución para cerrar.',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonCerrarDevo2').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});



document.addEventListener("DOMContentLoaded", function () {
    // Función para mostrar el popover sobre el botón deshabilitado
    function showPopoverOnDisabledButton(button) {
        var popover = new bootstrap.Popover(button, {
            title: '¡Pronto podrás valorar esta compra!',
            content: 'El botón para valorar esta compra estará disponible una vez que la compra se haya entregado.',
            placement: 'top',
            trigger: 'manual',
            boundary: 'viewport'
        });
        popover.show();
    }

    // Obtenemos todos los botones de mostrar modal en la página
    const modalValorarButtons = document.querySelectorAll(".btnMostrarModalVa");

    // Iteramos sobre cada botón y verificamos si está deshabilitado
    modalValorarButtons.forEach(function(button) {
        // Verificamos si el botón está deshabilitado
        if (button.disabled) {
            // Si está deshabilitado, mostramos el popover
            showPopoverOnDisabledButton(button);
        }
    });
});


