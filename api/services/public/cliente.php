<?php
// Se incluye la clase del modelo.
require_once('../../models/data/clientes_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $cliente = new ClienteData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'recaptcha' => 0, 'message' => null, 'error' => null, 'exception' => null, 'username' => null);

    // Se verifica si existe una sesión iniciada como cliente para realizar las acciones correspondientes.
    if (isset($_SESSION['idCliente'])) {
        $result['session'] = 1;

        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            case 'getUser':
                if (isset($_SESSION['nombreCliente']) && isset($_SESSION['apellidoCliente'])) {
                    $result['status'] = 1;
                    $result['nombre'] = $_SESSION['nombreCliente'];
                    $result['apellido'] = $_SESSION['apellidoCliente'];
                    $result['username'] = $_SESSION['nombreCliente'] . ' ' . $_SESSION['apellidoCliente'];
                } else {
                    $result['error'] = 'Nombre de usuario indefinido';
                }
                break;
            case 'logOut':
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            case 'readProfile':
                if ($result['dataset'] = $cliente->readProfile()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un problema al leer el perfil';
                }
                break;

            case 'editProfile':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cliente->setId($_SESSION['idCliente']) or
                    !$cliente->setFilename() or
                    !$cliente->setNombre($_POST['nombreCliente']) or
                    !$cliente->setApellido($_POST['apellidoCliente']) or
                    !$cliente->setCorreo($_POST['correoCliente']) or
                    !$cliente->setDireccion($_POST['direccionCliente']) or
                    !$cliente->setDUI($_POST['duiCliente']) or
                    !$cliente->setTelefono($_POST['telefonoCliente']) or
                    !$cliente->setFotoCliente($_FILES['fotoInput'], $cliente->getFilename())
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->editProfile()) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil modificado correctamente';
                    $result['fileStatus'] = Validator::changeFile($_FILES['fotoInput'], $cliente::RUTA_IMAGEN, $cliente->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el perfil';
                }
                break;
            case 'changePassword':
                $_POST = Validator::validateForm($_POST);
                if (!$cliente->checkPassword($_POST['claveActual'])) {
                    $result['error'] = 'Contraseña actual incorrecta';
                } elseif ($_POST['claveNueva'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Confirmación de contraseña diferente';
                } elseif (!$cliente->setClave($_POST['claveNueva'])) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($cliente->changePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cambiar la contraseña';
                }
                break;

            case 'readAlumnos':
                if ($result['dataset'] = $cliente->readAlumnos()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No tienes alumnos registrados';
                }
                break;

            case 'readAllPagos':
                if ($result['dataset'] = $detallemensualidad->readAllPagos()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen detalles de pagos registrados';
                }
                break;

                //Evitamos el error de acción no disponible dentro de la sesión
              case 'logIn':
                $_POST = Validator::validateForm($_POST);
                
                // Verificar si el usuario existe
                if ($cliente->checkUserExists($_POST['correoCliente'])) {
                    // Obtener intentos fallidos y el tiempo de bloqueo
                    $intentosFallidos = $cliente->getFailedAttempts($_POST['correoCliente']);
                    $bloqueadoHasta = $cliente->getLockTime($_POST['correoCliente']);
                    
                    // Verificar si la cuenta está bloqueada
                    $ahora = time();
                    if ($bloqueadoHasta && $ahora < strtotime($bloqueadoHasta)) {
                        $result['error'] = 'Cuenta bloqueada. Intente de nuevo después de 24 horas.';
                    } else {
                        // Si no está bloqueada, proceder con la validación de la contraseña
                        if ($cliente->checkUser($_POST['correoCliente'], $_POST['claveCliente'])) {
                            // Resetear intentos fallidos si la autenticación es correcta
                            $cliente->resetFailedAttempts($_POST['correoCliente']);
                            $result['status'] = 1;
                            $result['message'] = 'Autenticación correcta';
                        } else {
                            // Incrementar los intentos fallidos
                            $cliente->incrementFailedAttempts($_POST['correoCliente']);
                            
                            // Obtener los nuevos intentos fallidos
                            $intentosFallidos = $cliente->getFailedAttempts($_POST['correoCliente']);
                            
                            if ($intentosFallidos >= 3) {
                                // Bloquear la cuenta por 24 horas si hay 3 intentos fallidos
                                $cliente->lockAccount($_POST['correoCliente'], date("Y-m-d H:i:s", $ahora + 24 * 60 * 60));
                                $result['error'] = 'Cuenta bloqueada por 24 horas debido a múltiples intentos fallidos.';
                            } else {
                                $result['error'] = 'Credenciales incorrectas. Intento ' . $intentosFallidos . ' de 3.';
                            }
                        }
                    }
                } else {
                    $result['error'] = 'El usuario no existe.';
                }
                break;

            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando el cliente no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'signUp':
                $_POST = Validator::validateForm($_POST);
                // Se establece la clave secreta para el reCAPTCHA de acuerdo con la cuenta de Google.
                $secretKey = '6LdBzLQUAAAAAL6oP4xpgMao-SmEkmRCpoLBLri-';

                //Código para verificar el token

                //Asignamos el token a una variable
                $token = $_POST['gRecaptchaResponse'];
                //$action = $_POST['action'];

                // Inicializa una nueva sesión cURL para realizar la solicitud HTTP.
                $ch = curl_init();

                // Establece la URL a la que se enviará la solicitud POST para verificar el reCAPTCHA.
                curl_setopt($ch, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify");

                // Indica que se usará el método POST en la solicitud HTTP.
                curl_setopt($ch, CURLOPT_POST, 1);

                // Define los datos que se enviarán en la solicitud POST. Se utiliza `http_build_query` 
                // para formatear los datos en un string de consulta HTTP (query string). 
                // Se envía la clave secreta del reCAPTCHA y el token de respuesta del usuario.
                curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array('secret' => $secretKey, 'response' => $token)));

                // Indica que se debe devolver el resultado de la solicitud como una cadena en lugar de mostrarlo directamente.
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

                // Ejecuta la solicitud y almacena la respuesta en la variable $response.
                $response = curl_exec($ch);

                // Cierra la sesión cURL para liberar recursos.
                curl_close($ch);

                // Decodifica la respuesta JSON del reCAPTCHA en un array asociativo de PHP.
                // $captcha ahora contiene los datos de la respuesta, que incluyen el estado de verificación (success/failure) 
                // y otros posibles mensajes o detalles.
                $captcha = json_decode($response, true);


                if (!$captcha['success']) {
                    $result['recaptcha'] = 1;
                    $result['error'] = 'No eres humano';
                } elseif (!isset($_POST['condicion'])) {
                    $result['error'] = 'Debe marcar la aceptación de términos y condiciones';
                } elseif (
                    !$cliente->setNombre($_POST['nombreCliente']) or
                    !$cliente->setApellido($_POST['apellidoCliente']) or
                    !$cliente->setCorreo($_POST['correoCliente']) or
                    !$cliente->setDireccion($_POST['direccionCliente']) or
                    !$cliente->setDUI($_POST['duiCliente']) or
                    !$cliente->setTelefono($_POST['telefonoCliente']) or
                    !$cliente->setClave($_POST['claveCliente'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($_POST['claveCliente'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($cliente->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cuenta registrada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar la cuenta';
                }
                break;

            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if (!$cliente->checkUser($_POST['correoCliente'], $_POST['claveCliente'])) {
                    $result['error'] = 'Datos incorrectos';
                } else {
                    // Establece el ID del cliente antes de verificar el estado.
                    $cliente->setId($cliente->getIdByEmail($_POST['correoCliente']));

                    // Verificamos el estado del cliente.
                    if ($cliente->checkStatus()) {
                        // Configura la sesión ya que el estado es activo.
                        $_SESSION['idCliente'] = $cliente->getIdByEmail($_POST['correoCliente']);
                        $_SESSION['correoCliente'] = $_POST['correoCliente'];

                        // Recupera el nombre y apellido del cliente y lo guarda en la sesión.
                        $perfil = $cliente->readProfile();
                        $_SESSION['nombreCliente'] = $perfil['nombre_cliente']; //Asignamos el nombre del cliente
                        $_SESSION['apellidoCliente'] = $perfil['apellido_cliente']; //Asignamos el apellido del cliente

                        $result['status'] = 1;
                        $result['message'] = 'Autenticación correcta';
                    } else {
                        $result['error'] = 'La cuenta ha sido desactivada';
                    }
                }
                break;
            case 'checkCorreo':
                if (!$cliente->setCorreo($_POST['inputCorreo'])) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($result['dataset'] = $cliente->checkCorreo()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Cliente inexistente';
                }
                break;
            case 'updateClave':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cliente->setCorreo($_POST['inputCorreo']) or
                    !$cliente->setClave($_POST['nuevaClave'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($_POST['nuevaClave'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($cliente->updateClave()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña actualizada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al actualizar la contraseña';
                }
                break;
            case 'signUpMovil':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$cliente->setNombre($_POST['nombreCliente']) or
                    !$cliente->setApellido($_POST['apellidoCliente']) or
                    !$cliente->setCorreo($_POST['correoCliente']) or
                    !$cliente->setDireccion($_POST['direccionCliente']) or
                    !$cliente->setDUI($_POST['duiCliente']) or
                    !$cliente->setTelefono($_POST['telefonoCliente']) or
                    !$cliente->setClave($_POST['claveCliente'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($_POST['claveCliente'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($cliente->signUpMovil()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cuenta registrada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar la cuenta';
                }
                break;


            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
