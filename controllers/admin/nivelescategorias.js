// Constante para completar la ruta de la API.
const NIVELES_ENTRENAMIENTO_API = 'services/admin/nivelesentrenamiento.php';
const CATEGORIA_ALUMNO_API = 'services/admin/categoriasalumnos.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
const SEARCH_FORM2 = document.getElementById('searchForm2');
// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
ROWS_FOUND = document.getElementById('rowsFound');

    //CARD_CATEGORIAS = document.getElementById('cardCategorias');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

    const SAVE_MODAL2 = new bootstrap.Modal('#saveModal2'),
    MODAL_TITLE2 = document.getElementById('modalTitle2');

    const SAVE_MODAL3 = new bootstrap.Modal('#saveModal3'),
    MODAL_TITLE3 = document.getElementById('modalTitle3');
    
    CARD_NIVELES_ENTRENAMIENTO = document.getElementById('cardsNivelesEntrenamiento');
    CARD_CATEGORIAS_ALUMNOS = document.getElementById('cardsCategoriasAlumnos');
    CARD_CATEGORIAS_ALUMNOS_HORARIOS = document.getElementById('cardsCategoriasAlumnosHorarios');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_NIVEL_ENTRENAMIENTO = document.getElementById('idNivelEntrenamiento'),
    NOMBRE_NIVEL_ENTRENAMIENTO = document.getElementById('nombreNivelEntrenamiento'),
    DESCRIPCION_NIVEL_ENTRENAMIENTO = document.getElementById('descripcionNivelEntrenamiento'),
    IMAGEN_NIVEL_ENTRENAMIENTO = document.getElementById('imagenNivelEntrenamiento');

    const SAVE_FORM2 = document.getElementById('saveForm2'),
    ID_CATEGORIA_ALUMNO = document.getElementById('idCategoriaAlumno'),
    CATEGORIA_ALUMNO = document.getElementById('nombreCategoriaAlumno'),
    EDAD_MINIMA = document.getElementById('edadMinimaAlumno'),
    EDAD_MAXIMA = document.getElementById('edadMaximaAlumno'),
    NIVEL_COMPETENCIA = document.getElementById('selectNivelCompetencia'),
    HORARIO_ENTRENO = document.getElementById('selectHorarioEntrenamiento'),
    IMAGEN_CATEGORIA = document.getElementById('imagenCategoriaEntrenamiento');

    const SAVE_FORM3 = document.getElementById('saveForm3'),
    ID_CATEGORIA_ALUMNO_HORARIO = document.getElementById('idCategoriaHorario'),
    ID_CATEGORIA_ALUMNOO = document.getElementById('selectCategoria'),
    ID_CATEGORIA_HORARIO = document.getElementById('selectHorarioCategoria');

// Método del evento para cuando el documento ha cargado.
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

SAVE_FORM2.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_CATEGORIA_ALUMNO.value) ? action = 'updateRowAlumno' : action = 'createRowAlumno';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM2);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CATEGORIA_ALUMNO_API, action, FORM);
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
    (ID_CATEGORIA_ALUMNO_HORARIO.value) ? action = 'updateRowAlumnosHorario' : action = 'createRowAlumnosHorario';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM3);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CATEGORIA_ALUMNO_API, action, FORM);
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
                <div class="card-body shadow-lg bg-body-tertiary rounded">
        
                    <div class="d-flex align-items-center">
                        <div class="col-md-12 d-flex align-items-center justify-content-center">
                            <img src="${SERVER_URL}images/niveles/${row.imagen_nivel}" class="img-fluid" width="600px" height="98px">
                        </div>
                    </div>
                    
                        <div class="col-md-12">
                            <h5 class="card-title mb-2 fs-1">${row.nivel_entrenamiento}</h5>
                        </div>
                <p class="card-text mt-2">${row.descripcion_nivel}</p>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                <button type="button" class="btn btn-sm" onclick="openUpdate(${row.id_nivel_entrenamiento})">
                    <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                </button>
                <button type="button" class="btn btn-sm" onclick="openDelete(${row.id_nivel_entrenamiento})">
                    <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
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
    // Se inicializa el contenido de la tabla.
    CARD_CATEGORIAS_ALUMNOS.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAllAlumno';
    // Petición para obtener los registros disponibles.
    const DATA2 = await fetchData(CATEGORIA_ALUMNO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA2.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA2.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CARD_CATEGORIAS_ALUMNOS.innerHTML += `
                <div class="col-lg-12">
                    <div class="card w-100 mt-2">
                        <div class="card-body shadow-lg bg-body-tertiary rounded text-bg-dark">
                            
                            <div class="row align-items-center">
                                <div class="col-md-12 mb-2 d-flex justify-content-center">
                                    <img src="${SERVER_URL}images/alumnos_categorias/${row.imagen_categoria}" class="img-fluid rounded">
                                </div>
                                <div class="col-md-12 mt-3 ">
                                
                                    <h5 class="card-title mb-2 fs-6 text-dark text-start"><b>Categoría</b>: ${row.categoria}</h5>
                                    <h5 class="card-title mb-2 fs-6 text-dark text-start"><b>Edad mínima</b>: ${row.edad_minima}</h5>
                                    <h5 class="card-title mb-2 fs-6 text-dark text-start"><b>Edad máxima</b>: ${row.edad_maxima}</h5>
                                    <h5 class="card-title mb-2 fs-6 text-dark text-start"><b>Nivel de competencia</b>: ${row.nivel_entrenamiento}</h5>
                                    
                                </div>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-sm me-2" onclick="openUpdate2(${row.id_categoria_alumno})">
                                    <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                                </button>
                                <button type="button" class="btn btn-sm" onclick="openDelete2(${row.id_categoria_alumno})">
                                    <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        sweetAlert(4, DATA2.error, true);
    }
}

const fillTable3 = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    CARD_CATEGORIAS_ALUMNOS_HORARIOS.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRowsAlumnosHorario' : action = 'readAllAlumnosHorario';
    // Petición para obtener los registros disponibles.
    const DATA2 = await fetchData(CATEGORIA_ALUMNO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA2.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA2.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CARD_CATEGORIAS_ALUMNOS_HORARIOS.innerHTML += `
                <div class="col-lg-12">
                    <div class="card w-100 mt-2">
                        <div class="card-body shadow-lg bg-body-tertiary rounded text-bg-dark">
                            
                            <div class="row align-items-center">
                                <div class="col-md-12 mb-2 d-flex justify-content-center">
                                    <img src="${SERVER_URL}images/alumnos_categorias/${row.imagen_categoria}" class="img-fluid rounded">
                                </div>
                                <div class="col-md-12 mt-3 ">
                                
                                    <h5 class="card-title mb-2 fs-6 text-dark text-start"><b>Categoría</b>: ${row.categoria}</h5>
                                    <h5 class="card-title mb-2 fs-6 text-dark text-start"><b>Entrenamiento</b>: ${row.id_horario_lugar}</h5>
                                    
                                </div>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-sm me-2" onclick="openUpdate3(${row.id_categoria_horario})">
                                    <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                                </button>
                                <button type="button" class="btn btn-sm" onclick="openDelete3(${row.id_categoria_horario})">
                                    <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        sweetAlert(4, DATA2.error, true);
    }
}


