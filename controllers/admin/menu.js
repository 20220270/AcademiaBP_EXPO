const ALUMNOS_API = 'services/admin/alumnos.php';


document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    fillTable();
    loadBirthdayEvents();
});

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
        locale: 'es',//Idioma del calendario
        events: birthdayEvents, // Cargamos los eventos de cumpleaños en el calendario

        //Método que, al darle clic a una casilla de un día del calendario, trae los 
        //alumnos que cumplen años ese día
        dateClick: function(info) {
            var fechaSeleccionada = info.date;
            

            // Filtramos eventos de cumpleaños para obtener los que coinciden con la fecha seleccionada
            var eventosCumpleanios = birthdayEvents.filter(function(evento) {
                // Convertimos start del evento a objeto Date para comparar
                var startEvento = new Date(evento.start);
                return startEvento.getFullYear() === fechaSeleccionada.getFullYear() &&
                       startEvento.getMonth() === fechaSeleccionada.getMonth() &&
                       startEvento.getDate() === fechaSeleccionada.getDate();
            });

            // Declaramos un mensaje mensaje de alerta con los alumnos que cumplen años en la fecha seleccionada
            var mensajeAlerta = `Alumnos que cumplen años el ${fechaSeleccionada.toLocaleDateString()}:\n`;
            if (eventosCumpleanios.length > 0) {
                eventosCumpleanios.forEach(function(evento) {
                    mensajeAlerta += `- ${evento.title}\n`;
                });
            } else {
                mensajeAlerta += "No hay alumnos que cumplan años en esta fecha.";
            }

            // Mostrar alerta con los alumnos que cumplen años
            alert(mensajeAlerta);
        }
    });
    calendar.render();
}

// Función para llenar las cards de alumnos (que serán invisibles) y asignar fechas de cumpleaños en el calendario
const fillTable = async (form = null) => {
    
    
    const action = form ? 'searchRows' : 'readAll';
    const DATA = await fetchData(ALUMNOS_API, action, form);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Array para almacenar los eventos de cumpleaños
        let birthdayEvents = [];
        
        // Recorremos el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Tomamos la fecha de nacimiento del alumno
            const fechaNacimiento = new Date(row.fecha_nacimiento);
            const mes = fechaNacimiento.getMonth(); // Mes (0 - 11)
            const dia = fechaNacimiento.getDate(); // Día del mes
            
            
            // Creamos el evento para el cumpleaños de los alumnos en el calendario
            const eventoCumpleaños = {
                title: `${row.nombre_alumno} ${row.apellido_alumno}`,
                start: new Date(new Date().getFullYear(), mes, dia), // Fecha de cumpleaños de este año
                allDay: true,
                 backgroundColor: 'green', //Por defecto, el calendario muestra el nombre del alumno con fondo azul
                 
                
            };
            
            // Agregamos evento de cumpleaños al array
            birthdayEvents.push(eventoCumpleaños);
          
        });
        
        // Llamar función para cargar los eventos de cumpleaños en el calendario
        loadBirthdayEvents(birthdayEvents);
    } else {
        sweetAlert(4, DATA.error, true);
    }
}