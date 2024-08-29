const ALUMNOS_API = 'services/admin/alumnos.php';
const PRODUCTOS_API = 'services/admin/productos.php';
const COMPRAS_API = 'services/admin/compras.php';

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
        // Petición para obtener los datos de ventas.
        const dataVentas = await fetchData(COMPRAS_API, 'ventasPredictGraph2');

        if (dataVentas.status) {
            // Procesar los datos de ventas
            const data = dataVentas.dataset;
            console.log(data);

            // Llamada a la función para generar y mostrar un gráfico de barras para ventas.
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
        // Petición para obtener los datos de pérdidas.
        const dataPerdidas = await fetchData(COMPRAS_API, 'ventasPredictGraph3');

        if (dataPerdidas.status) {
            // Procesar los datos de pérdidas
            const data = dataPerdidas.dataset;
            console.log(data);

            // Llamada a la función para generar y mostrar un gráfico de barras para pérdidas.
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
        // Petición para obtener los datos de la proyección de ventas.
        const dataVentasNextYear = await fetchData(COMPRAS_API, 'ventasPredictGraph4');

        if (dataVentasNextYear.status) {
            // Procesar los datos de ventas
            const data = dataVentasNextYear.dataset;

            // Extraer los meses y proyecciones
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
            const projections = data.map(row => parseFloat(row.proyeccion_ventas_mensual || 0)); // Ajuste para el campo correspondiente y conversión a número

            // Llamada a la función para generar y mostrar un gráfico de barras.
            barGraph('chartPredictionVentasNextYear', months, projections, 'Proyección de ventas por mes (USD $)', 'Proyección de ventas para el próximo año');
            
        } else {
            document.getElementById('chartPredictionVentasNextYear').remove();
            console.log(dataVentasNextYear.error);
        }
    } catch (error) {
        console.error('Error en la petición de datos:', error);
    }
}

const graficoPredictivoPerdidasNextYear = async () => {
    try {
        // Petición para obtener los datos de la proyección de pérdidas.
        const dataPerdidasNextYear = await fetchData(COMPRAS_API, 'ventasPredictGraph5');

        if (dataPerdidasNextYear.status) {
            // Procesar los datos de pérdidas
            const data = dataPerdidasNextYear.dataset;

            // Extraer los meses y proyecciones
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
            const projections = data.map(row => parseFloat(row.proyeccion_ventas_anuladas_mensual || 0)); // Ajuste para el campo correspondiente y conversión a número

            // Llamada a la función para generar y mostrar un gráfico de barras.
            barGraph('chartPredictionPerdidasNextYear', months, projections, 'Proyección de pérdidas por mes (USD $)', 'Proyección de pérdidas para el próximo año');
            
        } else {
            document.getElementById('chartPredictionPerdidasNextYear').remove();
            console.log(dataPerdidasNextYear.error);
        }
    } catch (error) {
        console.error('Error en la petición de datos:', error);
    }
}


const graficoInscripcionesAlumnos = async () => {
    try {
        // Petición para obtener los datos de nuevos alumnos.
        const dataNuevosAlumnos = await fetchData(ALUMNOS_API, 'alumnosPredictGraph2');

        if (dataNuevosAlumnos.status) {
            // Procesar los datos de nuevos alumnos
            const data = dataNuevosAlumnos.dataset;

            // Llamada a la función para generar y mostrar un gráfico de barras.
            barGraphA('chartPrediction2', data, 'Inscripciones de alumnos registradas por año');

        } else {
            document.getElementById('chartPrediction2').remove();
            console.log(dataNuevosAlumnos.error);
        }
    } catch (error) {
        console.error('Error en la petición de datos:', error);
    }
}

const graficoPredictivoAlumnos = async () => {
    try {
        // Petición para obtener los datos de la proyección de alumnos.
        const dataNuevosAlumnos3 = await fetchData(ALUMNOS_API, 'alumnosPredictGraph3');

        if (dataNuevosAlumnos3.status) {
            // Procesar los datos de nuevos alumnos
            const data = dataNuevosAlumnos3.dataset;

            // Extraer los meses y proyecciones
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

            // Llamada a la función para generar y mostrar un gráfico de barras.
            barGraph('chartPrediction3', months, projections, 'Inscripciones proyectadas por mes', 'Proyección de inscripciones de alumnos para el próximo año');
            
        } else {
            document.getElementById('chartPrediction3').remove();
            console.log(dataNuevosAlumnos3.error);
        }
    } catch (error) {
        console.error('Error en la petición de datos:', error);
    }
}