const openCreate = () => {
  // Se muestra la caja de diálogo con su título.
  SAVE_MODAL.show();
  MODAL_TITLE.textContent = 'Agregar niveles de entrenamiento';
  // Se prepara el formulario.
  SAVE_FORM.reset();
}

const openCreate2 = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL2.show();
    MODAL_TITLE2.textContent = 'Agregar categorias de alumnos';
    // Se prepara el formulario.
    SAVE_FORM2.reset();

    fillSelect(CATEGORIA_ALUMNO_API, 'readNivelesAlumnos', 'selectNivelCompetencia');
  }

  const openCreate3 = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL3.show();
    MODAL_TITLE3.textContent = 'Asignar horarios de entrenamiento a las categorías';
    // Se prepara el formulario.
    SAVE_FORM3.reset();

    fillSelect(CATEGORIA_ALUMNO_API, 'readCategoriasAlumnos', 'selectCategoria');
    fillSelect(CATEGORIA_ALUMNO_API, 'readAllHorariosCombo', 'selectHorarioCategoria');
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

const openUpdate2 = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCategoriaAlumno', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CATEGORIA_ALUMNO_API, 'readOneAlumno', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL2.show();
        MODAL_TITLE2.textContent = 'Actualizar categoria';
        // Se prepara el formulario.
        SAVE_FORM2.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_CATEGORIA_ALUMNO.value = ROW.id_categoria_alumno;
        CATEGORIA_ALUMNO.value = ROW.categoria;
        EDAD_MINIMA.value = ROW.edad_minima;
        EDAD_MAXIMA.value = ROW.edad_maxima;

        fillSelect(CATEGORIA_ALUMNO_API, 'readNivelesAlumnos', 'selectNivelCompetencia', ROW.id_nivel_entrenamiento);
    } else {
        sweetAlert(2, DATA.error, false);
    }
  }

  const openUpdate3 = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCategoriaHorario', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CATEGORIA_ALUMNO_API, 'readOneAlumnosHorario', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL3.show();
        MODAL_TITLE3.textContent = 'Actualizar asignación';
        // Se prepara el formulario.
        SAVE_FORM3.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_CATEGORIA_ALUMNO_HORARIO.value = ROW.id_categoria_horario;

        fillSelect(CATEGORIA_ALUMNO_API, 'readCategoriasAlumnos', 'selectCategoria', ROW.id_categoria_alumno);
        fillSelect(CATEGORIA_ALUMNO_API, 'readAllHorariosCombo', 'selectHorarioCategoria', ROW.id_horario_lugar);
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

const openDelete2 = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar esta categoria de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idCategoriaAlumno', id);
        
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(CATEGORIA_ALUMNO_API, 'deleteRowAlumno', FORM);
        
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

  
const openDelete3 = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar esta categoria de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idCategoriaAlumno', id);
        
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(CATEGORIA_ALUMNO_API, 'deleteRowAlumnosHorario', FORM);
        
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

  const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/categorias_niveles_horarios.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}






