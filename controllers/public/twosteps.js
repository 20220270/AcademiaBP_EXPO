



// Constante para establecer el formulario de iniciar sesión.
const SIGNUP_FORM = document.getElementById('signupForm');
const MAIN_TITLE = document.getElementById('mainTitle');
const USER_API = 'services/public/cliente.php';


// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {

    MAIN_TITLE.textContent = 'Crear cuenta';
    // LLamada a la función para asignar el token del reCAPTCHA al formulario.
    reCAPTCHA();
    // Constante tipo objeto para obtener la fecha y hora actual.
    const TODAY = new Date();
    // Se declara e inicializa una variable para guardar el día en formato de 2 dígitos.
    let day = ('0' + TODAY.getDate()).slice(-2);
    // Se declara e inicializa una variable para guardar el mes en formato de 2 dígitos.
    let month = ('0' + (TODAY.getMonth() + 1)).slice(-2);
    // Se declara e inicializa una variable para guardar el año con la mayoría de edad.
    let year = TODAY.getFullYear() - 18;

});

// Método del evento para cuando se envía el formulario de registrar cliente.
SIGNUP_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SIGNUP_FORM);
    // Petición para registrar un cliente.
    const DATA = await fetchData(USER_API, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'registrosesion.html');
    } else if (DATA.recaptcha) {
        sweetAlert(2, DATA.error, false, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
        // Se genera un nuevo token cuando ocurre un problema.
        reCAPTCHA();
    }
});

/*
*   Función para obtener un token del reCAPTCHA y asignarlo al formulario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
function reCAPTCHA() {
    // Método para generar el token del reCAPTCHA.
    grecaptcha.ready(() => {
        // Constante para establecer la llave pública del reCAPTCHA.
        const PUBLIC_KEY = '6LdBzLQUAAAAAJvH-aCUUJgliLOjLcmrHN06RFXT';
        // Se obtiene un token para la página web mediante la llave pública.
        grecaptcha.execute(PUBLIC_KEY, { action: 'homepage' }).then((token) => {
            // Se asigna el valor del token al campo oculto del formulario
            document.getElementById('gRecaptchaResponse').value = token;
        });
    });
}

//Login

// Constante para establecer el formulario de iniciar sesión.
const SESSION_FORM = document.getElementById('sessionForm');
const MAIN_TITLE2 = document.getElementById('mainTitle');
const USERR_API = 'services/public/cliente.php';

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    //loadTemplate();
    // Se establece el título del contenido principal.
    MAIN_TITLE.textContent = '¡Regístrate!';
});

SESSION_FORM.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita la recarga de la página.

    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SESSION_FORM);

    // Petición para verificar el código de autenticación.
    const DATA = await fetch('../../api/helpers/validar_codigo(cliente).php', {
        method: 'POST',
        body: FORM
    }).then(response => response.json());

    // Se comprueba si la respuesta es undefined o no contiene un estado válido.
    if (!DATA) {
        // Muestra la alerta de "Código incorrecto".
        sweetAlert(2, "Código incorrecto o expirado", false);
    } else if (DATA.status) {
        // Si el código es correcto, redirige al menú.
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        // Si hubo un error con la validación del código.
        sweetAlert(2, DATA.message, false);
    }
});






  
const container = document.getElementById('container');

const registrarBtn = document.getElementById('registrarse');

const iniciarBtn = document.getElementById('iniciar_sesion');

registrarBtn.addEventListener('click', () => {
    container.classList.add("active");
});

iniciarBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', function() {
    const registerButton = document.getElementById('registrarse');
    const signupForm = document.getElementById('signupForm');

    // Hide signupForm initially on small and medium screens
    if (window.innerWidth <= 768) {
        signupForm.style.display = 'none';
    }

    registerButton.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            signupForm.style.display = signupForm.style.display === 'none' ? 'block' : 'none';
        }
    });
});
