const CLIENTES_API = 'services/admin/clientes.php';
const CLIENTES_API2 = 'http://localhost/AcademiaBP_EXPO/api/services/admin/clientes.php';
// Constante para establecer el formulario de buscar.
const SEARCH_FORM = document.getElementById('searchForm');
// Constantes para establecer los elementos de la tabla de niveles de usuario.
const TABLE_BODY = document.getElementById('tableBody'),
ROWS_FOUND = document.getElementById('rowsFound');
// Constantes para establecer los elementos del componente Modal.
const SAVE_MODAL = new bootstrap.Modal('#saveModal'),
    MODAL_TITLE = document.getElementById('modalTitle');

// Constantes para establecer los elementos del formulario de guardar.
const SAVE_FORM = document.getElementById('saveForm')

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
    const action = form ? 'searchRows' : 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(CLIENTES_API, action, form);
    // Comprueba si la respuesta es satisfactoria; de lo contrario, muestra un mensaje de error.
    if (DATA.status) {
        // Recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Crea y concatena las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
            <tr>
                <td>${row.id_cliente}</td>
                <td><img src="${SERVER_URL}images/clientes/${row.foto_cliente}" class="card-img-top rounded-circle"></td>
                <td>${row.nombre_completo}</td>
                <td>${row.dui_cliente}</td>
                <td>${row.correo_cliente}</td>
                <td>${row.telefono_cliente}</td>
                <td>${row.direccion_cliente}</td>
                <td>${row.fecha_registro}</td>
                <td>${row.estado_cliente}</td>
                <td>
                    <button type="button" class="btn btn-sm" onclick="openUpdate(${row.id_cliente})">
                        <img src="../../resources/images/btnActualizarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                    </button>
                    <button type="button" class="btn btn-sm" onclick="openDelete(${row.id_cliente})">
                        <img src="../../resources/images/btnEliminarIMG.png" alt="" width="30px" height="30px" class="mb-1">
                    </button>
                    <button type="button" class="btn btn-sm" onclick="openGraph(${row.id_cliente}, this)">
                        <img src="../../resources/images/reporteee.png" alt="" width="25px" height="25px" class="mb-1">
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


const openCreate = () => {
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear cliente';
    // Se prepara el formulario.
    SAVE_FORM.reset();
  }

  const openUpdate = async (id) => {
    // Se define una constante tipo objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idCliente', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CLIENTES_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar cliente';
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
  const openDelete = async (id) => {
    // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Desea eliminar este cliente de forma permanente?');
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
        } else {
            console.log(DATA.error);
        }
    } catch (error) {
        console.error('Error al generar el gráfico:', error);
    }
}

