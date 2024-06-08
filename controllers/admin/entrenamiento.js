const ENTRENAMIENTO_API = 'services/admin/entrenamiento.php';
// Constante para establecer el formulario de buscar.

const SEARCH_FORM = document.getElementById('searchForm');

// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound'),
    CARDS_HORARIOS = document.getElementById('cardsHorarios');
    CARDS_LUGARES = document.getElementById('cardsLugares');
    CARDS_LUGARES_HORARIOS = document.getElementById('cradsHorariosLugares');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

const SAVE_MODAL2 = new bootstrap.Modal('#saveModal2'),
    MODAL_TITLE2 = document.getElementById('modalTitle2');

const SAVE_MODAL3 = new bootstrap.Modal('#saveModal3'),
MODAL_TITLE3 = document.getElementById('modalTitle3');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_HORARIO = document.getElementById('idHorario'),
    DIA_ENTRENO = document.getElementById('selectDia'),
    HORA_INICIO = document.getElementById('horainicio'),
    HORA_FIN = document.getElementById('horafinalizacion');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM2 = document.getElementById('saveForm2'),
    ID_LUGAR = document.getElementById('idLugar'),
    NOMBRE_LUGAR = document.getElementById('nombreLugar'),
    IMAGEN_LUGAR = document.getElementById('imagenLugar'),
    DIRECCION_LUGAR = document.getElementById('direccionLugar'),
    URL_LUGAR = document.getElementById('URLLugar');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM3 = document.getElementById('saveForm3'),
    ID_HORARIO_LUGAR = document.getElementById('idHorarioLugar'),
    ID_HORARIOO = document.getElementById('selectHorarioLugar'),
    ID_LUGARRR = document.getElementById('selectDiaLugar');



document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();

    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
    fillTable2();
    fillTable3();
});


SEARCH_FORM.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable(FORM);
    fillTable2(FORM);
    fillTable3(FORM);
});





// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Prevent the page from reloading after submitting the form.
    event.preventDefault();

    // Get the form data
    const FORM = new FormData(SAVE_FORM);


    // Determine the action to perform (update or create)
    const action = ID_HORARIO.value ? 'updateRowHorarios' : 'createRowHorarios';

    // Send the form data to the server
    const DATA = await fetchData(ENTRENAMIENTO_API, action, FORM);

    // Check if the response is satisfactory; otherwise, show a message with the exception.
    if (DATA.status) {
        // Close the dialog box.
        SAVE_MODAL.hide();
        // Show a success message.
        sweetAlert(1, DATA.message, true);
        // Reload the table to visualize the changes.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

SAVE_FORM2.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_LUGAR.value) ? action = 'updateRowLugares' : action = 'createRowLugares';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM2);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ENTRENAMIENTO_API, action, FORM);
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
    (ID_HORARIO_LUGAR.value) ? action = 'updateRowLugaresHorarios' : action = 'createRowLugaresHorarios';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM3);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ENTRENAMIENTO_API, action, FORM);
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
    // Initialize the content of the table.
    CARDS_HORARIOS.innerHTML = '';
    // Determine the action to perform.
    const action = form ? 'searchRows' : 'readAllHorarios';
    // Request to obtain the available records.
    const DATA = await fetchData(ENTRENAMIENTO_API, action, form);
    // Check if the response is satisfactory; otherwise, show a message with the exception.
    if (DATA.status) {
        // Loop through the set of records row by row.
        DATA.dataset.forEach(row => {
            // Create and concatenate table rows with the data of each record.
            CARDS_HORARIOS.innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">Horario ${row.id_horario}</h5>
                        <div class="d-flex flex-column">
                            <div class="text-start mb-3">
                                <label>Día de entrenamiento:</label>
                                <label>${row.dia_entrenamiento}</label>
                            </div>
                            <div class="text-start mb-3">
                                <label>Hora de inicio:</label>
                                <label>${formatHour(row.hora_inicio)}</label>
                            </div>
                            <div class="text-start mb-3">
                                <label>Hora de finalización:</label>
                                <label>${formatHour(row.hor_fin)}</label>
                            </div>
                        </div>
                        <div class="container contendorBotones">
                            <div class="row gx-2 justify-content-end">
                                <div class="col-auto">
                                    <button type="button" class="btn btn-white mt-2" onclick="openUpdate(${row.id_horario})">
                                        <img src="../../resources/images/btnActualizarIMG.png" alt=""
                                            width="30px" height="30px" class="mb-1">
                                    </button>
                                </div>
                                <div class="col-auto">
                                    <button type="button" class="btn btn-white mt-2" onclick="openDelete(${row.id_horario})">
                                        <img src="../../resources/images/btnEliminarIMG.png" alt=""
                                            width="30px" height="30px" class="mb-1">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
};

const fillTable2 = async (form = null) => {
    // Initialize the content of the table.
    CARDS_LUGARES.innerHTML = '';
    // Determine the action to perform.
    const action = form ? 'searchRows' : 'readAllLugares';
    // Request to obtain the available records.
    const DATA = await fetchData(ENTRENAMIENTO_API, action, form);
    // Check if the response is satisfactory; otherwise, show a message with the exception.
    if (DATA.status) {
        // Loop through the set of records row by row.
        DATA.dataset.forEach(row => {
            // Create and concatenate table rows with the data of each record.
            CARDS_LUGARES.innerHTML += `
                <div class="card container text-center mb-3">
                    <div class="row">
                        <div class="col col-lg-12 col-sm-12 col-md-12 imagenContenedor">
                            <img src="${SERVER_URL}images/lugares_entreno/${row.imagen_lugar}" class="card-img-top">
                                </div>
                                    <div class="col">
                                        <div class="card-body">
                                            <div class="text-start mb-3">
                                            
                                            <label class="fw-bold fs-4">${row.nombre_lugar}</label>
                                            </div>
                                            <div class="text-start mb-3">
                                            <label>Dirección:</label>
                                            <label>${row.direccion_lugar}</label>
                                            </div>
    
                                        </div>
                                    </div>
                                    <div class="container contendorBotones">
                                        <div class="row gx-2 justify-content-center">
    
                                            <div class="col-auto">
                                                <button type="button" class="btn btn-white mt-2" onclick="openUpdate2(${row.id_lugar})">
                                                    <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                                                </button>
                                            </div>
                                            <div class="col-auto">
                                                <button type="button" class="btn btn-white mt-2" onclick="openDelete2(${row.id_lugar})">
                                                    <img src="../../resources/images/btnEliminarIMG.png" alt=""
                                                         width="30px" height="30px" class="mb-1">
                                                </button>
                                            </div>
                                            <div class="col-auto mt-3 me-2">
                                                <a href="${row.URL_lugar}">
                                                <!--Aquí le damos las coordenadas del estadio Cuscatlan,
                                                obtenidas de la wikipedia y jugar con la posicion porque no son exactas las de la Wikipedia-->
                                                <img src="../../resources/images/llegar.png" alt="..."
                                                    width="25px" height="25px">
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
};

const fillTable3 = async (form = null) => {
    // Initialize the content of the table.
    CARDS_LUGARES_HORARIOS.innerHTML = '';
    // Determine the action to perform.
    const action = form ? 'searchRows' : 'readAllLugaresHorarios';
    // Request to obtain the available records.
    const DATA = await fetchData(ENTRENAMIENTO_API, action, form);
    // Check if the response is satisfactory; otherwise, show a message with the exception.
    if (DATA.status) {
        // Loop through the set of records row by row.
        DATA.dataset.forEach(row => {
            // Create and concatenate table rows with the data of each record.
            CARDS_LUGARES_HORARIOS.innerHTML += `
                                 <div class="card container text-center mb-3">
                                            <div class="row">
                                                <div class="col">
                                                    <div class="card-body">
                                                        <label for="" id="lugarentrenamiento"
                                                            class="fw-bold mb-4">${row.nombre_lugar}</label>

                                                        <div class="text-start mb-3">
                                                            <label>Día de entrenamiento:</label>
                                                            <label>${row.dia_entrenamiento}</label>
                                                            
                                                        </div>

                                                        <div class="text-start mb-3">
                                                            <label>Hora de inicio:</label>
                                                                <label>${formatHour(row.hora_inicio)}</label>
                                                        </div>
                                                        <div class="text-start mb-3">
                                                            <label>Hora de finalización:</label>
                                                            <label>${formatHour(row.hor_fin)}</label>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="container contendorBotones">
                                                    <div class="row gx-2 justify-content-end">

                                                        <div class="col-auto">
                                                            <button type="button" class="btn btn-white mt-2" onclick="openUpdate3(${row.id_horario_lugar})">
                                                                <img src="../../resources/images/btnActualizarIMG.png"
                                                                    alt="" width="30px" height="30px" class="mb-1">
                                                            </button>
                                                        </div>
                                                        <div class="col-auto">
                                                            <button type="button" class="btn btn-white mt-2" onclick="openDelete3(${row.id_horario_lugar})">
                                                                <img src="../../resources/images/btnEliminarIMG.png"
                                                                    alt="" width="30px" height="30px" class="mb-1">
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
};

const formatHour = (time) => {
    const [hour, minute] = time.split(":");
    let formattedHour;
    if (parseInt(hour) === 12) {
        formattedHour = `12:${minute} p.m.`;
    } else if (parseInt(hour) > 12) {
        formattedHour = `${parseInt(hour) - 12}:${minute} p.m.`;
    } else {
        formattedHour = `${hour}:${minute} a.m.`;
    }
    return formattedHour;
};






const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Agregar horarios';
    // Se prepara el formulario.
    SAVE_FORM.reset();
}

const openCreate2 = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL2.show();
    MODAL_TITLE2.textContent = 'Agregar lugar de entrenamiento';
    // Se prepara el formulario.
    SAVE_FORM2.reset();
}

const openCreate3 = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL3.show();
    MODAL_TITLE3.textContent = 'Asignar horarios y entrenamientos';
    // Se prepara el formulario.
    SAVE_FORM3.reset();

    fillSelect(ENTRENAMIENTO_API, 'readAllLugares', 'selectDiaLugar');
    fillSelect(ENTRENAMIENTO_API, 'readAllHorariosCombo', 'selectHorarioLugar');
}



const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idHorario', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ENTRENAMIENTO_API, 'readOneHorarios', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar horario';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_HORARIO.value = ROW.id_horario;
        DIA_ENTRENO.value = ROW.dia_entrenamiento;
        HORA_INICIO.value = ROW.hora_inicio;
        HORA_FIN.value = ROW.hor_fin;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openUpdate2 = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idLugar', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ENTRENAMIENTO_API, 'readOneLugares', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL2.show();
        MODAL_TITLE2.textContent = 'Actualizar lugar de entrenamiento';
        // Se prepara el formulario.
        SAVE_FORM2.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_LUGAR.value = ROW.id_lugar;
        NOMBRE_LUGAR.value = ROW.nombre_lugar;
        DIRECCION_LUGAR.value = ROW.direccion_lugar;
        URL_LUGAR.value = ROW.URL_lugar;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openUpdate3 = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idHorarioLugar', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ENTRENAMIENTO_API, 'readOneLugaresHorarios', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL3.show();
        MODAL_TITLE3.textContent = 'Actualizar asignación de lugar y horario';
        // Se prepara el formulario.
        SAVE_FORM3.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_HORARIO_LUGAR.value = ROW.id_horario_lugar;

        
        fillSelect(ENTRENAMIENTO_API, 'readAllLugares', 'selectDiaLugar', ROW.id_lugar);
        fillSelect(ENTRENAMIENTO_API, 'readAllHorariosCombo', 'selectHorarioLugar', ROW.id_horario);
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
    const RESPONSE = await confirmAction('¿Desea eliminar este horario de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idHorario', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(ENTRENAMIENTO_API, 'deleteRowHorarios', FORM);
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
    const RESPONSE = await confirmAction('¿Desea eliminar este lugar de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idLugar', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(ENTRENAMIENTO_API, 'deleteRowLugares', FORM);
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
    const RESPONSE = await confirmAction('¿Desea eliminar esta asignación de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idHorarioLugar', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(ENTRENAMIENTO_API, 'deleteRowLugaresHorarios', FORM);
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

