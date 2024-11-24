// Constante para completar la ruta de la API.
const DIAS_PAGO_API = 'services/admin/diasentreno.php';
const MENSUALIDAD_API = 'services/admin/pagosmensualidad.php';
const DETALLESMENSUALIDAD_API = 'services/admin/detallemensualidad.php';
const DMETODOSPAGO_API = 'services/admin/metodospagos.php';
const DIAS_PAGO_API2 = 'http://localhost/AcademiaBP_EXPO/api/services/admin/diasentreno.php';

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

const SAVE_MODAL4 = new bootstrap.Modal('#modalOptions');
const SAVE_MODAL5 = new bootstrap.Modal('#modalEnviarFechaEspecifica');
const SAVE_MODAL6 = new bootstrap.Modal('#modalEnviarFechaMesAnio')

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_DIA = document.getElementById('idDiasPago'),
    NUMERO_DIAS = document.getElementById('numeroDias'),
    MENSUALIDAD_PAGAR = document.getElementById('precioDia');

const SAVE_FORM2 = document.getElementById('saveForm2'),
    ID_PAGO = document.getElementById('idPagoARealizar'),
    DATOS_PAGO = document.getElementById('idPago'),
    CUOTAS_A_PAGAR = document.getElementById('cuotasApagar'),
    ESTADO_PAGO = document.getElementById('selectEstado');
COLUMNA_ESTADO = document.getElementById('columnaEstado');

const SAVE_FORM3 = document.getElementById('saveForm3'),
    ID_DETALLEPAGO = document.getElementById('idDetallePagoMensualidad'),
    PAGO_RALIZADO = document.getElementById('idPagoRealizado'),
    DESCRIPCION_PAGO = document.getElementById('descripcionPago'),
    PRXIMO_PAGO = document.getElementById('proximoPago');

const CARD_METODOS = document.getElementById('cardsMetodos');

const MODAL_METODOS = document.getElementById('metodosForm');
const INFORMACION_PAGO = document.getElementById('datosPago');
const NOMBRE_METODO = document.getElementById('nombreMetodo');

let currentMethod = 'readAll';
let currentMethod2 = 'readAll';

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

    document.getElementById('toggleViewBtn').addEventListener('click', () => {
        if (currentMethod === 'readAll') {
            currentMethod = 'readAll5';
            document.getElementById('toggleViewBtn').textContent = 'Ver pagos del mes actual';
        }
        else if (currentMethod === 'readAll5') {
            currentMethod = 'readAll2';
            document.getElementById('toggleViewBtn').textContent = 'Ver pagos del mes anterior';
        }
        else if (currentMethod === 'readAll2') {
            currentMethod = 'readAll3';
            document.getElementById('toggleViewBtn').textContent = 'Ver pagos antiguos';
        }
        else {
            currentMethod = 'readAll';
            document.getElementById('toggleViewBtn').textContent = 'Ver pagos recientes';
        }
        fillTable2();
    })

    document.getElementById('toggleViewBtn2').addEventListener('click', () => {
        if (currentMethod2 === 'readAll') {
            currentMethod2 = 'readAllRecientes';
            document.getElementById('toggleViewBtn2').textContent = 'Ver pagos cancelados';
        }
        else if (currentMethod2 === 'readAllRecientes') {
            currentMethod2 = 'readAllPagadas';
            document.getElementById('toggleViewBtn2').textContent = 'Ver pagos no cancelados';
        }
        else if (currentMethod2 === 'readAllPagadas') {
            currentMethod2 = 'readAllNoPagadas';
            document.getElementById('toggleViewBtn2').textContent = 'Ver pagos antiguos';
        }
        else {
            currentMethod2 = 'readAll';
            document.getElementById('toggleViewBtn2').textContent = 'Ver pagos recientes';
        }
        fillTable3();
    })

});

document.getElementById('fechaPago').addEventListener('change', function () {
    fillTable2(); // Llama a fillTable al cambiar la fecha
});

