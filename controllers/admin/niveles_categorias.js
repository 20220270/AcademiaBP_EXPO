// Constante para completar la ruta de la API.
const NIVELES_ENTRENAMIENTO_API = 'services/admin/nivelesentrenamiento.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
ROWS_FOUND = document.getElementById('rowsFound');

    //CARD_CATEGORIAS = document.getElementById('cardCategorias');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
    
    CARD_NIVELES_ENTRENAMIENTO = document.getElementById('cardsNivelesEntrenamiento');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_NIVEL_ENTRENAMIENTO = document.getElementById('idNivelEntrenamiento'),
    NOMBRE_NIVEL_ENTRENAMIENTO = document.getElementById('nombreNivelEntrenamiento'),
    DESCRIPCION_NIVEL_ENTRENAMIENTO = document.getElementById('descripcionNivelEntrenamiento'),
    IMAGEN_NIVEL_ENTRENAMIENTO = document.getElementById('imagenNivelEntrenamiento');

// Método del evento para cuando el documento ha cargado.
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
  (ID_NIVEL_ENTRENAMIENTO.value) ? action = 'updateRow' : action = 'createRow';
  // Constante tipo objeto con los datos del formulario.
  const FORM = new FormData(SAVE_FORM);
  // Petición para guardar los datos del formulario.
  const DATA = await fetchData(NIVELES_ENTRENAMIENTO_API, action, FORM);
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
  CARD_NIVELES_ENTRENAMIENTO.innerHTML='';
  //CARD_CATEGORIAS.innerHTML = '';
  // Se verifica la acción a realizar.
  (form) ? action = 'searchRows' : action = 'readAll';
  // Petición para obtener los registros disponibles.
  const DATA = await fetchData(NIVELES_ENTRENAMIENTO_API, action, form);
  // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
  if (DATA.status) {
      // Se recorre el conjunto de registros fila por fila.
      DATA.dataset.forEach(row => {
          // Se crean y concatenan las filas de la tabla con los datos de cada registro.
          

          CARD_NIVELES_ENTRENAMIENTO.innerHTML += `
          <div class="col-lg-12">
    <div class="card w-100 mt-2">
        <div class="card-body">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                <button type="button" class="btn btn-dark btn-sm" onclick="openUpdate(${row.id_nivel_entrenamiento})">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button type="button" class="btn btn-danger btn-sm" onclick="openDelete(${row.id_nivel_entrenamiento})">
                    <i class="bi bi-trash-fill"></i>
                </button>
            </div>
            <div class="d-flex align-items-center">
                <div class="col-md-4 d-flex align-items-center justify-content-center">
                    <img src="${SERVER_URL}images/niveles/${row.imagen_nivel}" class="" width="100px" height="100px">
                </div>
                <div class="col-md-8">
                    <h5 class="card-title mb-2 fs-1">${row.nivel_entrenamiento}</h5>
                </div>
            </div>
            <p class="card-text mt-2">${row.descripcion_nivel}</p>
            
        </div>
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
  MODAL_TITLE.textContent = 'Agregar niveles de entrenamiento';
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
  FORM.append('idNivelEntrenamiento', id);
  // Petición para obtener los datos del registro solicitado.
  const DATA = await fetchData(NIVELES_ENTRENAMIENTO_API, 'readOne', FORM);
  // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
  if (DATA.status) {
      // Se muestra la caja de diálogo con su título.
      SAVE_MODAL.show();
      MODAL_TITLE.textContent = 'Actualizar valor';
      // Se prepara el formulario.
      SAVE_FORM.reset();
      // Se inicializan los campos con los datos.
      const ROW = DATA.dataset;
      ID_NIVEL_ENTRENAMIENTO.value = ROW.id_nivel_entrenamiento;
      NOMBRE_NIVEL_ENTRENAMIENTO.value = ROW.nivel_entrenamiento;
      DESCRIPCION_NIVEL_ENTRENAMIENTO.value = ROW.descripcion_nivel;
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
  const RESPONSE = await confirmAction('¿Desea eliminar este nivel de forma permanente?');
  // Se verifica la respuesta del mensaje.
  if (RESPONSE) {
      // Se define una constante tipo objeto con los datos del registro seleccionado.
      const FORM = new FormData();
      FORM.append('idNivelEntrenamiento', id);
      // Petición para eliminar el registro seleccionado.
      const DATA = await fetchData(NIVELES_ENTRENAMIENTO_API, 'deleteRow', FORM);
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






