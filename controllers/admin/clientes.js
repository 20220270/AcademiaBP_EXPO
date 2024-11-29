const CLIENTES_API = 'services/admin/clientes.php';
const COMPRA_API = 'services/admin/compras.php';
const CLIENTES_API2 = 'http://localhost/AcademiaBP_EXPO/api/services/admin/clientes.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla de niveles de usuario.
const TABLE_BODY = document.getElementById('tableBody'),
    ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

const SAVE_MODAL2 = new bootstrap.Modal('#saveModal2'),
    MODAL_TITLE2 = document.getElementById('modalTitle2');

const CARD_CLIENTES = document.getElementById('clientestotal');
const CARD_CLIENTESACTIVOS = document.getElementById('clientesActivos');
const CARD_CLIENTESINACTIVOS = document.getElementById('clientesInactivos');
const CARDS_ALUMNOS = document.getElementById('cardsAlumnos');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm')
const SAVE_FORM2 = document.getElementById('formAlumnos')
const CLIENTECOMPRA_FORM = document.getElementById('formClientes')

ID_CLIENTE = document.getElementById('idCliente'),
    NOMBRE_CLIENTE = document.getElementById('nombreCliente'),
    APELLIDO_CLIENTE = document.getElementById('apellidoCliente'),
    DUI_CLIENTE = document.getElementById('duiCliente'),
    CORREO_CLIENTE = document.getElementById('correoClientes'),
    TELEFONO_CLIENTE = document.getElementById('telefonoCliente'),
    DIRECCION_CLIENTE = document.getElementById('direccionCliente'),
    CLAVE_CLIENTE = document.getElementById('claveCliente'),
    CONFIRMAR_CLAVE = document.getElementById('confirmarClave'),
    FOTO_CLIENTE = document.getElementById('fotoCliente'),
    ESTADO_CLIENTE = document.getElementById('selectEstado');

