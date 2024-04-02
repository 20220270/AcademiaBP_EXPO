const container = document.getElementById('container');

const registrarBtn = document.getElementById('registrarse');

const iniciarBtn = document.getElementById('iniciar_sesion');

registrarBtn.addEventListener('click', () => {
    container.classList.add("active");
});

iniciarBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar el input de contraseña
    var inputContrasena = document.getElementById('contraseña');
    
    // Variable para controlar si el popup ya se ha mostrado
    var popupMostrado = false;

    // Agregar evento 'click' al input de contraseña
    inputContrasena.addEventListener('click', function (event) {
        // Verificar si el popup ya se ha mostrado
        if (!popupMostrado) {
            // Generar contraseña segura
            var contrasenaGenerada = generarContrasenaSegura();

            // Crear un elemento div para el popup
            var popup = document.createElement('div');
            popup.classList.add('popup');
            popup.textContent = 'Tu contraseña generada es: ' + contrasenaGenerada + ' puedes usarla o ingresa tu contraseña propia';

            // Posicionar el popup encima del input de contraseña
            var rect = inputContrasena.getBoundingClientRect();
            popup.style.top = rect.top - popup.offsetHeight - 10 + 'px'; // Posición arriba del input
            popup.style.left = rect.left + 'px'; // Misma posición horizontal que el input

            // Agregar el popup al cuerpo del documento
            document.body.appendChild(popup);

            // Cambiar el valor de la variable de control
            popupMostrado = true;

            // Colocar la contraseña generada en el input de contraseña al hacer clic en el popup
            popup.addEventListener('click', function () {
                inputContrasena.value = contrasenaGenerada;
                // Eliminar el popup después de colocar la contraseña en el input
                popup.remove();
                // Restablecer el valor de la variable de control después de eliminar el popup
                popupMostrado = false;
            });

            // Eliminar el popup después de 3 segundos si no se hace clic en él
            setTimeout(function () {
                if (popup.parentNode) {
                    popup.remove();
                    // Restablecer el valor de la variable de control después de eliminar el popup
                    popupMostrado = false;
                }
            }, 3000);
        }
    });

    

    // Función para generar una contraseña segura
    function generarContrasenaSegura() {
        // Definir caracteres permitidos en la contraseña
        var caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
        var longitud = 12; // Longitud de la contraseña

        var contrasena = '';
        for (var i = 0; i < longitud; i++) {
            var caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            contrasena += caracterAleatorio;
        }
        return contrasena;
    }
});