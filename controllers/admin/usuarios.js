const ADMINISTRADOR_API = 'services/admin/administrador.php';
const NIVELESUSUARIO_API = 'services/admin/nivelesusuario.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
const SEARCH_FORM2 = document.getElementById('searchForm2'); //Busqueda de niveles de administradores
// Constantes para establecer los elementos de la tabla de niveles de usuario.
const TABLE_BODY = document.getElementById('tableBody'),
ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
    CARD_ADMINS = document.getElementById('cardsAdmins');

    const SAVE_MODAL2 = new bootstrap.Modal('#saveModal2'),
    MODAL_TITLE2 = document.getElementById('modalTitle2');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm')
const SAVE_FORM2 = document.getElementById('saveForm2'),

    ID_ADMINISTRADOR = document.getElementById('idAdministrador'),
    NOMBRE_ADMINISTRADOR = document.getElementById('nombreAdministrador'),
    APELLIDO_ADMINISTRADOR = document.getElementById('apellidoAdministrador'),
    DUI_ADMINISTRADOR = document.getElementById('duiAdministrador'),
    CORREO_ADMINISTRADOR = document.getElementById('correoAdministrador'),
    TELEFONO_ADMINISTRADOR = document.getElementById('telefonoAdministrador'),
    ALIAS_ADMINISTRADOR = document.getElementById('aliasAdministrador'),
    CLAVE_ADMINISTRADOR = document.getElementById('claveAdministrador'),
    CONFIRMAR_CLAVE = document.getElementById('confirmarClave'),
    NIVEL_USUARIO = document.getElementById('selectNivelAdmin'),
    FOTO_ADMINISTRADOR = document.getElementById('fotoAdmin'),
    ESTADO_ADMINISTRADOR = document.getElementById('selectEstadoUsuario');

    //Constantes para los niveles de usuario
    ID_NIVEL = document.getElementById('idNivel'),
    NIVEL = document.getElementById('nombreNivel');


