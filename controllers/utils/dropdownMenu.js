document.addEventListener("DOMContentLoaded", function () {
    // Selecciona el botón de la hamburguesa
    var navbarToggler = document.querySelector(".navbar-toggler");

    // Selecciona el menú desplegable
    var navbarCollapse = document.querySelector(".navbar-collapse");

    // Agrega un evento de clic al botón de la hamburguesa
    navbarToggler.addEventListener("click", function () {
        // Alternar la clase "show" en el menú desplegable
        navbarCollapse.classList.toggle("show");
    });

    // Agrega un evento de clic a los elementos del menú para cerrar el menú cuando se hace clic en uno de ellos
    var navbarMenuItems = document.querySelectorAll(".navbar-nav .nav-link");
    navbarMenuItems.forEach(function (menuItem) {
        menuItem.addEventListener("click", function () {
            // Si el menú desplegable está abierto, ciérralo
            if (navbarCollapse.classList.contains("show")) {
                navbarCollapse.classList.remove("show");
            }
        });
    });
});