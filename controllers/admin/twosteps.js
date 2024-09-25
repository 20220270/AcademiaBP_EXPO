const LOGIN = document.getElementById('sessionForm');
const SIGNUP = document.getElementById('FormValidacion');
const MODAL = new bootstrap.Modal('#modalRegistrasrte');
const USER_API = 'services/admin/administrador.php';

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    //loadTemplate();
    
    // Mostramos el formulario para iniciar sesión directamente sin verificar la sesión.
    LOGIN.classList.remove('d-none');
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
    event.preventDefault(); // Evita la recarga de la página.

    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(LOGIN);

    // Petición para verificar el código de autenticación.
    const DATA = await fetch('../../api/helpers/validar_codigo(admin).php', {
        method: 'POST',
        body: FORM
    }).then(response => response.json());

    // Se comprueba si la respuesta es undefined o no contiene un estado válido.
    if (!DATA) {
        // Muestra la alerta de "Código incorrecto".
        sweetAlert(2, "Código incorrecto o expirado", false);
    } else if (DATA.status) {
        // Si el código es correcto, redirige al menú.
        sweetAlert(1, DATA.message, true, 'menu.html');
    } else {
        // Si hubo un error con la validación del código.
        sweetAlert(2, DATA.message, false);
    }
});

