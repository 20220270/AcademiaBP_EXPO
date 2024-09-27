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



    // Autenticación sin dos pasos
    const FORM2 = new FormData();
    FORM2.append('usuarioAdmin', ADMIN_LOGIN.value);
    const DATA_USER = await fetchData(USER_API, 'getUserData', FORM2);

    if (DATA_USER.status) {
        const user = DATA_USER.dataset;

        // Verificar si la cuenta está bloqueada
        if (user.account_locked_until && new Date() < new Date(user.account_locked_until)) {
            await sweetAlert(2, `Tu cuenta está bloqueada hasta ${user.account_locked_until}.`, false);
            return;
        } else {
            // Si ha pasado el tiempo de bloqueo, restablecer los intentos fallidos
            if (user.account_locked_until && new Date() >= new Date(user.account_locked_until)) {
                const RESULT_START = await fetchData(USER_API, 'resetFailedAttempts', FORM2); // Restablecer intentos fallidos
                if (RESULT_START.status) {
                    console.log('Intentos fallidos restablecidos.');
                    user.failed_attempts = 0; // Actualizar el objeto local
                }
            }
        }
    }
        // Intentar iniciar sesión
    const DATA = await fetchData(USER_API, 'logIn', FORM);

    if (DATA.status) {
        const RESULT_RESET = await fetchData(USER_API, 'resetFailedAttempts', FORM2); // Restablecer intentos fallidos
        if (RESULT_RESET.status) {
            
            location.href = 'menu.html'; // Redirigir al panel principal
        }
    } else {
        if (DATA.error != 'Credenciales incorrectas') {
            await sweetAlert(2, `Su contraseña ha expirado. Para restablecerla, haga clic en "Has olvidado tu contraseña" y puedes proseguir con el proceso de restablecimiento.`, false);
            return;
        } else {
            // Incrementar intentos fallidos
            const newFailedAttempts = user.failed_attempts + 1;
            if (newFailedAttempts >= 3) {
                // Bloquear cuenta por 24 horas
                const lockDuration = 24 * 60 * 60 * 1000; // 24 horas
                const now = new Date();
                const accountLockedUntil = new Date(now.getTime() + lockDuration);

                const accountLockedUntilSQL = formatDateForSQL(accountLockedUntil);
                FORM2.append('accountLockedUntil', accountLockedUntilSQL);

                const REULST_BLOCK = await fetchData(USER_API, 'blockAccount', FORM2);
                if (REULST_BLOCK.status) {
                    await sweetAlert(2, 'Tu cuenta ha sido bloqueada por 24 horas debido a múltiples intentos fallidos.', false);
                }
            } else {
                const REULST_INCREMENT = await fetchData(USER_API, 'incrementFailedAttempts', FORM2);
                if (REULST_INCREMENT.status) {
                    await sweetAlert(2, `Contraseña incorrecta. Tienes ${3 - newFailedAttempts} intentos restantes.`, false);
                }
            }
        }
    }

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



