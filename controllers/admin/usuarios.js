const ADMINISTRADOR_API = 'services/admin/administrador.php';
const NIVELESUSUARIO_API = 'services/admin/nivelesusuario.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla.
//const TABLE_BODY = document.getElementById('tableBody'),
//ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');
    CARD_ADMINS = document.getElementById('cardsAdmins');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
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


document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    //MAIN_TITLE.textContent = 'Gestionar categorías';
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

SEARCH_FORM.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable(FORM);
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
                                <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#actualizar_admin" data-bs-dismiss="modal" onclick="openUpdate(${row.id_administrador})">
                                    <i class="bi bi-pencil-fill"></i>
                                </button>
                                <button type="button" class="btn btn-danger btn-sm" onclick="openDelete(${row.id_administrador})">
                                    <i class="bi bi-trash-fill"></i>
                                </button>
                            </div>
                            <h5 class="card-title mb-2 fs-1">${row.alias_administrador}</h5>
                            <p class="card-text">Nombre: ${row.nombre_admistrador}</p>
                            <p class="card-text">Apellido: ${row.apellido_administrador}</p>
                            <p class="card-text">Dui: ${row.dui_administrador}</p>
                            <p class="card-text">Correo: ${row.correo_administrador}</p>
                            <p class="card-text">Teléfono: ${row.telefono_administrador}</p>
                            <p class="card-text">Nivel de usuario: ${row.nivel}</p>
                            <p class="card-text">Estado: ${row.estado_adminstrador}</p>
                            <p class="card-text"><small class="text-body-secondary">Registrado desde: ${row.fecha_registro}</small></p>
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
  
  /*
  *   Función asíncrona para preparar el formulario al momento de actualizar un registro.
  *   Parámetros: id (identificador del registro seleccionado).
  *   Retorno: ninguno.
  */
  const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idAdministrador', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(ADMINISTRADOR_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar administrador';
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
        
  
        fillSelect(NIVELESUSUARIO_API, 'readAll', 'selectNivelAdmin', ROW.nivel);
        

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
  
  /*
  *   Función asíncrona para eliminar un registro.
  *   Parámetros: id (identificador del registro seleccionado).
  *   Retorno: ninguno.
  */
  const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este administrador de forma permanente?');
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
  