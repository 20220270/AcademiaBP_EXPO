const CATEGORIA_API = 'services/admin/categoriasproductos.php';
const CATEGORIA_API2 = 'http://localhost/AcademiaBP_EXPO/api/services/admin/categoriasproductos.php';
const COLORES_API = 'services/admin/colores.php';
const TALLAS_API = 'services/admin/tallas.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
const SEARCH_FORM2 = document.getElementById('searchForm2');
const SEARCH_FORM3 = document.getElementById('searchForm3');
// Constantes para establecer los elementos de la tabla.
//const TABLE_BODY = document.getElementById('tableBody'),
//ROWS_FOUND = document.getElementById('rowsFound');

CARD_CATEGORIAS = document.getElementById('cardCategorias');
CARD_COLOR = document.getElementById('cardColores');
CARD_TALLAS = document.getElementById('cardTallas');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

const SAVE_MODAL2 = new bootstrap.Modal('#saveModal2'),
    MODAL_TITLE2 = document.getElementById('modalTitle2');

const SAVE_MODAL3 = new bootstrap.Modal('#saveModal3'),
    MODAL_TITLE3 = document.getElementById('modalTitle3');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_CATEGORIA = document.getElementById('idCategoriaProducto'),
    NOMBRE_CATEGORIA = document.getElementById('nombreCategoriaProducto'),
    IMAGEN_CATEGORIA = document.getElementById('imagenCategoriaProducto');

const SAVE_FORM2 = document.getElementById('saveForm2'),
    ID_COLOR = document.getElementById('idColorProducto'),
    NOMBRE_COLOR = document.getElementById('colorHex');

const SAVE_FORM3 = document.getElementById('saveForm3'),
    ID_TALLA = document.getElementById('idTallaProducto'),
    TALLA = document.getElementById('talla');



document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    //MAIN_TITLE.textContent = 'Gestionar categorías';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
    fillTable2();
    fillTable3();
});


// Método del evento para cuando se envía el formulario de buscar.
SEARCH_FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM = new FormData(SEARCH_FORM);
    fillTable(FORM);
});

SEARCH_FORM2.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM2 = new FormData(SEARCH_FORM2);
    fillTable2(FORM2);
});

SEARCH_FORM3.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM3 = new FormData(SEARCH_FORM3);
    fillTable3(FORM3);
});


// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_CATEGORIA.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CATEGORIA_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

