
const FORM_CORREO = document.getElementById("formCorreo");
const FORM_CONTRA = document.getElementById("formContra");
const API_CLIENTE = 'services/public/cliente.php';
const API_ADMIN = 'services/admin/administrador.php';

document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencia a los botones y a los contenedores
  var botonEnviarCorreo = document.getElementById("botonEnviarCorreo");
  var botonVerificarCodigo = document.getElementById("botonVerificarCodigo");
  var botonReenviarCorreo = document.getElementById("botonReenviarCodigo");
  var botonContra = document.getElementById("botonResetContra");
  var BOTONREGRESAR = document.getElementById("regresarBoton1");
  var BOTONREGRESAR2 = document.getElementById("regresarBoton2");
  var contenedor1 = document.querySelector(".contenedor1");
  var contenedor2 = document.querySelector(".contenedor2");
  var contenedor3 = document.querySelector(".contenedor3");


  botonEnviarCorreo.addEventListener("click", async function () {
    event.preventDefault();
    const CODIGO = generateRandomCode(8); // Puedes ajustar la longitud del código aquí

    const FORM = new FormData(FORM_CORREO);
    const DATA_CLIENTE = await fetchData(API_CLIENTE, 'checkCorreo', FORM);
    const DATA_ADMIN = await fetchData(API_ADMIN, 'checkCorreo', FORM);
    

    if (DATA_CLIENTE.status) {
      const NOMBRE = DATA_CLIENTE.dataset.nombre_cliente;
      // Enviar el correo y obtener la respuesta
      const RESPONSE_EMAIL = await enviarEmail(CODIGO, document.getElementById("inputCorreo").value, NOMBRE);
      if (RESPONSE_EMAIL) {
        localStorage.setItem("codigo", CODIGO);
        localStorage.setItem("email", document.getElementById("inputCorreo").value);
        sweetAlert(1, DATA_CLIENTE.message, true);
        // Ocultar contenedor1 y mostrar contenedor2
        contenedor1.style.display = "none";
        contenedor2.style.display = "block";

        // Centrar contenedor2 en la pantalla
        contenedor2.style.position = "absolute";
        contenedor2.style.top = "50%";
        contenedor2.style.left = "50%";
        contenedor2.style.transform = "translate(-62%, -50%)";
      } else {
        sweetAlert(2, DATA_CLIENTE.error, false);
      }
    }
    else if (DATA_ADMIN.status) {
      const NOMBRE = DATA_ADMIN.dataset.nombre_admistrador;
      // Enviar el correo y obtener la respuesta
      const RESPONSE_EMAIL = await enviarEmail(CODIGO, document.getElementById("inputCorreo").value, NOMBRE);
      if (RESPONSE_EMAIL) {
        localStorage.setItem("codigo", CODIGO);
        localStorage.setItem("email", document.getElementById("inputCorreo").value);
        sweetAlert(1, DATA_ADMIN.message, true);
        // Ocultar contenedor1 y mostrar contenedor2
        contenedor1.style.display = "none";
        contenedor2.style.display = "block";

        // Centrar contenedor2 en la pantalla
        contenedor2.style.position = "absolute";
        contenedor2.style.top = "50%";
        contenedor2.style.left = "50%";
        contenedor2.style.transform = "translate(-62%, -50%)";
      } else {
        sweetAlert(2, DATA_ADMIN.error, false);
      }
    }
    else {
      sweetAlert(2, "El correo ingresado no existe", false);
    }

});

  BOTONREGRESAR.addEventListener("click", function () {
    // Ocultar contenedor2 y mostrar contenedor3
    contenedor1.style.display = "block";
    contenedor2.style.display = "none";

    // Centrar contenedor3 en la pantalla
    contenedor1.style.position = "absolute";
    contenedor1.style.top = "50%";
    contenedor1.style.left = "50%";
    contenedor1.style.transform = "translate(-50%, -50%)";
  });

  // Agregar un event listener al botón botonVerificarCodigo
  botonVerificarCodigo.addEventListener("click", function () {
    event.preventDefault();
    // Ocultar contenedor2 y mostrar contenedor3
    const inputCodigo = document.getElementById("inputCodigo").value;

     if (inputCodigo === localStorage.getItem("codigo")) {

      sweetAlert(1, "El código ingresado es correcto", true);
      contenedor2.style.display = "none";
      contenedor3.style.display = "block";

      // Centrar contenedor3 en la pantalla
      contenedor3.style.position = "absolute";
      contenedor3.style.top = "50%";
      contenedor3.style.left = "50%";
      contenedor3.style.transform = "translate(-50%, -50%)";
    }
    else {
      sweetAlert(2, "El código ingresado es incorrecto", false);
    }

  });

  // Agregar un event listener al botón botonReenviarCorreo
  botonReenviarCorreo.addEventListener("click", async function () {
    event.preventDefault();
    const CODIGO = generateRandomCode(8); // Puedes ajustar la longitud del código aquí

    const FORM = new FormData(FORM_CORREO);
    const DATA_CLIENTE = await fetchData(API_CLIENTE, 'checkCorreo', FORM);
    const DATA_ADMIN = await fetchData(API_ADMIN, 'checkCorreo', FORM);

    if (DATA_CLIENTE.status) {
      const NOMBRE = DATA_CLIENTE.dataset.nombre_cliente;
      // Enviar el correo y obtener la respuesta
      const RESPONSE_EMAIL = await enviarEmail(CODIGO, document.getElementById("inputCorreo").value, NOMBRE);
      if (RESPONSE_EMAIL) {
        localStorage.setItem("codigo", CODIGO);
        localStorage.setItem("email", document.getElementById("inputCorreo").value);
        sweetAlert(1, DATA_CLIENTE.message, true);
        // Ocultar contenedor1 y mostrar contenedor2
        contenedor1.style.display = "none";
        contenedor2.style.display = "block";

        // Centrar contenedor2 en la pantalla
        contenedor2.style.position = "absolute";
        contenedor2.style.top = "50%";
        contenedor2.style.left = "50%";
        contenedor2.style.transform = "translate(-62%, -50%)";
      } else {
        sweetAlert(2, DATA_CLIENTE.error, false);
      }
    }
    else if (DATA_ADMIN.status) {
      const NOMBRE = DATA_ADMIN.dataset.nombre_admistrador;
      // Enviar el correo y obtener la respuesta
      const RESPONSE_EMAIL = await enviarEmail(CODIGO, document.getElementById("inputCorreo").value, NOMBRE);
      if (RESPONSE_EMAIL) {
        localStorage.setItem("codigo", CODIGO);
        localStorage.setItem("email", document.getElementById("inputCorreo").value);
        sweetAlert(1, DATA_ADMIN.message, true);
        // Ocultar contenedor1 y mostrar contenedor2
        contenedor1.style.display = "none";
        contenedor2.style.display = "block";

        // Centrar contenedor2 en la pantalla
        contenedor2.style.position = "absolute";
        contenedor2.style.top = "50%";
        contenedor2.style.left = "50%";
        contenedor2.style.transform = "translate(-62%, -50%)";
      } else {
        sweetAlert(2, DATA_ADMIN.error, false);
      }
    }
    else {
      sweetAlert(2, "El correo ingresado no existe", false);
    }
  });

  // Agregar un event listener al botón botonContra
  botonContra.addEventListener("click", async function () {
    event.preventDefault();
    const FORM = new FormData(FORM_CONTRA);
    const email = localStorage.getItem("email");
    console.log(FORM);
    console.log(email);
    FORM.append('inputCorreo', email);  

    const currentPath = window.location.pathname;
    if (currentPath.includes('public')) {
      const DATA = await fetchData(API_CLIENTE, 'updateClave', FORM);
      if (DATA.status) {
          sweetAlert(1, DATA.message, true, 'registrosesion.html');
      } else {
          sweetAlert(2, DATA.error, false);
      }
  }
  else if (currentPath.includes('admin')) {
      const DATA = await fetchData(API_ADMIN, 'updateClave', FORM);
      if (DATA.status) {
          sweetAlert(1, DATA.message, true, 'index.html');
      } else {
          sweetAlert(2, DATA.error, false);
      }
  }
  });


  BOTONREGRESAR2.addEventListener("click", function () {
    // Ocultar contenedor2 y mostrar contenedor3
    contenedor2.style.display = "block";
    contenedor3.style.display = "none";

    // Centrar contenedor3 en la pantalla
    contenedor2.style.position = "absolute";
    contenedor2.style.top = "50%";
    contenedor2.style.left = "50%";
    contenedor2.style.transform = "translate(-62%, -50%)";
  });
});



//Codigo para validar el ingreso de 8 caracteres dentro del input
document.addEventListener("DOMContentLoaded", function () {
  // Obtener referencia al inputCodigo
  var inputCodigo = document.getElementById("inputCodigo");

  // Agregar un event listener al campo de entrada inputCodigo
  inputCodigo.addEventListener("input", function () {
    // Obtener el valor actual del campo de entrada
    var codigo = inputCodigo.value;

    // Verificar si la longitud del código es mayor a 8
    if (inputCodigo.value.length > 8) {
      // Si es mayor a 8, recortar el valor a 8 caracteres
      inputCodigo.value = inputCodigo.value.slice(0, 8);
    }
  });
});

const enviarEmail = async (codigo, email, nombre) => {
  emailjs.init("ZCwp7xUNuwHcFUP60"); // Reemplaza con tu User ID de EmailJS

  const templateParams = {
    code: codigo,
    nombre: nombre,
    Academia: email,
  };

  try {
    const response = await emailjs.send('service_s2lfbj7', 'template_o3v4ckw', templateParams);
    console.log('Correo enviado exitosamente:', response.status, response.text);
    if (response.status !== 200) {
      throw new Error('Error al enviar el correo');
    }
    return true;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error;
  }
}


function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}