document.getElementById('fechaProximoPago').addEventListener('change', function () {
    fillTable3(); // Llama a fillTable al cambiar la fecha
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

    const RESPONSE = await confirmAction('¿Está seguro de finalizar el pago?');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (RESPONSE) {
        (ID_PAGO.value) ? action = 'updateRow' : action = 'createRow';
        // Constante tipo objeto con los datos del formulario.
        const FORM = new FormData(SAVE_FORM2);
        // Petición para guardar los datos del formulario.
        const DATA = await fetchData(MENSUALIDAD_API, action, FORM);
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
                            <button type="button" class="btnr mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_dia_pago}, '${row.datopago}')" title="Eliminar número de día y mensualidad ${row.datopago}">
                                <img src="../../resources/images/btnEliminarIMG.png" alt="Eliminar" width="30px" height="30px" class="mb-1">
                            </button>
                            <button type="button" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_dia_pago}, '${row.datopago}')" title="Actualizar número de día y mensualidad ${row.datopago}">
                                <img src="../../resources/images/btnActualizarIMG.png" alt="Actualizar" width="30px" height="30px" class="mb-1">
                            </button>
                            <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="generarGrafico(${row.id_dia_pago}, '${row.datopago}')" title="Generar gráfico de números de alumnos por categoría en día de pago y mensualidad ${row.datopago}">
                                <i class="bi bi-x-square-fill"></i>
                                    <img src="../../resources/images/graph.png" alt="" width="25px" height="25px" class="mb-1">
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



    // Verificar si el input de fecha tiene un valor.
    const fechaPago = document.getElementById('fechaPago').value;
    let action;


    if (fechaPago) {
        // Si hay una fecha seleccionada, usar 'readAll3' para filtrar por fecha.
        action = 'readAll4';
        form = new FormData();  // Crear un nuevo FormData si no existe uno
        form.append('fechaPago', fechaPago);
    }

    else {
        action = (form) ? 'searchRows' : currentMethod;
    }

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
                <td>${row.nombre_metodo}</td>
                <td>${row.cuotas_anuales}</td>
                <td>${row.cuotas_pendientes}</td>
                <td class="${statusClass}"><b>${row.estado_pago}</b></td>
                <td>${row.fecha_pago}</td>
                <td>
                    <div class="d-flex justify-content-center gap-2">
                        <button type="submit" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete2(${row.id_pago})" title="Eliminar pago de mensualidad de ${row.Alumno}">
                            <i class="bi bi-search"></i>
                            <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                        </button>
                        <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate2(${row.id_pago})" title="Actualizar pago de mensualidad de ${row.Alumno}">
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


    const fechaProximoPago = document.getElementById('fechaProximoPago').value;
    let action;

    if (fechaProximoPago) {
        // Si hay una fecha seleccionada, usar 'readAll3' para filtrar por fecha.
        action = 'readAllFecha';
        form = new FormData();  // Crear un nuevo FormData si no existe uno
        form.append('fechaProximoPago', fechaProximoPago);
    } else {
        // Si no hay fecha seleccionada, usar la acción según la lógica previa.
        action = (form) ? 'searchRows' : currentMethod2;
    }

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
                        <button type="submit" class="btn mt-1" id="btnEliminar" name="btnEliminar" onclick="openDelete3(${row.id_detalle_pago})" title="Eliminar boleta de pago de ${row.Alumno}">
                            <i class="bi bi-search"></i>
                            <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                        </button>
                        <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate3(${row.id_detalle_pago})" title="Actualizar boleta de pago de ${row.Alumno}">
                            <i class="bi bi-x-square-fill"></i>
                            <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                        </button>
                        <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openReport5(${row.id_pago})" title="Generar boleta de pago de ${row.Alumno}">
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

const fillTable7 = async (form = null) => {
    // Inicializa el contenido de las cards.
    CARD_METODOS.innerHTML = '';
    // Verifica la acción a realizar.
    const action = (form) ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(DMETODOSPAGO_API, action, form);
    // Comprueba si la respuesta es satisfactoria, de lo contrario muestra un mensaje con la excepción.
    if (DATA.status) {
        // Recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Crea y concatena las cards con los datos de cada registro.
            CARD_METODOS.innerHTML += `
                <div class="col-12 col-md-12 col-lg-6 mt-3 mb-3 mx-auto" >
                    <div class="card h-100" data-id-metodo="${row.id_metodo_pago}">
                        <div class="row mb-5 mt-2 mx-auto" onclick="seleccionarMetodoPago(${row.id_metodo_pago}, '${row.nombre_metodo}')">
                            <div class="col-3">
                                <div class="mt-4"><img src="${SERVER_URL}images/metodospagos/${row.imagen_metodo}" class="card-img-top"></div>
                            </div>
                            <div class="col-8 mt-3">
                                <div class="card-body text-start">
                                    <h5 class="card-title fs-2 mb-2"> ${row.nombre_metodo}</h5>
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
    fillSelect(MENSUALIDAD_API, 'readAllAlumnosCliente', 'idPago');
    fillTable7();
    mostrarInputs();
}

const openCreate3 = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL3.show();
    MODAL_TITLE3.textContent = 'Registrar detalle de pago de mensualidad';
    // Se prepara el formulario.
    SAVE_FORM3.reset();
    fillSelect(DETALLESMENSUALIDAD_API, 'readAllPagos', 'idPagoRealizado')
}

const openUpdate = async (id, nombre) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idDiasPago', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(DIAS_PAGO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar número de días y pago: ' + nombre;
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

        fillSelect(MENSUALIDAD_API, 'readAllAlumnosCliente', 'idPago', ROW.id_alumno_categoria);
        document.getElementById('datosdelpago').style.display = 'none';
        document.getElementById('nombredelmetodo').style.display = 'none';
        
        mostrarInputs()
        document.getElementById('botonFinalizar').style.display = 'block';

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

const openDelete = async (id, nombre) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este día y pago: ' + nombre + ', de forma permanente?');
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
    const RESPONSE = await confirmAction('¿Desea eliminar esta boleta de pago de forma permanente?');
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

//Función para mostrar una modal para escoger el tipo de reporte de pagos a generar
const openModalOptions = () => {
    SAVE_MODAL4.show();
}

const openModalFechaEspecifica = () => {
    SAVE_MODAL4.hide();
    SAVE_MODAL5.show();
}

const openModalFechaMesAnio = () => {
    SAVE_MODAL4.hide();
    SAVE_MODAL6.show();
}
// Reportes de pagos
const generateReport = () => {
    // Obtén el valor del campo de fecha
    const fecha = document.getElementById('fechaEspecifica').value;

    // Verifica si se seleccionó una fecha
    if (!fecha) {
        alert('Por favor, selecciona una fecha antes de generar el reporte.');
        return;
    }

    // Llama a la función openReport con la fecha seleccionada
    openReport(fecha, 'fechaEspecifica');
};

const generateReport2 = () => {
    // Obtén el valor del campo de fecha
    const fechamesanio = document.getElementById('fechaMesAnio').value;

    // Verifica si se seleccionó una fecha
    if (!fechamesanio) {
        alert('Por favor, selecciona una fecha antes de generar el reporte.');
        return;
    }

    const fechamesanioFormatted = fechamesanio.substring(0, 7);

    // Llama a la función openReport con el parámetro correcto
    openReport(fechamesanioFormatted, 'fechaMesAnio');
};

// Función para abrir el reporte con el parámetro correcto
//Ahora la función recibirá dos parámetros:

//1- el valor del campo (Que será para filtrar la información para el reporte)
//2- el nombre del campo de donde provendrá el valor.
const openReport = (value, paramName) => {
    const PATH = new URL(`${SERVER_URL}reports/admin/pagosmensualidad.php?${paramName}=${value}`);
    window.open(PATH.href);
};



//Boleta de pago
const openReport5 = (id) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/boleta_pagos.php`);
    PATH.searchParams.append('idPagoARealizar', id);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}

//Gráfico parametrizado para mostrar las 5 categorías de alumnos con más alumnos registrados a partir del id_dia_pago seleccionado
const generarGrafico = async (idDiasPago) => {
    // Obtén el contenedor donde se mostrará el gráfico, que es justo debajo de las cards de las categorías de alumnos
    const container = CARD_DIASPAGOS;

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
        const response = await fetch(DIAS_PAGO_API2 + '?action=readDiasCategsAlumnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idDiasPago }) //Aquí mandamos el parámetro a la capa de servicios
        });

        const DATA = await response.json();
        console.log(DATA);

        if (DATA.status) {
            // Declaramos arreglos para almacenar los datos del gráfico
            let categorias = [];
            let total = [];

            DATA.dataset.forEach(row => {
                categorias.push(row.categoria);
                total.push(row.total_alumnos);
            });

            // Llama a la función para generar el gráfico de pastel
            pieGraph('chartCanvas', categorias, total, 'Las 5 categorías con más alumnos registrados por día de pago');


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