SAVE_FORM2.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_COLOR.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM2);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(COLORES_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL2.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable2();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

SAVE_FORM3.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_TALLA.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM3);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(TALLAS_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL3.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable3();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

const fillTable = async (form = null) => {
    CARD_CATEGORIAS.innerHTML = '';
    const action = (form) ? 'searchRows' : 'readAll';
    const DATA = await fetchData(CATEGORIA_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CARD_CATEGORIAS.innerHTML += `
        <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-4 mt-5 text-center">
          <div class="card h-100" id="cards">
            <img src="${SERVER_URL}images/categorias_productos/${row.imagen_categoria}" class="card-img-top" height="200px" width="200px">
            <div class="card-body ">
              <h5 class="card-title">${row.categoria_producto}</h5>
                 <div class="d-flex justify-content-center gap-2">
            <button type="submit" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_categoria_producto}, '${row.categoria_producto}')">
              <i class="bi bi-search"></i>
              <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
            </button>
            <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_categoria_producto}, '${row.categoria_producto}')">
              <i class="bi bi-x-square-fill"></i>
              <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
            </button>
            <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openReport(${row.id_categoria_producto})">
              <i class="bi bi-x-square-fill"></i>
              <img src="../../resources/images/reporteee.png" alt="" width="20px" height="25px" class="mb-1">
            </button>
            <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="generarGrafico(${row.id_categoria_producto})">
              <i class="bi bi-x-square-fill"></i>
              <img src="../../resources/images/graph.png" alt="" width="25px" height="25px" class="mb-1 mx-2">
            </button>
          </div>
            </div>
          </div>
        </div>
      `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

const fillTable2 = async (form = null) => {
    CARD_COLOR.innerHTML = '';
    const action = (form) ? 'searchRows' : 'readAll';
    const DATA = await fetchData(COLORES_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CARD_COLOR.innerHTML += `
        <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-4 mt-5 text-center">
          <div class="card h-100" id="cards">
            <div class="card-body">
              <h5 class="card-title">ID: ${row.id_color}</h5>
              <div class="color-display">
                <h5 class="card-title">Color: #${row.color}</h5>
              </div>
               <div class="color-box" width="100%" height="20%" style="background-color: #${row.color};"></div>
            </div>
          <div class="d-flex justify-content-center gap-2">
            <button type="submit" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete2(${row.id_color}, '${row.color}')">
              <i class="bi bi-search"></i>
              <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
            </button>
            <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate2(${row.id_color}, '${row.color}')">
              <i class="bi bi-x-square-fill"></i>
              <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
            </button>
          </div>
        </div>
      `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

const fillTable3 = async (form = null) => {
    CARD_TALLAS.innerHTML = '';
    const action = (form) ? 'searchRows' : 'readAll';
    const DATA = await fetchData(TALLAS_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CARD_TALLAS.innerHTML += `
        <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-4 mt-5 text-center">
          <div class="card h-100" id="cards">
            <div class="card-body">
              <h5 class="card-title">ID: ${row.id_talla}</h5>
              <p>Talla: ${row.talla}</p>
              <div class="d-flex justify-content-center gap-2">
            <button type="submit" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete3(${row.id_talla}, '${row.talla}')">
              <i class="bi bi-search"></i>
              <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
            </button>
            <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate3(${row.id_talla}, '${row.talla}')">
              <i class="bi bi-x-square-fill"></i>
              <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
            </button>
          </div>
            </div>
          </div>
        </div>
      `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear categoría';
    // Se prepara el formulario.
    SAVE_FORM.reset();
}

const openCreate2 = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL2.show();
    MODAL_TITLE2.textContent = 'Agregar color';
    // Se prepara el formulario.
    SAVE_FORM2.reset();
}

const openCreate3 = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL3.show();
    MODAL_TITLE3.textContent = 'Agregar talla';
    // Se prepara el formulario.
    SAVE_FORM3.reset();
}

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id, nombre) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCategoriaProducto', id);
    FORM.append('nombreCategoriaProducto', nombre);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CATEGORIA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar ' + nombre;
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_CATEGORIA.value = ROW.id_categoria_producto;
        NOMBRE_CATEGORIA.value = ROW.categoria_producto;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openUpdate2 = async (id, nombre) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idColorProducto', id);
    FORM.append('colorHex', nombre);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(COLORES_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL2.show();
        MODAL_TITLE2.textContent = 'Actualizar color #' + nombre;
        // Se prepara el formulario.
        SAVE_FORM2.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_COLOR.value = ROW.id_color;
        NOMBRE_COLOR.value = ROW.color;;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openUpdate3 = async (id, nombre) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idTallaProducto', id);
    FORM.append('talla', nombre);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(TALLAS_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL3.show();
        MODAL_TITLE3.textContent = 'Actualizar talla ' + nombre;
        // Se prepara el formulario.
        SAVE_FORM3.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_TALLA.value = ROW.id_talla;
        TALLA.value = ROW.talla;;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id, nombre) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar la categoría ' + nombre + ' de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idCategoriaProducto', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(CATEGORIA_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}


const openDelete2 = async (id, nombre) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar el color #' + nombre + ' de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idColorProducto', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(COLORES_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable2();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const openDelete3 = async (id, nombre) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar la talla ' + nombre + ' de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idTallaProducto', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(TALLAS_API, 'deleteRow', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra un mensaje de éxito.
            await sweetAlert(1, DATA.message, true);
            // Se carga nuevamente la tabla para visualizar los cambios.
            fillTable3();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const openReport = (id, nombre) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/productos_categoria.php`);
    // Se agrega un parámetro a la ruta con el valor del registro seleccionado.
    PATH.searchParams.append('idCategoriaProducto', id);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}

localStorage.setItem('paginaOrigen', window.location.href);


//Función para convertir el color seleccionado a formato hexadecimal
function updateColorHex(color) {
    // Convertir el color seleccionado a formato hexadecimal
    var colorHex = color.substring(1); // Eliminar el símbolo '#' al inicio
    // Asignar el valor hexadecimal al input oculto
    document.getElementById("colorHex").value = colorHex;
}

//Función asíncrona para generar un gráfico con los productos más vendidos de una categoria seleccionada
const generarGrafico = async (idCategoriaProducto) => {
    // Obtén el contenedor donde se mostrará el gráfico, que es justo debajo de las cards de las categorías de alumnos
    const container = CARD_CATEGORIAS;

    // Si ya hay un gráfico, elimínalo
    const existingChartContainer = document.getElementById('chartContainer');
    if (existingChartContainer) {
        existingChartContainer.remove();
    }

    // Crea el contenedor del gráfico y añade un canvas para el gráfico
    const chartContainer = document.createElement('div');
    chartContainer.id = 'chartContainer';
    chartContainer.style.width = '100%';
    chartContainer.style.height = '400px'; // Ajusta la altura según sea necesario

    // Crea el elemento canvas para el gráfico
    const canvas = document.createElement('canvas');
    canvas.id = 'chartCanvas'; // Asegúrate de que el ID sea único y utilizado correctamente
    chartContainer.appendChild(canvas);

    // Añade el contenedor del gráfico debajo del contenedor de las tarjetas, o después de la última card encontrada
    container.insertAdjacentElement('afterend', chartContainer);


    // Realiza la solicitud a la API para obtener los datos del gráfico
    try {
        const response = await fetch(CATEGORIA_API2 + '?action=readTopproductosCategoria', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idCategoriaProducto }) //Aquí mandamos el parámetro a la capa de servicios
        });

        const DATA = await response.json();

        if (DATA.status) {
            // Declaramos arreglos para almacenar los datos del gráfico
            let productos = [];
            let total = [];

            DATA.dataset.forEach(row => {
                productos.push(row.nombre_producto);
                total.push(row.total_vendido);
            });

            // Llama a la función para generar el gráfico de pastel
            pieGraph('chartCanvas', productos, total, 'Productos más vendidos de la categoría');


            // Desplazamiento hasta el contenedor del gráfico
            //Formato del scrollViewInto

            /*1- behavior: Es el comportamiento del desplazamiento, 
            es decir si el desplazamiento hasta el gráfico debe ser lento (smooth) o automático (auto)
            
              2- block: Define cómo se debe alinear el elemento dentro del contenedor visible, en este caso al inicio*/
            chartContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } else {
            console.log(DATA.error);
        }
    } catch (error) {
        console.error('Error al generar el gráfico:', error);
    }
};