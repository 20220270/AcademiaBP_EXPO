const ENTRENAMIENTO_API = 'services/admin/entrenamiento.php';
// Constante para establecer el formulario de buscar.


const SEARCH_FORM = document.getElementById('searchForm');
const SEARCH_FORM2 = document.getElementById('searchForm2');
const SEARCH_FORM3 = document.getElementById('searchForm3');

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

    event.preventDefault();


    const FORM = new FormData(SAVE_FORM);



    const action = ID_HORARIO.value ? 'updateRowHorarios' : 'createRowHorarios';


    const DATA = await fetchData(ENTRENAMIENTO_API, action, FORM);


    if (DATA.status) {

        SAVE_MODAL.hide();

        sweetAlert(1, DATA.message, true);

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

    CARDS_HORARIOS.innerHTML = '';

    const action = form ? 'searchRowsHorarios' : 'readAllHorarios';

    const DATA = await fetchData(ENTRENAMIENTO_API, action, form);

    if (DATA.status) {

        DATA.dataset.forEach(row => {

            CARDS_HORARIOS.innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title fw-bold mb-4"> Horario ${row.id_horario}</h5>
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
                                    <button type="button" class="btn btn-white mt-2" onclick="openUpdate(${row.id_horario}, '${row.horario}')"  title="Actualizar horario ${row.horario}">
                                        <img src="../../resources/images/btnActualizarIMG.png" alt=""
                                            width="30px" height="30px" class="mb-1">
                                    </button>
                                </div>
                                <div class="col-auto">
                                    <button type="button" class="btn btn-white mt-2" onclick="openDelete(${row.id_horario}, '${row.horario}')" title="Eliminar horario ${row.horario}">
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

    CARDS_LUGARES.innerHTML = '';

    const action = form ? 'searchRowsLugares' : 'readAllLugares';

    const DATA = await fetchData(ENTRENAMIENTO_API, action, form);

    if (DATA.status) {

        DATA.dataset.forEach(row => {

            CARDS_LUGARES.innerHTML += `
                <div class="card container text-center mb-3">
                    <div class="row">
                        <div class="col col-lg-12 col-sm-12 col-md-12 imagenContenedor">
                            <img src="${SERVER_URL}images/lugares_entreno/${row.imagen_lugar}" class="card-img-top" width="200" height="200">
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
                                                <button type="button" class="btn btn-white mt-2" onclick="openUpdate2(${row.id_lugar}, '${row.nombre_lugar}')"  title="Actualizar ${row.nombre_lugar}">
                                                    <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                                                </button>
                                            </div>
                                            <div class="col-auto">
                                                <button type="button" class="btn btn-white mt-2" onclick="openDelete2(${row.id_lugar}, '${row.nombre_lugar}')"  title="Eliminar ${row.nombre_lugar}">
                                                    <img src="../../resources/images/btnEliminarIMG.png" alt=""
                                                         width="30px" height="30px" class="mb-1">
                                                </button>
                                            </div>
                                            <div class="col-auto mt-3 me-2">
                                                <a href="${row.URL_lugar}">
                                                <!--Aquí le damos las coordenadas del estadio Cuscatlan,
                                                obtenidas de la wikipedia y jugar con la posicion porque no son exactas las de la Wikipedia-->
                                                <img src="../../resources/images/llegar.png" alt="..."
                                                    width="20px" height="20px"  title="Ir a la ubicación">
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

    CARDS_LUGARES_HORARIOS.innerHTML = '';

    const action = form ? 'searchRowsHorariosLugares' : 'readAllLugaresHorarios';

    const DATA = await fetchData(ENTRENAMIENTO_API, action, form);

    if (DATA.status) {

        DATA.dataset.forEach(row => {

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
                                                            <button type="button" class="btn btn-white mt-2" onclick="openUpdate3(${row.id_horario_lugar}, '${row.horariolugar}')"  title="Actualizar asignación ${row.horariolugar}">
                                                                <img src="../../resources/images/btnActualizarIMG.png"
                                                                    alt="" width="30px" height="30px" class="mb-1">
                                                            </button>
                                                        </div>
                                                        <div class="col-auto">
                                                            <button type="button" class="btn btn-white mt-2" onclick="openDelete3(${row.id_horario_lugar}, '${row.horariolugar}')"  title="Eliminar asignación ${row.horariolugar}">
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
    MODAL_TITLE3.textContent = 'Asignar horarios';
    // Se prepara el formulario.
    SAVE_FORM3.reset();

    fillSelect(ENTRENAMIENTO_API, 'readAllLugares', 'selectDiaLugar');
    fillSelect(ENTRENAMIENTO_API, 'readAllHorariosCombo', 'selectHorarioLugar');
}



const openUpdate = async (id, nombre) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idHorario', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ENTRENAMIENTO_API, 'readOneHorarios', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar horario ' + nombre;
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

const openUpdate2 = async (id, nombre) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idLugar', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ENTRENAMIENTO_API, 'readOneLugares', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL2.show();
        MODAL_TITLE2.textContent = 'Actualizar ' + nombre;
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

const openUpdate3 = async (id, nombre) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idHorarioLugar', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ENTRENAMIENTO_API, 'readOneLugaresHorarios', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL3.show();
        MODAL_TITLE3.textContent = 'Actualizar asignación ' + nombre;
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
const openDelete = async (id, nombre) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este horario: ' +nombre+', de forma permanente?');
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

const openDelete2 = async (id, nombre) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este lugar: ' +nombre+', de forma permanente?');
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

const openDelete3 = async (id, nombre) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar esta asignación: ' +nombre+' de forma permanente?');
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

var map;
var marker;

function initMap() {
    var elSalvadorBounds = {
        north: 14.445,
        south: 13.041,
        west: -90.118,
        east: -87.686
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 13.794185, lng: -88.89653 },
        zoom: 8,
        restriction: {
            latLngBounds: elSalvadorBounds,
            strictBounds: true,
        },
    });

    google.maps.event.addListener(map, 'click', function(event) {
        var clickedLocation = event.latLng;
        
        if (isLocationInElSalvador(clickedLocation)) {
            if (marker) {
                marker.setPosition(clickedLocation);
            } else {
                marker = new google.maps.Marker({
                    position: clickedLocation,
                    map: map,
                    draggable: true
                });
            }

            var wazeUrl = `https://waze.com/ul?ll=${clickedLocation.lat()},${clickedLocation.lng()}&navigate=yes`;
            document.getElementById('URLLugar').value = wazeUrl;

            google.maps.event.addListener(marker, 'dragend', function(event) {
                if (isLocationInElSalvador(event.latLng)) {
                    var newWazeUrl = `https://waze.com/ul?ll=${event.latLng.lat()},${event.latLng.lng()}&navigate=yes`;
                    document.getElementById('URLLugar').value = newWazeUrl;
                } else {
                    marker.setPosition(clickedLocation);
                    alert("La ubicación debe estar dentro de los límites de El Salvador.");
                }
            });
        } else {
            alert("La ubicación debe estar dentro de los límites de El Salvador.");
        }
    });
}

function isLocationInElSalvador(location) {
    var elSalvadorBounds = {
        north: 14.445,
        south: 13.041,
        west: -90.118,
        east: -87.686
    };

    return (
        location.lat() >= elSalvadorBounds.south &&
        location.lat() <= elSalvadorBounds.north &&
        location.lng() >= elSalvadorBounds.west &&
        location.lng() <= elSalvadorBounds.east
    );
}
