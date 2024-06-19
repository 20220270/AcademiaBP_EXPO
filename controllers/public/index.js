const CATEGORIA_API = 'services/public/categorias.php';
    const CATEGORIAS = document.getElementById('categorias');
    const MAIN_TITLE = document.getElementById('mainTitle');

    document.addEventListener('DOMContentLoaded', async () => {
        // Llamada a la función para mostrar el encabezado y pie del documento.
        loadTemplate();
        // Se establece el título del contenido principal.
        MAIN_TITLE.textContent = 'Nuestras categorías';
        // Petición para obtener las categorías disponibles.
        const DATA = await fetchData(CATEGORIA_API, 'readAll');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se inicializa el contenedor de categorías.
            CATEGORIAS.innerHTML = '';
            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach((row) => {
                // Se establece la página web de destino con los parámetros.
                let url = `categoriasproductos.html?id=${row.id_categoria_producto}&nombre=${row.categoria_producto}`;
                // Se crea la tarjeta con los datos de cada categoría.
                let card = `
                    <div class="col-lg-4 col-md-6">
                        <div class="position-relative">
                            <a href="${url}"><img src="${SERVER_URL}images/categorias_productos/${row.imagen_categoria}" class="imagenn rounded-4 mb-3" alt="${row.categoria_producto}" width="340px" height="250px" /></a>
                            <span class="span-overlay text-white span-texto-gorras fs-3">${row.categoria_producto}</span>
                            <span class="span-overlay text-white span-guiones-gorras fs-3">--</span>
                            <span class="span-overlay text-white span-ver-gorras fs-4">Ver ${row.categoria_producto}</span>
                        </div>
                    </div>
                `;
                // Agrega la tarjeta al contenedor de categorías.
                CATEGORIAS.innerHTML += card;
            });
        } else {
            // Se asigna al título del contenido de la excepción cuando no existen datos para mostrar.
            MAIN_TITLE.textContent = DATA.error;
        }
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



