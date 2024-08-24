// Constante para completar la ruta de la API.
const STAFF_API = 'services/admin/staff.php';
const STAFFCATEGORIA_API = 'services/admin/categoriastaff.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
const SEARCH_FORM2 = document.getElementById('searchForm2');
// Constantes para establecer los elementos de la tabla.
//const TABLE_BODY = document.getElementById('tableBody'),
//ROWS_FOUND = document.getElementById('rowsFound');

CARD_STAFF = document.getElementById('CardStaff');
CARD_STAFFCATEGORIA = document.getElementById('cardsStaffCategorias');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

const SAVE_MODAL2 = new bootstrap.Modal('#saveModal2'),
    MODAL_TITLE2 = document.getElementById('modalTitle2');
// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm'),
    ID_STAFF = document.getElementById('idStaff'),
    NOMBRE_STAFF = document.getElementById('nombreStaff'),
    APELLIDO_STAFF = document.getElementById('apellidoStaff'),
    DESCRIPCION_STAFF = document.getElementById('descripcionStaff'),
    IMAGEN_STAFF = document.getElementById('imagenStaff');

const SAVE_FORM2 = document.getElementById('saveForm2'),
    ID_STAFFCATEGORIA = document.getElementById('idStaffCategoria'),
    ID_STAFFF = document.getElementById('idStaffAsignar'),
    ID_CATEGORIA = document.getElementById('idCategoriaAsignar');


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
    event.preventDefault();
    const FORM = new FormData(SEARCH_FORM);
    fillTable(FORM);
});

SEARCH_FORM2.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM2 = new FormData(SEARCH_FORM2);
    fillTable2(FORM2);
});

SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_STAFF.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(STAFF_API, action, FORM);
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
    (ID_STAFFCATEGORIA.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM2);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(STAFFCATEGORIA_API, action, FORM);
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

const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Agregar staff';
    // Se prepara el formulario.
    SAVE_FORM.reset();
}

const openCreate2 = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL2.show();
    MODAL_TITLE2.textContent = 'Asignar staff y categoría';
    // Se prepara el formulario.
    SAVE_FORM2.reset();
    fillSelect(STAFFCATEGORIA_API, 'readAllStaffs', 'idStaffAsignar');
    fillSelect(STAFFCATEGORIA_API, 'readAllCategoriasHorarios', 'idCategoriaAsignar');
}

const fillTable = async (form = null) => {
    // Inicializa el contenido de las cards.
    CARD_STAFF.innerHTML = '';
    // Verifica la acción a realizar.
    const action = (form) ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(STAFF_API, action, form);
    // Comprueba si la respuesta es satisfactoria, de lo contrario muestra un mensaje con la excepción.
    if (DATA.status) {
        // Recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Crea y concatena las cards con los datos de cada registro.
            CARD_STAFF.innerHTML += `
                <div class="col">
                    <div class="card mb-3">
                        <img src="${SERVER_URL}images/staff/${row.imagen_staff}" class="card-img-top width="255px" height="375px"">
                        <div class="card-body text-start">
                            <h5 class="card-title fs-2 mb-2">${row.id_staff}</h5>
                            <p class="card-text"><b>Nombre completo: </b>${row.nombre_completo} </p>
                            <p class="card-text"><b>Descripción: </b> ${row.descripcion_extra}</p>
                            
                            <div class="d-flex justify-content-center gap-1">
                            <button type="submit" class="btn" id="btnEliminar" name="btnEliminar" onclick="openDelete(${row.id_staff})">
                            
                            <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                            </button>
                            <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate(${row.id_staff})">
                            
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

const fillTable2 = async (form = null) => {
    // Inicializa el contenido de las cards.
    CARD_STAFFCATEGORIA.innerHTML = '';
    // Verifica la acción a realizar.
    const action = (form) ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(STAFFCATEGORIA_API, action, form);
    // Comprueba si la respuesta es satisfactoria, de lo contrario muestra un mensaje con la excepción.
    if (DATA.status) {
        // Recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Crea y concatena las cards con los datos de cada registro.
            CARD_STAFFCATEGORIA.innerHTML += `
                <div class="col">
                  <div class="card mb-3">
                    <div class="row g-0"> <!-- Utilizar la clase 'row' de Bootstrap para crear una fila -->
                      <div class="col-lg-6">
                      <img src="${SERVER_URL}images/staff/${row.imagen_staff}" class="card-img-top img-fluid same-height" height="280px" width="190px">
                       </div>
                         <div class="col-lg-6">
                         <img src="${SERVER_URL}images/alumnos_categorias/${row.imagen_categoria}" class="card-img-top img-fluid same-height">
                         </div>
                        </div>
        <div class="card-body text-start">
            <h5 class="card-title fs-2 mb-2">ID: ${row.id_staff_categorias}</h5>
            <p class="card-text"><b>Categoría: </b> ${row.categoria}</p>
            <p class="card-text"><b>Encargado de la categoría: </b>${row.nombre_completo}</p>
            
            <div class="d-flex justify-content-center gap-1">
                <button type="submit" class="btn" id="btnEliminar" name="btnEliminar" onclick="openDelete2(${row.id_staff_categorias})">
                    <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                </button>
                <button type="reset" class="btn mt-1" id="btnActualizar" name="btnActualizar" onclick="openUpdate2(${row.id_staff_categorias})">
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

const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idStaff', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(STAFF_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar datos';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_STAFF.value = ROW.id_staff;
        NOMBRE_STAFF.value = ROW.nombre_staff;
        APELLIDO_STAFF.value = ROW.apellido_staff;
        DESCRIPCION_STAFF.value = ROW.descripcion_extra;
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
    const RESPONSE = await confirmAction('¿Desea eliminar este dato de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idStaff', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(STAFF_API, 'deleteRow', FORM);
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

const openUpdate2 = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idStaffCategoria', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(STAFFCATEGORIA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL2.show();
        MODAL_TITLE2.textContent = 'Actualizar datos';
        // Se prepara el formulario.
        SAVE_FORM2.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_STAFFCATEGORIA.value = ROW.id_staff_categorias;
        fillSelect(STAFFCATEGORIA_API, 'readAllStaffs', 'idStaffAsignar', ROW.id_staff);
        fillSelect(STAFFCATEGORIA_API, 'readAllCategoriasHorarios', 'idCategoriaAsignar', ROW.id_categoria_horario);
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

/*
*   Función asíncrona para eliminar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openDelete2 = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este dato de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idStaffCategoria', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(STAFFCATEGORIA_API, 'deleteRow', FORM);
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
    const PATH = new URL(`${SERVER_URL}reports/admin/staff.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}