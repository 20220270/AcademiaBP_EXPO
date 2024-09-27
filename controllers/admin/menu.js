const ALUMNOS_API = 'services/admin/alumnos.php';
const PRODUCTOS_API = 'services/admin/productos.php';
const COMPRAS_API = 'services/admin/compras.php';
const ADMINISTRADOR_API = 'services/admin/administrador.php';

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}


document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    fillTable();
    loadBirthdayEvents();
    graficoBarrasCategorias();
    graficoPastelProductos();
    graficoPastelProductoss();
    graficoBarrasClientes();
    graficoBarrasExistencias();
    graficoPredictivoVentas();
    graficoPredictivoVentasNextYear();
    graficoPredictivoPerdidasNextYear();
    graficoPredictivoPerdidas();
    graficoInscripcionesAlumnos();
    graficoPredictivoAlumnos();
});


const graficoBarrasExistencias = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(ALUMNOS_API, 'categoriasConMasAlumnos');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let producto = [];
        let existencias = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            producto.push(row.categoria);
            existencias.push(row.cantidad_alumnos);
        });
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        barGraph('chart1', producto, existencias, 'Alumnos', 'Las 5 categorías con más alumnos');
    } else {
        document.getElementById('chart1').remove();
        console.log(DATA.error);
    }
}



const graficoBarrasClientes = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PRODUCTOS_API, 'clientesConMasCompras');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let clientes = [];
        let compras = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            clientes.push(row.nombre);
            compras.push(row.total_compras);
        });
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        horizontalBarGraph('chart2', clientes, compras, 'Total de compras', 'Los 5 clientes con más compras');
    } else {
        document.getElementById('chart2').remove();
        console.log(DATA.error);
    }
}



const graficoPastelProductoss = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PRODUCTOS_API, 'productosMasVendids');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a gráficar.
        let productos = [];
        let ventas = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            productos.push(row.nombre_producto);
            ventas.push(row.total_vendido);
        });
        // Llamada a la función para generar y mostrar un gráfico de pastel. Se encuentra en el archivo components.js
        doughnutGraph('chart3', productos, ventas, 'Los 5 productos más vendidos (Unidades)');
    } else {
        document.getElementById('chart3').remove();
        console.log(DATA.error);
    }
}