document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    //MAIN_TITLE.textContent = 'Gestionar categorías';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
    fillTable2();
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



  SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_ADMINISTRADOR.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ADMINISTRADOR_API, action, FORM);
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
    (ID_NIVEL.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM2);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(NIVELESUSUARIO_API, action, FORM);
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


  const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    CARD_ADMINS.innerHTML = '';
    // Se verifica la acción a realizar.
    const action = form ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(ADMINISTRADOR_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        console.log(DATA);
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CARD_ADMINS.innerHTML += `
            <div class="col-12 col-lg-12 col-md-12 col-sm-12 mx-auto mb-4">
            <div class="card h-100">
                <div class="row g-0">
                    <div class="col-md-4 d-flex align-items-center justify-content-center">
                        <img src="${SERVER_URL}images/administradores/${row.foto_administrador}" class="rounded-circle">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button type="button" class="btn btn-sm" onclick="openUpdate(${row.id_administrador}, '${row.nombre_admistrador} ${row.apellido_administrador}')" title="Actualizar datos del administrador ${row.nombre_admistrador} ${row.apellido_administrador}">
                                     <img src="../../resources/images/btnActualizarIMG.png" alt="" width="40px" height="40px" class="mb-1">
                                </button>
                                <button type="button" class="btn btn-sm" onclick="openDelete(${row.id_administrador} , '${row.nombre_admistrador} ${row.apellido_administrador}')" title="Eliminar datos del administrador ${row.nombre_admistrador} ${row.apellido_administrador}">
                                    <img src="../../resources/images/btnEliminarIMG.png" alt="" width="40px" height="40px" class="mb-1">
                                </button>
                                <button type="button" class="btn btn-sm" onclick="openReport2(${row.id_administrador}, '${row.nombre_admistrador} ${row.apellido_administrador}')" title="Generar reporte de productos registrador por el administrador ${row.nombre_admistrador} ${row.apellido_administrador}">
                                    <img src="../../resources/images/reporteee.png" alt="" width="20px" height="25px" class="mb-1">
                                </button>
                            </div>
                            <h5 class="card-title text-dark mb-5 fs-1"><b>${row.alias_administrador}</b></h5>
                            <p class="card-text">Nombre: ${row.nombre_admistrador}</p>
                            <p class="card-text">Apellido: ${row.apellido_administrador}</p>
                            <p class="card-text">Dui: ${row.dui_administrador}</p>
                            <p class="card-text">Correo: ${row.correo_administrador}</p>
                            <p class="card-text">Teléfono: ${row.telefono_administrador}</p>
                            <p class="card-text">Nivel de usuario: ${row.nivel}</p>
                            <p class="card-text">Estado: ${row.estado_adminstrador}</p>
                            <p class="card-text"><small class="text-body-secondary">Registrado desde: ${row.fecha_registro}</small></p>
                            <p class="card-text"><small class="text-body-secondary">Última sesión: ${row.ultima_sesion}</small></p>
                            
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

const fillTable2 = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    TABLE_BODY.innerHTML = '';
    ROWS_FOUND.innerHTML = '';
    // Se verifica la acción a realizar.
    const action = form ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA2 = await fetchData(NIVELESUSUARIO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA2.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA2.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
            <td>${row.id_nivel}</td>
            <td>${row.nivel}</td>
            <td><button type="button" class="btn btn-sm" onclick="openUpdate2(${row.id_nivel}, '${row.nivel}')" title="Actualizar nivel de usuario ${row.nivel}">
                                     <img src="../../resources/images/btnActualizarIMG.png" alt="" width="40px" height="40px" class="mb-1">
                                </button>
                                <button type="button" class="btn btn-sm" onclick="openDelete2(${row.id_nivel} , '${row.nivel}')"  title="Eliminar nivel de usuario ${row.nivel}">
                                    <img src="../../resources/images/btnEliminarIMG.png" alt="" width="40px" height="40px" class="mb-1">
                                </button></td>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}


  const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear nuevo administrador';
    // Se prepara el formulario.
    SAVE_FORM.reset();
  
    fillSelect(NIVELESUSUARIO_API, 'readAll', 'selectNivelAdmin');

    ID_ADMINISTRADOR.readOnly = false;
    NOMBRE_ADMINISTRADOR.readOnly = false;
    APELLIDO_ADMINISTRADOR.readOnly = false;
    DUI_ADMINISTRADOR.readOnly = false;
    CORREO_ADMINISTRADOR.readOnly = false;
    TELEFONO_ADMINISTRADOR.readOnly = false;
    ALIAS_ADMINISTRADOR.readOnly = false;
    CLAVE_ADMINISTRADOR.readOnly = false;
  }



  const openCreate2 = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL2.show();
    MODAL_TITLE2.textContent = 'Crear nuevo nivel de administrador';
    // Se prepara el formulario.
    SAVE_FORM2.reset();
  }


  
  /*
  *   Función asíncrona para preparar el formulario al momento de actualizar un registro.
  *   Parámetros: id (identificador del registro seleccionado).
  *   Retorno: ninguno.
  */
  const openUpdate = async (id, nombre) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idAdministrador', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ADMINISTRADOR_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar administrador ' + nombre;
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_ADMINISTRADOR.value = ROW.id_administrador;
        NOMBRE_ADMINISTRADOR.value = ROW.nombre_admistrador;
        APELLIDO_ADMINISTRADOR.value = ROW.apellido_administrador;
        DUI_ADMINISTRADOR.value = ROW.dui_administrador;
        CORREO_ADMINISTRADOR.value = ROW.correo_administrador;
        TELEFONO_ADMINISTRADOR.value = ROW.telefono_administrador;
        ALIAS_ADMINISTRADOR.value = ROW.alias_administrador;
        CLAVE_ADMINISTRADOR.value = ROW.clave_administrador;
        CONFIRMAR_CLAVE.value = ROW.clave_administrador;
        
  
        fillSelect(NIVELESUSUARIO_API, 'readAll', 'selectNivelAdmin', ROW.id_nivel);
        

        ID_ADMINISTRADOR.readOnly = true;
        NOMBRE_ADMINISTRADOR.readOnly = true;
        APELLIDO_ADMINISTRADOR.readOnly = true;
        DUI_ADMINISTRADOR.readOnly = true;
        CORREO_ADMINISTRADOR.readOnly = true;
        TELEFONO_ADMINISTRADOR.readOnly = true;
        ALIAS_ADMINISTRADOR.readOnly = true;
        CLAVE_ADMINISTRADOR.readOnly = true;
        CONFIRMAR_CLAVE.readOnly = true;
        
    } else {
        sweetAlert(2, DATA.error, false);
    }
  }

  const openUpdate2 = async (id, nombre) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idNivel', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(NIVELESUSUARIO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL2.show();
        MODAL_TITLE2.textContent = 'Actualizar nivel de usuario ' + nombre;
        // Se prepara el formulario.
        SAVE_FORM2.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_NIVEL.value = ROW.id_nivel;
        NIVEL.value = ROW.nivel;
        
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
    const RESPONSE = await confirmAction('¿Desea eliminar este administrador: ' +nombre+ ', de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idAdministrador', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(ADMINISTRADOR_API, 'deleteRow', FORM);
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
    const RESPONSE = await confirmAction('¿Desea eliminar este nivel de administrador: ' +nombre+ ', de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idNivel', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(NIVELESUSUARIO_API, 'deleteRow', FORM);
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
    const PATH = new URL(`${SERVER_URL}reports/admin/administradores.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}

const openReport2 = (id) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/administrador_productos.php`);

    PATH.searchParams.append('idAdministrador', id)
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}
  
  