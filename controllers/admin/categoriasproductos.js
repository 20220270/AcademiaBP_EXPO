const CATEGORIA_API = 'services/admin/categoriasproductos.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
//const TABLE_BODY = document.getElementById('tableBody'),
    //ROWS_FOUND = document.getElementById('rowsFound');

    CARD_CATEGORIAS = document.getElementById('cardCategorias');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_CATEGORIA = document.getElementById('idCategoriaProducto'),
    NOMBRE_CATEGORIA = document.getElementById('nombreCategoriaProducto'),
    IMAGEN_CATEGORIA = document.getElementById('imagenCategoriaProducto');


function updateColorHex(color) {
    // Convertir el color seleccionado a formato hexadecimal
    var colorHex = color.substring(1); // Eliminar el símbolo '#' al inicio
    // Asignar el valor hexadecimal al input oculto
    document.getElementById("colorHex").value = colorHex;
}


document.addEventListener('DOMContentLoaded', () => {
  // Llamada a la función para mostrar el encabezado y pie del documento.
  loadTemplate();
  // Se establece el título del contenido principal.
  //MAIN_TITLE.textContent = 'Gestionar categorías';
  // Llamada a la función para llenar la tabla con los registros existentes.
  fillTable();
});

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_FORM.addEventListener('submit', (event) => {
  // Se evita recargar la página web después de enviar el formulario.
  event.preventDefault();
  // Constante tipo objeto con los datos del formulario.
  const FORM = new FormData(SEARCH_FORM);
  // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
  fillTable(FORM);
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

const fillTable = async (form = null) => {
  // Se inicializa el contenido de la tabla.
  //ROWS_FOUND.textContent = '';
  //TABLE_BODY.innerHTML = '';
  CARD_CATEGORIAS.innerHTML = '';
  // Se verifica la acción a realizar.
  (form) ? action = 'searchRows' : action = 'readAll';
  // Petición para obtener los registros disponibles.
  const DATA = await fetchData(CATEGORIA_API, action, form);
  // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
  if (DATA.status) {
      console.log(DATA)
      // Se recorre el conjunto de registros fila por fila.
      DATA.dataset.forEach(row => {
          // Se crean y concatenan las filas de la tabla con los datos de cada registro.
          

          CARD_CATEGORIAS.innerHTML += `
            <div class="col-lg-12 col-md-6 col-sm-12 mb-4 mt-5 text-center" >
                <div class="card h-100" id="cards">
                    <img src="${SERVER_URL}images/categorias_productos/${row.imagen_categoria}" class="card-img-top" height="250px" width="250px">
                    <div class="card-body">
                        <h5 class="card-title">${row.categoria_producto}</h5>
                    </div>
                </div>

                <div class="d-flex justify-content-center gap-2">
                <button type="submit" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_categoria_producto})">
                    <i class="bi bi-search"></i>
                        <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                </button>
                <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_categoria_producto})">
                    <i class="bi bi-x-square-fill"></i>
                        <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                </button>
            </div>
            </div>
          `;
      });
      // Se muestra un mensaje de acuerdo con el resultado.
      ROWS_FOUND.textContent = DATA.message;
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

/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openUpdate = async (id) => {
  // Se define una constante tipo objeto con los datos del registro seleccionado.
  const FORM = new FormData();
  FORM.append('idCategoriaProducto', id);
  // Petición para obtener los datos del registro solicitado.
  const DATA = await fetchData(CATEGORIA_API, 'readOne', FORM);
  // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
  if (DATA.status) {
      // Se muestra la caja de diálogo con su título.
      SAVE_MODAL.show();
      MODAL_TITLE.textContent = 'Actualizar categoría';
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

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete = async (id) => {
  // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
  const RESPONSE = await confirmAction('¿Desea eliminar la categoría de forma permanente?');
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


localStorage.setItem('paginaOrigen', window.location.href);