/*
*   Función asíncrona para mostrar un gráfico de pastel con el porcentaje de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const graficoPastelProductos = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PRODUCTOS_API, 'productosConMejorRating');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a gráficar.
        let productos = [];
        let promedios = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            productos.push(row.nombre_producto);
            promedios.push(row.promedio_calificacion);
        });
        // Llamada a la función para generar y mostrar un gráfico de pastel. Se encuentra en el archivo components.js
        pieGraph('chart4', productos, promedios, 'Los 5 productos con mejor calificación');
    } else {
        document.getElementById('chart4').remove();
        console.log(DATA.error);
    }
}


const graficoBarrasCategorias = async () => {
    // Petición para obtener los datos del gráfico.
    const DATA = await fetchData(PRODUCTOS_API, 'cantidadProductosCategoria');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
    if (DATA.status) {
        // Se declaran los arreglos para guardar los datos a graficar.
        let categorias = [];
        let cantidades = [];
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se agregan los datos a los arreglos.
            categorias.push(row.categoria_producto);
            cantidades.push(row.cantidad_producto);
        });
        // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
        barGraph('chart5', categorias, cantidades, 'Cantidad de productos', 'Las 5 categorías con más productos');
    } else {
        document.getElementById('chart5').remove();
        console.log(DATA.error);
    }
}



const loadBirthdayEvents = (birthdayEvents) => {
    // Cargamos el calendario mostrado
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        locale: 'es',
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día'
        },
        events: birthdayEvents,
        dateClick: function (info) {
            var fechaSeleccionada = info.date;
            var eventosCumpleanios = birthdayEvents.filter(function (evento) {
                var startEvento = new Date(evento.start);
                return startEvento.getFullYear() === fechaSeleccionada.getFullYear() &&
                    startEvento.getMonth() === fechaSeleccionada.getMonth() &&
                    startEvento.getDate() === fechaSeleccionada.getDate();
            });

            var mensajeAlerta = `Alumnos que cumplen años el ${fechaSeleccionada.toLocaleDateString()}:\n`;
            if (eventosCumpleanios.length > 0) {
                eventosCumpleanios.forEach(function (evento) {
                    mensajeAlerta += `- ${evento.title}\n`;
                });
            } else {
                mensajeAlerta += "No hay alumnos que cumplan años en esta fecha.";
            }
            alert(mensajeAlerta);
        }
    });
    calendar.render();
}

const fillTable = async (form = null) => {
    const action = form ? 'searchRows' : 'readAll';
    const DATA = await fetchData(ALUMNOS_API, action, form);

    if (DATA.status) {
        let birthdayEvents = [];
        DATA.dataset.forEach(row => {
            const fechaNacimiento = new Date(row.fecha_nacimiento);
            const mes = fechaNacimiento.getMonth();
            const dia = fechaNacimiento.getDate();

            const eventoCumpleaños = {
                title: `${row.nombre}`,
                start: new Date(new Date().getFullYear(), mes, dia),
                allDay: true,
                backgroundColor: 'green'
            };

            birthdayEvents.push(eventoCumpleaños);
        });
        loadBirthdayEvents(birthdayEvents);
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

const graficoPredictivoVentas = async () => {
    try {
        const dataVentas = await fetchData(COMPRAS_API, 'ventasPredictGraph2');

        if (dataVentas.status) {
            const data = dataVentas.dataset;

            // Calcular la suma de las ventas
            const totalVentas = data.reduce((sum, row) => sum + parseFloat(row.total_ventas_mensual || 0), 0);

            // Mostrar la suma en el label
            document.querySelector("label[for='chartPredictionVentas']").textContent = `Total de ventas actual: $${totalVentas.toFixed(2)}`;

            // Generar el gráfico
            barGraphVP('chartPredictionVentas', data, 'Ventas por año (USD $)');

        } else {
            document.getElementById('chartPredictionVentas').remove();
            console.log(dataVentas.error);
        }
    } catch (error) {
        console.error('Error en la petición de datos:', error);
    }
}

const graficoPredictivoPerdidas = async () => {
    try {
        const dataPerdidas = await fetchData(COMPRAS_API, 'ventasPredictGraph3');

        if (dataPerdidas.status) {
            const data = dataPerdidas.dataset;

            // Calcular la suma de las pérdidas
            const totalPerdidas = data.reduce((sum, row) => sum + parseFloat(row.total_ventas_anuladas_mensual || 0), 0);

            // Mostrar la suma en el label
            document.querySelector("label[for='chartPredictionPerdidas']").textContent = `Total de pérdidas actual: $${totalPerdidas.toFixed(2)}`;

            // Generar el gráfico
            barGraphVP('chartPredictionPerdidas', data, 'Pérdidas por año (USD $)');

        } else {
            document.getElementById('chartPredictionPerdidas').remove();
            console.log(dataPerdidas.error);
        }
    } catch (error) {
        console.error('Error en la petición de datos:', error);
    }
}

const graficoPredictivoVentasNextYear = async () => {
    try {
        //Aquí hacemos la solicitud de los datos a la API
        const dataVentasNextYear = await fetchData(COMPRAS_API, 'ventasPredictGraph4');

        if (dataVentasNextYear.status) {
            const data = dataVentasNextYear.dataset;

            const months = data.map(row => {
                // Se hace un switch case para cada més del año, los cuales también vienen incluidos en la consulta.
                switch (row.mes) {
                    case 1: return 'Enero';
                    case 2: return 'Febrero';
                    case 3: return 'Marzo';
                    case 4: return 'Abril';
                    case 5: return 'Mayo';
                    case 6: return 'Junio';
                    case 7: return 'Julio';
                    case 8: return 'Agosto';
                    case 9: return 'Septiembre';
                    case 10: return 'Octubre';
                    case 11: return 'Noviembre';
                    case 12: return 'Diciembre';
                    default: return '';
                }
            });
            //Parseo de todos los datos obtenidos de la proyección a dato flotante
            const projections = data.map(row => parseFloat(row.proyeccion_ventas_mensual || 0));

            // Calcular la suma de la proyección de ventas
            const totalProyeccionVentas = projections.reduce((sum, value) => sum + value, 0);

            // Mostrar la suma en el label
            document.querySelector("label[for='chartPredictionVentasNextYear']").textContent = `Proyección de Ventas del Próximo Año: $${totalProyeccionVentas.toFixed(2)}`;

            // Generar el gráfico
            barGraph('chartPredictionVentasNextYear', months, projections, 'Proyección de ventas por mes (USD $)', 'Proyección de ventas para el próximo año');
            
        } else {
            document.getElementById('chartPredictionVentasNextYear').remove();
            console.log(dataVentasNextYear.error);
        }
    } catch (error) {
        console.error('Error en la petición de datos:', error);
    }
}

//Función para la predicción de las pérdidas del próximo año
const graficoPredictivoPerdidasNextYear = async () => {
    try {
        //Aquí hacemos la solicitud de los datos a la API
        const dataPerdidasNextYear = await fetchData(COMPRAS_API, 'ventasPredictGraph5');

        if (dataPerdidasNextYear.status) {
            const data = dataPerdidasNextYear.dataset;

            const months = data.map(row => {
                switch (row.mes) {
                    case 1: return 'Enero';
                    case 2: return 'Febrero';
                    case 3: return 'Marzo';
                    case 4: return 'Abril';
                    case 5: return 'Mayo';
                    case 6: return 'Junio';
                    case 7: return 'Julio';
                    case 8: return 'Agosto';
                    case 9: return 'Septiembre';
                    case 10: return 'Octubre';
                    case 11: return 'Noviembre';
                    case 12: return 'Diciembre';
                    default: return '';
                }
            });
            const projections = data.map(row => parseFloat(row.proyeccion_ventas_anuladas_mensual || 0));

            // Calcular la suma de la proyección de pérdidas
            const totalProyeccionPerdidas = projections.reduce((sum, value) => sum + value, 0);

            // Mostrar la suma en el label
            document.querySelector("label[for='chartPredictionPerdidasNextYear']").textContent = `Proyección de Pérdidas del Próximo Año: $${totalProyeccionPerdidas.toFixed(2)}`;

            // Generar el gráfico
            barGraph('chartPredictionPerdidasNextYear', months, projections, 'Proyección de pérdidas por mes (USD $)', 'Proyección de pérdidas para el próximo año');
            
        } else {
            document.getElementById('chartPredictionPerdidasNextYear').remove();
            
        }
    } catch (error) {
        console.error('Error en la petición de datos:', error);
    }
}


//Función para mostrar el total de inscripciones de alumnos registradas en la base de datos
const graficoInscripcionesAlumnos = async () => {
    try {
        const dataNuevosAlumnos = await fetchData(ALUMNOS_API, 'alumnosPredictGraph2');

        if (dataNuevosAlumnos.status) {
            const data = dataNuevosAlumnos.dataset;

            // Inspeccionar los datos para depuración
            data.forEach(row => console.log(`Cantidad: ${row.total_inscripciones}`)); // Verificar cada valor de cantidad, desde el campo total_inscripciones

            // Asegurarse de que cada valor es un número y calcular la suma
            const sumaAlumnos = data.reduce((total, row) => {
                const cantidad = parseFloat(row.total_inscripciones) || 0; // Validar y convertir a número
                return total + cantidad;
            }, 0);

            document.querySelector("label[for='chartPrediction2']").textContent = `Total de inscripciones actuales: ${sumaAlumnos} inscripciones`;

            // Generar y mostrar el gráfico de barras
            barGraphA('chartPrediction2', data, 'Inscripciones de alumnos registradas por año');
        } else {
            document.getElementById('chartPrediction2').remove();
        }
    } catch (error) {
        console.error('Error en la petición de datos:', error);
    }
}



//Función para la predicción de las inscripciones de alumnos para el próximo año
const graficoPredictivoAlumnos = async () => {
    try {
        const dataNuevosAlumnos3 = await fetchData(ALUMNOS_API, 'alumnosPredictGraph3');

        if (dataNuevosAlumnos3.status) {
            const data = dataNuevosAlumnos3.dataset;

            // Asegurarse de que cada valor es un número y calcular la suma
            const sumaProyecciones = data.reduce((total, row) => {
                const proyeccion = Number(row.Proyección) || 0; // Validar y convertir a número
                return total + proyeccion;
            }, 0);

            document.querySelector("label[for='chartPrediction3']").textContent = `Inscripciones proyectadas: ${sumaProyecciones} nuevas inscripciones`;

            const months = data.map(row => {
                switch (row.Mes) {
                    case 1: return 'Enero';
                    case 2: return 'Febrero';
                    case 3: return 'Marzo';
                    case 4: return 'Abril';
                    case 5: return 'Mayo';
                    case 6: return 'Junio';
                    case 7: return 'Julio';
                    case 8: return 'Agosto';
                    case 9: return 'Septiembre';
                    case 10: return 'Octubre';
                    case 11: return 'Noviembre';
                    case 12: return 'Diciembre';
                    default: return '';
                }
            });
            const projections = data.map(row => row.Proyección);

            barGraph('chartPrediction3', months, projections, 'Inscripciones proyectadas por mes', 'Proyección de inscripciones de alumnos para el próximo año');
        } else {
            document.getElementById('chartPrediction3').remove();
            console.log(dataNuevosAlumnos3.error);
        }
    } catch (error) {
        console.error('Error en la petición de datos:', error);
    }
}