let currentMethod = 'readAll';

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

    // Configuración del botón para alternar entre vistas
    document.getElementById('toggleViewBtn').addEventListener('click', () => {
        // Alterna entre los métodos
        if (currentMethod === 'readAll') {
            currentMethod = 'clientesRecientes';
            document.getElementById('toggleViewBtn').textContent = 'Ver clientes activos';
        }
        else if (currentMethod === 'clientesRecientes') {
            currentMethod = 'clientesActivos';
            document.getElementById('toggleViewBtn').textContent = 'Ver clientes inactivos';
        }
        else if (currentMethod === 'clientesActivos') {
            currentMethod = 'clientesInactivos';
            document.getElementById('toggleViewBtn').textContent = 'Ver clientes antiguos';
        }

        else if (currentMethod === 'clientesInactivos') {
            currentMethod = 'readAll';
            document.getElementById('toggleViewBtn').textContent = 'Ver clientes recientes';
        }
        else {
            currentMethod = 'readAll';
            document.getElementById('toggleViewBtn').textContent = 'Ver clientes recientes';
        }
        fillTable(); // Recarga la tabla con la vista seleccionada
    });

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
    (ID_CLIENTE.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CLIENTES_API, action, FORM);
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
    // Inicializa el contenido de la tabla.
    TABLE_BODY.innerHTML = '';
    ROWS_FOUND.innerHTML = '';
    // Verifica la acción a realizar.
    const action = form ? 'searchRows' : currentMethod;
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(CLIENTES_API, action, form);
    // Comprueba si la respuesta es satisfactoria; de lo contrario, muestra un mensaje de error.
    if (DATA.status) {
        // Recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Crea y concatena las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
            <tr>
                
                <td class="d-none" id="idclien">${row.id_cliente}</td>
                <td><img src="${SERVER_URL}images/clientes/${row.foto_cliente}" class="card-img-top rounded-circle"></td>
                <td>${row.nombre_completo}</td>
                <td>${row.dui_cliente}</td>
                <td>${row.correo_cliente}</td>
                <td>${row.telefono_cliente}</td>
                <td>${row.direccion_cliente}</td>
                <td>${row.fecha_registro}</td>
                <td>${row.estado_cliente}</td>
                <td>
                    <button type="button" class="btn btn-sm" onclick="openUpdate(${row.id_cliente}, '${row.nombre_completo}')"  title="Actualizar cliente ${row.nombre_completo}">
                        <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                    </button>
                    <button type="button" class="btn btn-sm" onclick="openDelete(${row.id_cliente}, '${row.nombre_completo}')"  title="Eliminar cliente ${row.nombre_completo}">
                        <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                    </button>
                    <button type="button" class="btn btn-sm" onclick="openGraph(${row.id_cliente}, this)"  title="Generar gráfico de compras del cliente ${row.nombre_completo}">
                        <img src="../../resources/images/graph.png" alt="" width="20px" height="20px" class="mb-1">
                    </button>
                    <button type="button" class="btn btn-sm" onclick="iniciarCompra(${row.id_cliente}, this)"  title="Iniciar compra para el cliente ${row.nombre_completo}">
                        <img src="../../resources/images/iniciarcompra.png" alt="" width="25px" height="25px" class="mb-1">
                    </button>
                    <button type="button" class="btn btn-sm" onclick="fillTable5(${row.id_cliente}, '${row.nombre_completo}')"  title="Ver alumnos a cargo de ${row.nombre_completo}">
                        <img src="../../resources/images/nosotros.negro.png" alt="" width="25px" height="25px" class="mb-1">
                    </button>
                </td>
                <td id="chartColumn-${row.id_cliente}"></td>
            </tr>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Total de clientes
const fillTable2 = async (form = null) => {
    const CARD_TOTAL = document.getElementById("clientestotal");
    CARD_TOTAL.innerHTML = '';
    const action = form ? 'searchRows' : 'clientesTotal';
    const DATA = await fetchData(CLIENTES_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CARD_TOTAL.innerHTML += `
                <div class="card-body text-center">
                    <h1 class="card-title titulo-card">Total de clientes registrados</h1>
                    <h3 class="card-text mt-5">${row.TotalClientes}</h3>
                </div>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Clientes activos
const fillTable3 = async (form = null) => {
    const CARD_ACTIVOS = document.getElementById("clientesActivos");
    CARD_ACTIVOS.innerHTML = '';
    const action = form ? 'searchRows' : 'clientesTotalActivos';
    const DATA = await fetchData(CLIENTES_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CARD_ACTIVOS.innerHTML += `
                <div class="card-body text-center">
                    <h1 class="card-title titulo-card">Total de clientes activos</h1>
                    <div class="d-flex justify-content-center align-items-center mt-5">
                        <h3 class="card-text me-3">${row.TotalClientes}</h3>
                    </div>
                </div>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Clientes inactivos
const fillTable4 = async (form = null) => {
    const CARD_INACTIVOS = document.getElementById("clientesInactivos");
    CARD_INACTIVOS.innerHTML = '';
    const action = form ? 'searchRows' : 'clientesTotalInactivos';
    const DATA = await fetchData(CLIENTES_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            CARD_INACTIVOS.innerHTML += `
                <div class="card-body text-center">
                    <h1 class="card-title titulo-card">Total de clientes inactivos</h1>
                    <div class="d-flex justify-content-center align-items-center mt-5 ">
                        <h3 class="card-text me-3">${row.TotalClientes}</h3>
                    </div>
                </div>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

const fillTable5 = async (id, nombre) => {
    CARDS_ALUMNOS.innerHTML = '';

    const FORM = new FormData();
    FORM.append('idCliente', id);

    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(CLIENTES_API, 'readAlumnos2', FORM);

    // Comprueba si la respuesta es satisfactoria; de lo contrario, muestra un mensaje de error.
    if (DATA.status) {
        // Recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Crea y concatena las filas de la tabla con los datos de cada registro.
            CARDS_ALUMNOS.innerHTML += `
            <div class="card mb-4 mt-4" id="borderAlumnos">
    <div class="card-body">
        <div class="row align-items-center">
            <!-- Columna para la imagen -->
            <div class="col-md-4 text-center">
                <img src="${SERVER_URL}images/alumnos/${row.foto_alumno}" class="rounded-circle mb-4 mx-auto" height="80px" width="80px">
            </div>
            <!-- Columna para la información -->
            <div class="col-md-8">
                <input id="SelectDatosPago-${row.id_alumno}" type="text" name="SelectDatosPago" class="form-control" value="${row.id_alumno}" hidden>
                <p class="card-text"><b>Nombre del alumno: </b>${row.nombre}</p>
                <p class="card-text"><b>Edad: </b>${row.edad} años</p>
                <p class="card-text"><b>Categoría(s): </b>${row.categoria}</p>
            </div>
        </div>
    </div>
</div>

            `;
        });
        SAVE_MODAL2.show();
        MODAL_TITLE2.textContent = 'Alumnos a cargo de ' + nombre;

    } else {
        sweetAlert(4, DATA.error, true);
    }

}


const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear cliente';
    // Se prepara el formulario.
    SAVE_FORM.reset();
}

const openUpdate = async (id, nombre) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCliente', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CLIENTES_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar cliente ' + nombre;
        // Se prepara el formulario.
        SAVE_FORM.reset();
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_CLIENTE.value = ROW.id_cliente;
        NOMBRE_CLIENTE.value = ROW.nombre_cliente;
        APELLIDO_CLIENTE.value = ROW.apellido_cliente;
        DUI_CLIENTE.value = ROW.dui_cliente;
        CORREO_CLIENTE.value = ROW.correo_cliente;
        TELEFONO_CLIENTE.value = ROW.telefono_cliente;
        DIRECCION_CLIENTE.value = ROW.direccion_cliente;
        CLAVE_CLIENTE.value = ROW.clave_cliente;
        CONFIRMAR_CLAVE.value = ROW.clave_cliente;
        ESTADO_CLIENTE.value = ROW.estado_cliente;


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
    const RESPONSE = await confirmAction('¿Desea eliminar este cliente: ' + nombre + ' de forma permanente?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('idCliente', id);
        // Petición para eliminar el registro seleccionado.
        const DATA = await fetchData(CLIENTES_API, 'deleteRow', FORM);
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

const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/clientes.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}

async function iniciarCompra(idcliente) {
    // Mostrar un mensaje de confirmación y capturar la respuesta
    const RESPONSE = await confirmAction('¿Está seguro de iniciar una compra?');

    // Verificar la respuesta del mensaje
    if (RESPONSE) {
        // Constante tipo objeto con los datos del formulario
        const FORM = new FormData(CLIENTECOMPRA_FORM);
        // Añadir el ID del alumno al formulario
        FORM.append('idclien', idcliente);

        // Petición para iniciar la compra
        const DATA = await fetchData(COMPRA_API, 'startOrder3', FORM);

        // Comprobar si la respuesta es satisfactoria, de lo contrario mostrar un mensaje con la excepción
        if (DATA.status) {
            sweetAlert(1, DATA.message, true);
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

//Método para generar el gráfico de los productos más comprados por un cliente seleccionado
//El parámetro a enviar es el id del cliente, guardado en la variable idCliente

//Es importante mencionar que este método no se ejecutará al cargar la página, sino al especificar un cliente. Por ende, no se envía en el DOMContentLoaded
const openGraph = async (idCliente) => {
    // Obtiene la celda de la tabla donde se mostrará el gráfico.
    const chartCell = document.getElementById(`chartColumn-${idCliente}`);

    // Verifica si ya hay un gráfico en la celda
    const existingCanvas = document.getElementById(`chartCanvas-${idCliente}`);

    if (existingCanvas) {
        // Si el gráfico ya está en la celda, alterna su visibilidad
        if (existingCanvas.style.display === 'none' || existingCanvas.style.display === '') {
            existingCanvas.style.display = 'block'; // Muestra el gráfico si está oculto
        } else {
            existingCanvas.style.display = 'none'; // Oculta el gráfico si está visible
        }
        return; // Salimos de la función ya que el gráfico ya existe
    }

    // Crea el elemento canvas para el gráfico con un tamaño reducido.
    const canvas = document.createElement('canvas');
    canvas.id = `chartCanvas-${idCliente}`; // Le asignamos un ID
    canvas.style.width = '200px';  // Ajusta el ancho
    canvas.style.height = '200px'; // Ajusta la altura
    canvas.style.display = 'block'; // Asegúrate de que el canvas esté visible inicialmente
    chartCell.appendChild(canvas); // Agregamos el elemento canvas a chartCell

    try {
        // Realiza la solicitud a la API para obtener los datos del gráfico.
        const response = await fetch(CLIENTES_API2 + '?action=readClientesComprasGraph', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idCliente }) // Enviamos el parámetro a la API
        });

        const DATA = await response.json();

        if (DATA.status) {
            // Declara arreglos para almacenar los datos del gráfico.
            let productos = [];
            let cantidades = [];

            DATA.dataset.forEach(row => {
                productos.push(row.nombre_producto);
                cantidades.push(row.total_comprado);
            });

            // Llama a la función para generar el gráfico de pastel,
            // Asignando el elemento canvas, el valor a mostrar, la cantidad a mostrar, y el título del gráfico
            pieGraph(canvas.id, productos, cantidades, 'Productos más comprados por el cliente');

            chartCell.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.log(DATA.error);
        }
    } catch (error) {
        console.error('Error al generar el gráfico:', error);
    }
}

