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