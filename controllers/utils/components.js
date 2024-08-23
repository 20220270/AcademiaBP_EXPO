/*
*   CONTROLADOR DE USO GENERAL EN TODAS LAS PÁGINAS WEB.
*/
// Constante para establecer la ruta base del servidor.

const SERVER_URL = 'http://localhost/AcademiaBP_EXPO/api/';

/*
*   Función para mostrar un mensaje de confirmación. Requiere la librería sweetalert para funcionar.
*   Parámetros: message (mensaje de confirmación).
*   Retorno: resultado de la promesa.
*/
const confirmAction = (message) => {
    return swal({
        title: 'Advertencia',
        text: message,
        icon: 'warning',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
            cancel: {
                text: 'No',
                value: false,
                visible: true
            },
            confirm: {
                text: 'Sí',
                value: true,
                visible: true
            }
        }
    });
}

/*
*   Función asíncrona para manejar los mensajes de notificación al usuario. Requiere la librería sweetalert para funcionar.
*   Parámetros: type (tipo de mensaje), text (texto a mostrar), timer (uso de temporizador) y url (valor opcional con la ubicación de destino).
*   Retorno: ninguno.
*/
const sweetAlert = async (type, text, timer, url = null) => {
    // Se compara el tipo de mensaje a mostrar.
    switch (type) {
        case 1:
            title = 'Éxito';
            icon = 'success';
            break;
        case 2:
            title = 'Error';
            icon = 'error';
            break;
        case 3:
            title = 'Advertencia';
            icon = 'warning';
            break;
        case 4:
            title = 'Aviso';
            icon = 'info';
    }
    // Se define un objeto con las opciones principales para el mensaje.
    let options = {
        title: title,
        text: text,
        icon: icon,
        closeOnClickOutside: false,
        closeOnEsc: false,
        button: {
            text: 'Aceptar'
        }
    };
    // Se verifica el uso del temporizador.
    (timer) ? options.timer = 3000 : options.timer = null;
    // Se muestra el mensaje.
    await swal(options);
    // Se direcciona a una página web si se indica.
    (url) ? location.href = url : undefined;
}

/*
*   Función asíncrona para cargar las opciones en un select de formulario.
*   Parámetros: filename (nombre del archivo), action (acción a realizar), select (identificador del select en el formulario) y selected (dato opcional con el valor seleccionado).
*   Retorno: ninguno.
*/
const fillSelect = async (filename, action, select, selected = null) => {
    const DATA = await fetchData(filename, action);
    let content = '';

    if (DATA.status) {
        content += '<option value="" selected>Seleccione una opción</option>';

        DATA.dataset.forEach(row => {
            const value = Object.values(row)[0];
            const text = Object.values(row)[1];

            if (select === 'selectColor') {
                let colorHex = Object.values(row)[1];

                if (colorHex && colorHex.trim() !== '') {
                    // Asegúrate de que el color tenga el prefijo '#'
                    if (!colorHex.startsWith('#')) {
                        colorHex = `#${colorHex}`;
                        console.log(colorHex)
                    }

                    content += `
                        <option value="${value}" style="background-color: ${colorHex}; color: ${getContrastingTextColor(colorHex)};">
                            ${text}
                        </option>`;
                } else {
                    console.error('El valor hexadecimal de color no está definido para:', row);
                    console.log(colorHex)
                }
            } else {
                if (value != selected) {
                    content += `<option value="${value}">${text}</option>`;
                } else {
                    content += `<option value="${value}" selected>${text}</option>`;
                }
            }
        });
    } else {
        content += '<option>No hay opciones disponibles</option>';
    }

    document.getElementById(select).innerHTML = content;
};

// Función para determinar un color de texto que contraste con el fondo
function getContrastingTextColor(hex) {
    // Verifica que hex sea una cadena válida
    if (!hex || hex.length !== 7 || hex[0] !== '#') {
        console.error('Formato de color hexadecimal no válido:', hex);
        return '#000'; // Devuelve negro por defecto si el color es inválido
    }

    // Convierte el hexadecimal en RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Calcula el brillo (YIQ) para determinar si el fondo es oscuro o claro
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000' : '#FFF'; // Devuelve negro o blanco según el brillo
}



