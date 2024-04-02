document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("Buscador");
    const cardContainer = document.getElementById("cardContainer");
    const noResultsMessage = document.getElementById("noResultsMessage");
    const valoraTitulo = document.getElementById("valoraTitulo");
    const valoraBoton = document.getElementById("valoraBoton");
    const cards = document.querySelectorAll(".card");

    input.addEventListener("input", function () {
        const searchTerm = input.value.trim().toLowerCase();
        let hasResults = false;

        cards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            if (cardText.includes(searchTerm)) {
                card.style.display = "block";
                hasResults = true;
            } else {
                card.style.display = "none";
            }
        });

        if (hasResults) {
            noResultsMessage.style.display = "none";
            cardContainer.style.display = "block";
            valoraTitulo.style.display = "block"; // Mostrar el título para valorar la compra
            valoraBoton.style.display = "block"; // Mostrar el botón para valorar la compra
        } else {
            noResultsMessage.style.display = "block";
            cardContainer.style.display = "none";
            valoraTitulo.style.display = "none"; // Ocultar el título para valorar la compra
            valoraBoton.style.display = "none"; // Ocultar el botón para valorar la compra
        }
    });
});

//Estrellas

//Almacenamos todos los objetos que tienen la clase star
const stars = document.querySelectorAll('.star');

//Aquí irá la variable para almacenar la cantidad de estrellas seleccionadas
const ratingText = document.getElementById('texto');

//Función para pintar y despintar las estrellas a las que se les de click
stars.forEach(function(star, index){
    star.addEventListener('click', function(){
        //Aquí las pinta dependiendo el index de la estrella
        for(let i = 0; i<=index; i++)
        {
            stars[i].classList.add('checked');
        }
        //Aquí las despinta dependiendo el index de la estrella
        for(let i = index + 1; i< stars.length; i++)
        {
            stars[i].classList.remove('checked');
        }
        //Se almacena la cantidad de estrellas seleccionadas
        ratingText.value = (index + 1).toString();
    })
});

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