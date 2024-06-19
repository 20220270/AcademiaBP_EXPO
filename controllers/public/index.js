const CATEGORIA_API = 'services/public/categorias.php';
const SOPORTETECNICO_API = 'services/public/soportetecnico.php';

    const CATEGORIAS = document.getElementById('categorias');
    const MAIN_TITLE = document.getElementById('mainTitle');

    const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
    
    const CONSULTAS_FORM = document.getElementById('consultasForm');
    const SAVE_FORM = document.getElementById('saveForm');
    const ID_SOPORTE = document.getElementById('idSoporte'),
    MENSJAE = document.getElementById('EspacioConsultas');

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
                let url = `categoriasproductos.html?id=${row.id_categoria_producto}&nombre=${row.categoria_producto}`;                // Se crea la tarjeta con los datos de cada categoría.
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



// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_SOPORTE.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(SOPORTETECNICO_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        
    } else {
        sweetAlert(2, DATA.error, false);
    }
  });


  const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Consulta para enviar';
    // Se prepara el formulario.
    SAVE_FORM.reset();
  }


//////////////////////////////////




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

document.getElementById('botonCerrarCo3').addEventListener('mouseenter', function () {
    var popover = new bootstrap.Popover(this, {
        title: 'Cerrar ventana',
        content: 'Haz clic aquí para cerrar este ventana',
        placement: 'top',
        trigger: 'manual',
        boundary: 'viewport'
    });
    popover.show();
});

document.getElementById('botonCerrarCo3').addEventListener('mouseleave', function () {
    var popover = bootstrap.Popover.getInstance(this);
    if (popover) {
        popover.hide();
    }
});