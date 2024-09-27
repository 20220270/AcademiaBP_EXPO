const LOGIN = document.getElementById('sessionForm');
const SIGNUP = document.getElementById('FormValidacion');
const MODAL = new bootstrap.Modal('#modalRegistrasrte');
const USER_API = 'services/admin/administrador.php';
const ADMIN_LOGIN = document.getElementById('usuarioAdmin');
const CONTRA_ADMIN = document.getElementById('contraseñaAdmin');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    //loadTemplate();

    const DATA = await fetchData(USER_API, 'readUsers');

    //fillSelect(NIVELESUSUARIO_API, 'readAll', 'selectNivelAdmin');

    // Se comprueba si existe una sesión, de lo contrario se sigue con el flujo normal.
    if (DATA.session) {
        // Se direcciona a la página web de bienvenida.
        location.href = 'menu.html';
    } else if (DATA.status) {
        // Se establece el título del contenido principal.
        //MAIN_TITLE.textContent = 'Iniciar sesión';
        // Se muestra el formulario para iniciar sesión.
        LOGIN.classList.remove('d-none');
        sweetAlert(4, DATA.message, true);
    } else {
        // Se establece el título del contenido principal.
        //MAIN_TITLE.textContent = 'Registrar primer usuario';
        // Se muestra el formulario para registrar el primer usuario.

        MODAL.show();
        sweetAlert(4, DATA.error, true);
    }
});

// Método del evento para cuando se envía el formulario de registro del primer usuario.
SIGNUP.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SIGNUP);
    // Petición para registrar el primer usuario del sitio privado.
    const DATA = await fetchData(USER_API, 'signUp', FORM);

    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Evento para el formulario de inicio de sesión.
LOGIN.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(LOGIN);
    // Petición para validar las credenciales, pero aún no iniciar sesión.

    
        // Intentar iniciar sesión
    const DATA = await fetchData(USER_API, 'logIn', FORM);

    

    // Se comprueba si la respuesta es satisfactoria.
    if (DATA.status) {
        // Si el login es exitoso, se envía el correo de verificación.
        const response = await fetch('../../api/helpers/enviar_codigo(admin).php', {
            method: 'POST',
            body: FORM // Utilizamos los mismos datos del formulario
        });

        // Comprobar si el envío del código fue exitoso.
        const result = await response.json();
        if (result.status) {
            // Redirigir a la página de verificación de dos pasos.
            sweetAlert(1, 'Te hemos enviado un código de verificación', true, 'twosteps.html');
        } else {
            // Si hay un problema con el envío del correo.
            sweetAlert(2, 'Error al enviar el código de verificación. Inténtalo de nuevo.', false);
        }
    } else {
        // Si el login falla, mostrar error.
        sweetAlert(2, DATA.error, false);
    }
});



