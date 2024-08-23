
const MENSUALIDAD_API = 'services/public/mensualidad.php';

CARDS_PAGOS = document.getElementById('pagos');
MAIN_TITLE = document.getElementById('mainTitle');
TEXTO = document.getElementById('texto');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    fillTable();

    MAIN_TITLE.textContent = 'Pagos en línea';
});


const fillTable = async (id) => {
    // Limpiar contenido previo de la tabla de alumnos
    CARDS_PAGOS.innerHTML = '';

    // Crear un nuevo objeto FormData para enviar datos en la solicitud
    const FORM = new FormData();
    FORM.append('idCliente', id); // Agregar el correo del cliente al formulario

    try {
        // Realizar la solicitud a la API para obtener los datos de los alumnos
        const DATA = await fetchData(MENSUALIDAD_API, 'readAllVerPagos', FORM);

        // Verificar si la solicitud fue exitosa
        if (DATA.status) {
            // Convertir el conjunto de datos a un array si no lo es ya
            const rows = Array.isArray(DATA.dataset) ? DATA.dataset : [DATA.dataset];
            

            // Iterar sobre cada fila de datos para construir las tarjetas de los alumnos
            rows.forEach(row => {
                CARDS_PAGOS.innerHTML += `
                    <div class="card mb-4 mt-4 mx-auto col-lg-5 col-md-12 col-sm-12 col-12 h-50" id="borderAlumnos">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <img src="../../resources/images/logoAcademiaBP.png" alt="..." width="90%" height="95%">
                                </div>

                                <div class="col-lg-6">
                                    <p class="card-text"><b>Alumno cancelado: </b>${row.alumno}</p>
                                    <p class="card-text"><b>Total cancelado: </b>$${row.mensualidad_pagar}</p>
                                    <p class="card-text"><b>Pago realizado en la fecha: </b>${row.fecha_pago}</p>
                                    <p class="card-text"><b>Descripción del pago: </b>${row.descripcion_pago}</p>
                                </div>    
                            </div>
                        </div>
                    </div>
                `;
            });
        } else {
            // Mostrar una alerta dulce (sweetAlert) en caso de error
            sweetAlert(4, DATA.error, true);
        }
    } catch (error) {
        // Capturar y manejar cualquier error de la solicitud
        console.error('Error fetching data:', error);
        sweetAlert(4, 'Error al obtener los datos', true);
    }
};