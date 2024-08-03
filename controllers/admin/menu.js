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
    graficoPredictivo();
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
        barGraph('chart1', producto, existencias, 'Existencias', 'Categorías con más alumnos');
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
        horizontalBarGraph('chart2', clientes, compras, 'Total de compras', 'Clientes con más compras');
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
        doughnutGraph('chart3', productos, ventas, 'Productos más vendidos (Unidades)');
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
        pieGraph('chart4', productos, promedios, 'Productos con mejor calificación');
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
        barGraph('chart5', categorias, cantidades, 'Cantidad de productos', 'Categorías con más productos');
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
        dateClick: function(info) {
            var fechaSeleccionada = info.date;
            var eventosCumpleanios = birthdayEvents.filter(function(evento) {
                var startEvento = new Date(evento.start);
                return startEvento.getFullYear() === fechaSeleccionada.getFullYear() &&
                       startEvento.getMonth() === fechaSeleccionada.getMonth() &&
                       startEvento.getDate() === fechaSeleccionada.getDate();
            });

            var mensajeAlerta = `Alumnos que cumplen años el ${fechaSeleccionada.toLocaleDateString()}:\n`;
            if (eventosCumpleanios.length > 0) {
                eventosCumpleanios.forEach(function(evento) {
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
                title: `${row.nombre_alumno} ${row.apellido_alumno}`,
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

const graficoPredictivo = async () => {
    try {
        // Peticiones para obtener los datos de ganancias y pérdidas.
        const [dataGanancias, dataPerdidas] = await Promise.all([
            fetchData(COMPRAS_API, 'predictGraph'),
            fetchData(COMPRAS_API, 'perdidasPredictGraph')
        ]);

        if (dataGanancias.status && dataPerdidas.status) {
            // Arreglos para guardar los datos a graficar.
            let mesventas = [];
            let ganancias = Array(12).fill(0); // Inicializar con ceros para todos los meses
            let perdidas = Array(12).fill(0); // Inicializar con ceros para todos los meses

            // Arreglo de nombres de meses.
            const meses = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ];

            // Procesar datos de ganancias
            dataGanancias.dataset.forEach(row => {
                mesventas.push(meses[row.mes - 1]);
                ganancias[row.mes - 1] = parseFloat(row.ganancias_mensuales);
            });

            // Procesar datos de pérdidas
            dataPerdidas.dataset.forEach(row => {
                perdidas[row.mes - 1] = parseFloat(row.perdidas_mensuales);
            });

            // Calcular las ganancias totales del año.
            const totalGanancias = parseFloat(dataGanancias.dataset[0].ganancias_totales_proyectadas);
            const totalPerdidas = parseFloat(dataPerdidas.dataset[0].perdidas_totales_proyectadas);

            // Añadir registros de depuración
            console.log('Ganancias Mensuales:', ganancias);
            console.log('Pérdidas Mensuales:', perdidas);
            console.log('Ganancias Totales Proyectadas:', totalGanancias);
            console.log('Pérdidas Totales Proyectadas:', totalPerdidas);

            // Llamada a la función para generar y mostrar un gráfico de líneas.
            lineGraph('chartPrediction', meses, ganancias, perdidas, 'Ganancias por mes (USD $)', 'Pérdidas por mes (USD $)');

            // Mostrar el total de ganancias y pérdidas del año en el label.
            document.getElementById('totalGanancias').textContent =
                `Ganancias totales estimadas para el año: $${totalGanancias.toFixed(2)}`;
            document.getElementById('totalPerdidas').textContent =
                `Pérdidas totales estimadas para el año: $${totalPerdidas.toFixed(2)}`;

        } else {
            document.getElementById('chartPrediction').remove();
            console.log(dataGanancias.error || dataPerdidas.error);
        }
    } catch (error) {
        console.error('Error en la petición de datos:', error);
    }
}