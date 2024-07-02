const ALUMNOS_API = 'services/admin/alumnos.php';
const PRODUCTOS_API = 'services/admin/productos.php';

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}


document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    fillTable();
    loadBirthdayEvents();
    graficoBarrasProductos();
    graficoPastelClientes();
    graficoDonaAlumnos();
    graficoBarraClien();
});


const graficoBarrasProductos = async () => {
    try {
        // Hacer la petición para obtener los datos del gráfico desde la API
        const response = await fetch(`http://localhost/AcademiaBP_EXPO/api/${PRODUCTOS_API}?action=productosMasVendids`);
        const data = await response.json();

        console.log(data);

        if (data.status === 1) {
            // Inicializar arreglos para guardar los datos del gráfico
            let categorias = [];
            let cantidades = [];

            // Iterar sobre los datos recibidos
            data.dataset.forEach(row => {
                categorias.push(row.nombre_producto); // Nombre del producto
                cantidades.push(row.total_vendido); // Cantidad de productos
            });

            // Configurar y mostrar el gráfico de barras
            const barCtx = document.getElementById('myBarChart').getContext('2d'); // Usamos el mismo canvas
            const myBarChart = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: categorias,
                    datasets: [{
                        label: 'Productos más vendidos',
                        data: cantidades,
                        backgroundColor: [
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)'
                        ],
                        borderColor: [
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else {
            console.error(data.error); // Manejo de errores si la respuesta no es satisfactoria
        }
    } catch (error) {
        console.error('Error al obtener datos del gráfico:', error);
    }
};

const graficoPastelClientes = async () => {
    try {
        // Hacer la petición para obtener los datos del gráfico desde la API
        const response = await fetch(`http://localhost/AcademiaBP_EXPO/api/${PRODUCTOS_API}?action=clientesConMasCompras`);
        const data = await response.json();

        console.log(data);

        if (data.status === 1) {
            // Inicializar arreglos para guardar los datos del gráfico
            let clientes = [];
            let numcompras = [];

            // Iterar sobre los datos recibidos
            data.dataset.forEach(row => {
                clientes.push(row.nombre);
                numcompras.push(row.total_compras);
            });

            // Configurar y mostrar el gráfico de barras
            const pieCtx = document.getElementById('myPieChart').getContext('2d'); // Usamos el mismo canvas
            const myPieChart = new Chart(pieCtx, {
                type: 'pie',
                data: {
                    labels: clientes,
                    datasets: [{
                        label: 'Clientes con más compras',
                        data: numcompras,
                        backgroundColor: [
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)'
                        ],
                        borderColor: [
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else {
            console.error(data.error); // Manejo de errores si la respuesta no es satisfactoria
        }
    } catch (error) {
        console.error('Error al obtener datos del gráfico:', error);
    }
};

const graficoDonaAlumnos = async () => {
    try {
        // Hacer la petición para obtener los datos del gráfico desde la API
        const response = await fetch(`http://localhost/AcademiaBP_EXPO/api/${ALUMNOS_API}?action=categoriasConMasAlumnos`);
        const data = await response.json();

        console.log(data);

        if (data.status === 1) {
            // Inicializar arreglos para guardar los datos del gráfico
            let categorias = [];
            let numalumnos = [];

            // Iterar sobre los datos recibidos
            data.dataset.forEach(row => {
                categorias.push(row.categoria);
                numalumnos.push(row.cantidad_alumnos);
            });

            // Configurar y mostrar el gráfico de barras
            const pieCtx1 = document.getElementById('myBarChart1').getContext('2d'); // Usamos el mismo canvas
            const myBarChart1 = new Chart(pieCtx1, {
                type: 'pie',
                data: {
                    labels: categorias,
                    datasets: [{
                        label: 'Categorías con más alumnos',
                        data: numalumnos,
                        backgroundColor: [
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)'
                        ],
                        borderColor: [
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else {
            console.error(data.error); // Manejo de errores si la respuesta no es satisfactoria
        }
    } catch (error) {
        console.error('Error al obtener datos del gráfico:', error);
    }
};

const graficoBarraClien = async () => {
    try {
        // Hacer la petición para obtener los datos del gráfico desde la API
        const response = await fetch(`http://localhost/AcademiaBP_EXPO/api/${PRODUCTOS_API}?action=productosConMejorRating`);
        const data = await response.json();

        console.log(data);

        if (data.status === 1) {
            // Inicializar arreglos para guardar los datos del gráfico
            let productos = [];
            let promedio = [];

            // Iterar sobre los datos recibidos
            data.dataset.forEach(row => {
                productos.push(row.nombre_producto);
                promedio.push(row.promedio_calificacion);
            });

            // Configurar y mostrar el gráfico de barras
            const pieCtx2 = document.getElementById('myPieChart1').getContext('2d'); // Usamos el mismo canvas
            const myPieChart2 = new Chart(pieCtx2, {
                type: 'pie',
                data: {
                    labels: productos,
                    datasets: [{
                        label: 'Calificación promedio: ',
                        data: promedio,
                        backgroundColor: [
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)',
                            'rgba(64, 136, 64, 0.9)'
                        ],
                        borderColor: [
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)',
                            'rgba(0, 0, 0, 100%)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else {
            console.error(data.error); // Manejo de errores si la respuesta no es satisfactoria
        }
    } catch (error) {
        console.error('Error al obtener datos del gráfico:', error);
    }
};



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