/*
*   Función para generar un gráfico de barras verticales. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), xAxis (datos para el eje X), yAxis (datos para el eje Y), legend (etiqueta para los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
const barGraph = (canvas, xAxis, yAxis, legend, title) => {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    xAxis.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // Se crea una instancia para generar el gráfico con los datos recibidos.
    new Chart(document.getElementById(canvas), {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                }
            }
        }
    });
}

const barGraphA = (canvas, data, title) => {
    const ctx = document.getElementById(canvas).getContext('2d');

    // Organizar los datos por año
    const labels = [];
    const datasets = [];

    const years = [...new Set(data.map(row => row.anio))];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    years.forEach(year => {
        const yearData = months.map(month => {
            const record = data.find(row => row.anio === year && row.mes === months.indexOf(month) + 1);
            return record ? record.total_inscripciones : 0;
        });

        datasets.push({
            label: `Año ${year}`,
            data: yearData,
            backgroundColor: `#${Math.random().toString(16).substring(2, 8)}`,
            borderColor: `#${Math.random().toString(16).substring(2, 8)}`,
            borderWidth: 1
        });
    });

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: true
                }
            },
            scales: {
                x: {
                    stacked: false,  // Cambiado a false para que las barras no se apilen
                    barPercentage: 0.9,
                    categoryPercentage: 0.8
                },
                y: {
                    stacked: false
                }
            }
        }
    });
}



/*
*   Función para generar un gráfico de pastel. Requiere la librería chart.js para funcionar.
*   Parámetros: canvas (identificador de la etiqueta canvas), legends (valores para las etiquetas), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
const pieGraph = (canvasId, legends, values, title) => {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });

    // Obtén el elemento canvas por su ID
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.error(`No se encontró el canvas con ID ${canvasId}`);
        return;
    }

    // Obtén el contexto del canvas
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error(`No se pudo obtener el contexto del canvas con ID ${canvasId}`);
        return;
    }

    // Se crea una instancia para generar el gráfico con los datos recibidos.
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

const horizontalBarGraph = (canvas, xAxis, yAxis, legend, title) => {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    yAxis.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // Se crea una instancia para generar el gráfico con los datos recibidos.
    new Chart(document.getElementById(canvas), {
        type: 'bar', // Cambiar a 'horizontalBar' en versiones anteriores de Chart.js
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors
            }]
        },
        options: {
            indexAxis: 'y', // Para gráficos horizontales
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}

const doughnutGraph = (canvas, legends, values, title) => {
    // Se declara un arreglo para guardar códigos de colores en formato hexadecimal.
    let colors = [];
    // Se generan códigos hexadecimales de 6 cifras de acuerdo con el número de datos a mostrar y se agregan al arreglo.
    values.forEach(() => {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    });
    // Se crea una instancia para generar el gráfico con los datos recibidos.
    new Chart(document.getElementById(canvas), {
        type: 'doughnut',
        data: {
            labels: legends,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

const lineGraph = (canvas, xAxis, yAxis1, yAxis2, legend1, legend2) => {
    new Chart(document.getElementById(canvas), {
        type: 'line', // Tipo de gráfico: línea
        data: {
            labels: xAxis,
            datasets: [
                {
                    label: legend1,
                    data: yAxis1,
                    borderColor: '#007bff', // Color de la línea para ganancias
                    backgroundColor: 'rgba(0, 123, 255, 0.2)', // Color de fondo para ganancias
                    fill: false, // No rellenar el área bajo la línea
                    tension: 0.1 // Suavizar la línea (opcional)
                },
                {
                    label: legend2,
                    data: yAxis2,
                    borderColor: '#dc3545', // Color de la línea para pérdidas
                    backgroundColor: 'rgba(220, 53, 69, 0.2)', // Color de fondo para pérdidas
                    fill: false, // No rellenar el área bajo la línea
                    tension: 0.1 // Suavizar la línea (opcional)
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Ganancias y Pérdidas por mes'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Meses'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Monto'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value; // Agregar el símbolo de dólar
                        }
                    }
                }
            }
        }
    });
}

const lineGraphA = (canvas, xAxis, yAxis, legend) => {
    new Chart(document.getElementById(canvas), {
        type: 'line', // Tipo de gráfico: línea
        data: {
            labels: xAxis,
            datasets: [
                {
                    label: legend,
                    data: yAxis,
                    borderColor: '#1B9100', // Color de la línea
                    backgroundColor: 'rgba(27, 145, 0, 0.2)', // Color de fondo
                    fill: false, // No rellenar el área bajo la línea
                    tension: 0.1 // Suavizar la línea (opcional)
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Predicción de alumnos'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Meses'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Cantidad de alumnos'
                    },
                    ticks: {
                        callback: function(value) {
                            return  value;
                        }
                    }
                }
            }
        }
    });
}




/*
*   Función asíncrona para cerrar la sesión del usuario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const logOut = async () => {
    // Se muestra un mensaje de confirmación y se captura la respuesta en una constante.
    const RESPONSE = await confirmAction('¿Está seguro de cerrar la sesión?');
    // Se verifica la respuesta del mensaje.
    if (RESPONSE) {
        // Petición para eliminar la sesión.
        const DATA = await fetchData(USER_API, 'logOut');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            sweetAlert(1, DATA.message, true, 'index.html');
        } else {
            sweetAlert(2, DATA.exception, false);
        }
    }
}

/*
*   Función asíncrona para intercambiar datos con el servidor.
*   Parámetros: filename (nombre del archivo), action (accion a realizar) y form (objeto opcional con los datos que serán enviados al servidor).
*   Retorno: constante tipo objeto con los datos en formato JSON.
*/
const fetchData = async (filename, action, form = null) => {
    // Se define una constante tipo objeto para establecer las opciones de la petición.
    const OPTIONS = {};
    // Se determina el tipo de petición a realizar.
    if (form) {
        OPTIONS.method = 'post';
        OPTIONS.body = form;
    } else {
        OPTIONS.method = 'get';
    }
    try {
        // Se declara una constante tipo objeto con la ruta específica del servidor.
        const PATH = new URL(SERVER_URL + filename);
        // Se agrega un parámetro a la ruta con el valor de la acción solicitada.
        PATH.searchParams.append('action', action);
        // Se define una constante tipo objeto con la respuesta de la petición.
        const RESPONSE = await fetch(PATH.href, OPTIONS);
        // Se retorna el resultado en formato JSON.
        return await RESPONSE.json();
    } catch (error) {
        // Se muestra un mensaje en la consola del navegador web cuando ocurre un problema.
        console.log(error);
    }
}