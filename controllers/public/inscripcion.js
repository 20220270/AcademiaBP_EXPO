const ALUMNOS_API = 'services/public/alumnos.php';

const ALUMNO_FORM = document.getElementById('alumnoForm');
const MAIN_TITLE = document.getElementById('mainTitle');

    ID_ALUMNO = document.getElementById('idAlumno'),
    NOMBRE_ALUMNO = document.getElementById('nombreAlumno'),
    APELLIDO_ALUMNO = document.getElementById('apellidoAlumno'),
    FECHA_NACIMIENTO = document.getElementById('fechaNacimiento'),
    POSICION_ALUMNO = document.getElementById('selectPosicion'),
    ID_DIASPAGO = document.getElementById('selectDias');

ALUMNO_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_ALUMNO.value) ? action = 'updateRow' : action = 'createRowAlumno';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(ALUMNO_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(ALUMNOS_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true, 'index.html');
        
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

function validarFechaNacimiento() {
    var fechaActual = new Date().toISOString().slice(0, 10);
    FECHA_NACIMIENTO.setAttribute('max', fechaActual);
}

document.addEventListener('DOMContentLoaded', async () => {
    
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = '¡Inscribe a tu hijo!';
    fillSelect(ALUMNOS_API, 'readAllDiasPago', 'selectDias');

    validarFechaNacimiento();
});
