// Constante para completar la ruta de la API.
const DIAS_PAGO_API = 'services/admin/diasentreno.php';
const MENSUALIDAD_API = 'services/admin/pagosmensualidad.php';
const DETALLESMENSUALIDAD_API = 'services/admin/detallemensualidad.php';

// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
const SEARCH_FORM2 = document.getElementById('searchForm2');
const SEARCH_FORM3 = document.getElementById('searchForm3');

const CARD_DIASPAGOS = document.getElementById('cardDiasPago');

const CARD_ALUMNOSTOTAL = document.getElementById('alumnototal');
const CARD_ALUMNOSPAGADOS = document.getElementById('alumnospagados');
const CARD_ALUMNOSSINPAGAR = document.getElementById('alumnospendientes');

// Constantes para establecer los elementos de la tabla.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');

const TABLE_BODY2 = document.getElementById('tableBody2'),
    ROWS_FOUND2 = document.getElementById('rowsFound2');

// Constantes para establecer los elementos del componente Modal.

const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

const SAVE_MODAL2 = new bootstrap.Modal('#saveModal2'),
    MODAL_TITLE2 = document.getElementById('modalTitle2');

const SAVE_MODAL3 = new bootstrap.Modal('#saveModal3'),
    MODAL_TITLE3 = document.getElementById('modalTitle3');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_DIA = document.getElementById('idDiasPago'),
    NUMERO_DIAS = document.getElementById('numeroDias'),
    MENSUALIDAD_PAGAR = document.getElementById('precioDia');

const SAVE_FORM2 = document.getElementById('saveForm2'),
    ID_PAGO = document.getElementById('idPagoARealizar'),
    DATOS_PAGO = document.getElementById('SelectDatosPago'),
    CUOTAS_A_PAGAR = document.getElementById('cuotasApagar'),
    ESTADO_PAGO = document.getElementById('selectEstado');
    COLUMNA_ESTADO = document.getElementById('columnaEstado');

const SAVE_FORM3 = document.getElementById('saveForm3'),
    ID_DETALLEPAGO = document.getElementById('idDetallePagoMensualidad'),
    PAGO_RALIZADO = document.getElementById('idPagoRealizado'),
    DESCRIPCION_PAGO = document.getElementById('descripcionPago'),
    PRXIMO_PAGO = document.getElementById('proximoPago');


document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    //MAIN_TITLE.textContent = 'Gestionar categorías';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
    fillTable2();
    fillTable3();
    fillTable4();
    fillTable5();
    fillTable6();
});



SEARCH_FORM.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable(FORM);
});

SEARCH_FORM2.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM2);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable2(FORM);
});

SEARCH_FORM3.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM3);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable3(FORM);
});

SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_DIA.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(DIAS_PAGO_API, action, FORM);
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
    (ID_PAGO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM2);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(MENSUALIDAD_API, action, FORM);
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
    (ID_DETALLEPAGO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM3);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(DETALLESMENSUALIDAD_API, action, FORM);
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
    CARD_DIASPAGOS.innerHTML = '';
    // Se verifica la acción a realizar.
    const action = form ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(DIAS_PAGO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CARD_DIASPAGOS.innerHTML += `
            <div class="col-md-12 mb-3 mx-3" id="cardDiasPagos">
                <div class="card">
                    <div class="card-body text-start">
                        <h5 class="card-title">ID: ${row.id_dia_pago}</h5>
                        <p class="card-text">Número de días: ${row.numero_dias}</p>
                        <p class="card-text">Mensualidad a pagar por día: $${row.mensualidad_pagar}</p>
                        <div class="d-flex justify-content-center gap-2">
                            <button type="button" class="btnr mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_dia_pago})">
                                <img src="../../resources/images/btnEliminarIMG.png" alt="Eliminar" width="30px" height="30px" class="mb-1">
                            </button>
                            <button type="button" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_dia_pago})">
                                <img src="../../resources/images/btnActualizarIMG.png" alt="Actualizar" width="30px" height="30px" class="mb-1">
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
    ROWS_FOUND.textContent = '';
    TABLE_BODY.innerHTML = '';
    //CARD_CATEGORIAS.innerHTML = '';
    // Se verifica la acción a realizar.
    const action = (form) ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(MENSUALIDAD_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Definir la clase CSS para el estado de pago
            const statusClass = (row.estado_pago === 'Pagado') ? 'pagado' : 'pendiente';
            
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
            <tr>
                <td>${row.id_pago}</td>
                <td>${row.Alumno}</td>
                <td>${row.Encargado}</td>
                <td>${row.telefono_cliente}</td>
                <td>${row.numero_dias}</td>
                <td>$${row.mensualidad_pagar}</td>
                <td class="${statusClass}"><b>${row.estado_pago}</b></td>
                <td>${row.fecha_pago}</td>
                <td>
                    <div class="d-flex justify-content-center gap-2">
                        <button type="submit" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete2(${row.id_pago})">
                            <i class="bi bi-search"></i>
                            <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                        </button>
                        <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate2(${row.id_pago})">
                            <i class="bi bi-x-square-fill"></i>
                            <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                        </button>
                    </div>
                </td>
            </tr>`;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

const fillTable3 = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    ROWS_FOUND2.textContent = '';
    TABLE_BODY2.innerHTML = '';
    //CARD_CATEGORIAS.innerHTML = '';
    // Se verifica la acción a realizar.
    const action = (form) ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(DETALLESMENSUALIDAD_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            const statusClass = (row.estado_proximo_pago === 'Pagado') ? 'pagado' : 'pendiente';
            
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY2.innerHTML += `
            <tr>
                <td>${row.id_detalle_pago}</td>
                <td>${row.id_pago}</td>
                <td>${row.Alumno}</td>
                <td>${row.fecha_pago}</td>
                <td>$${row.mensualidad_pagar}</td>
                <td>${row.descripcion_pago}</td>
                <td>${row.fecha_proximo_pago}</td>
                <td class="${statusClass}"><b>${row.estado_proximo_pago}</b></td>
                <td>
                    <div class="d-flex justify-content-center gap-2">
                        <button type="submit" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete3(${row.id_detalle_pago})">
                            <i class="bi bi-search"></i>
                            <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                        </button>
                        <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate3(${row.id_detalle_pago})">
                            <i class="bi bi-x-square-fill"></i>
                            <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                        </button>
                        <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openReport2(${row.id_pago})">
                            <i class="bi bi-x-square-fill"></i>
                            <img src="../../resources/images/reporte_2.png" alt="" width="30px" height="30px" class="mb-1">
                        </button>
                    </div>
                </td>
            </tr>`;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

//Cards que contienen el conteo de alumnos
const fillTable4 = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    CARD_ALUMNOSTOTAL.innerHTML = '';
    // Se verifica la acción a realizar.
    const action = form ? 'searchRows' : 'readAlumnosTotal';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(MENSUALIDAD_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                CARD_ALUMNOSTOTAL.innerHTML += `
                            <div class="card-body">
                                <h1 class="card-title titulo-card">Total de alumnos registrados.</h1>
                                <p class="card-text mt-5">
                                    <h3 id="totalStudents">${row.total_alumnos_registrados}</h3>
                                    <input type="range" value="${row.total_alumnos_registrados}" max="${row.total_alumnos_registrados}" readonly class="barra-azul form-control" style="max-width: 100%;">
                                </p>
                                <div class="d-flex justify-content-start"></div>
                            </div>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

const fillTable5 = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    CARD_ALUMNOSPAGADOS.innerHTML = '';
    // Se verifica la acción a realizar.
    const action = form ? 'searchRows' : 'readAlumnosSolventes';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(MENSUALIDAD_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CARD_ALUMNOSPAGADOS.innerHTML += `
                            <div class="card-body">
                                <h1 class="card-title titulo-card">Alumnos solventes con el pago.</h1>
                                <p class="card-text mt-5">
                                    <h3 id="solventStudents">${row.total_alumnos_registradoss}</h3>
                                    <input type="range" value="${row.total_alumnos_registradoss}" max="${row.total_alumnos_registrados}" readonly class="barra-naranja form-control" style="max-width: 100%;">
                                </p>
                                <div class="d-flex justify-content-start"></div>
                            </div>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

const fillTable6 = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    CARD_ALUMNOSSINPAGAR.innerHTML = '';
    // Se verifica la acción a realizar.
    const action = form ? 'searchRows' : 'readAlumnosSinPagar';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(MENSUALIDAD_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CARD_ALUMNOSSINPAGAR.innerHTML += `
                <div class="card-body">
                    <h1 class="card-title titulo-card">Alumnos sin pagar.</h1>
                    <p class="card-text mt-5">
                        <h3 id="solventStudents">${row.total_alumnos_sin_pagar}</h3>
                        <input type="range" value="${row.total_alumnos_sin_pagar}" max="${row.total_alumnos_sin_pagar}" readonly class="barra-roja form-control" style="max-width: 100%;">
                    </p>
                    <div class="d-flex justify-content-start"></div>
                </div>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}


//Fin de las cards que tienen el conteo de alumnos

const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Registrar número de días y pago';
    // Se prepara el formulario.
    SAVE_FORM.reset();
}

const openCreate2 = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL2.show();
    MODAL_TITLE2.textContent = 'Registrar pago de mensualidad';
    // Se prepara el formulario.
    SAVE_FORM2.reset();
    fillSelect(MENSUALIDAD_API, 'readAllAlumnosCliente', 'SelectDatosPago')
}

const openCreate3 = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL3.show();
    MODAL_TITLE3.textContent = 'Registrar detalle de pago de mensualidad';
    // Se prepara el formulario.
    SAVE_FORM3.reset();
    fillSelect(DETALLESMENSUALIDAD_API, 'readAllPagos', 'idPagoRealizado')
}

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idDiasPago', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(DIAS_PAGO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar número de días y pago';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_DIA.value = ROW.id_dia_pago;
        NUMERO_DIAS.value = ROW.numero_dias;
        MENSUALIDAD_PAGAR.value = ROW.mensualidad_pagar;


    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openUpdate2 = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idPagoARealizar', id);
    COLUMNA_ESTADO.hidden = false;
    
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(MENSUALIDAD_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL2.show();
        MODAL_TITLE2.textContent = 'Actualizar registro del pago';
        // Se prepara el formulario.
        SAVE_FORM2.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ESTADO_PAGO.value = ROW.estado_pago;
        ID_PAGO.value = ROW.id_pago;
        

        

        fillSelect(MENSUALIDAD_API, 'readAllAlumnosCliente', 'SelectDatosPago', ROW.id_alumno);

    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openUpdate3 = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idDetallePagoMensualidad', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(DETALLESMENSUALIDAD_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL3.show();
        MODAL_TITLE3.textContent = 'Actualizar detalle del pago';
        // Se prepara el formulario.
        SAVE_FORM3.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;

        ID_DETALLEPAGO.value = ROW.id_detalle_pago;

        fillSelect(DETALLESMENSUALIDAD_API, 'readAllPagos', 'idPagoRealizado', ROW.id_pago);
        DESCRIPCION_PAGO.value = ROW.descripcion_pago;
        PRXIMO_PAGO.value = ROW.fecha_proximo_pago;

    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este día y pago de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idDiasPago', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(DIAS_PAGO_API, 'deleteRow', FORM);
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
    const RESPONSE = await confirmAction('¿Desea eliminar este pago de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idPagoARealizar', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(MENSUALIDAD_API, 'deleteRow', FORM);
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
    const RESPONSE = await confirmAction('¿Desea eliminar este detalle de pago de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idDetallePagoMensualidad', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(DETALLESMENSUALIDAD_API, 'deleteRow', FORM);
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

const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/pagosmensualidad.php`);

    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}

const openReport2 = (id) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/boleta_pagos.php`);
    PATH.searchParams.append('idPagoARealizar', id);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}