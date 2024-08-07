<?php
// Se incluye la clase del modelo.
require_once('../../models/data/administradores_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $administrador = new AdministradorData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $administrador->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administrador->setNombre($_POST['nombreAdministrador']) or
                    !$administrador->setApellido($_POST['apellidoAdministrador']) or
                    !$administrador->setDUI($_POST['duiAdministrador']) or
                    !$administrador->setCorreo($_POST['correoAdministrador']) or
                    !$administrador->setTelefono($_POST['telefonoAdministrador']) or
                    !$administrador->setAlias($_POST['aliasAdministrador']) or
                    !$administrador->setClave($_POST['claveAdministrador']) or
                    !$administrador->setEstado($_POST['selectEstado']) or
                    !$administrador->setNivel($_POST['selectNivelAdmin']) or
                    !$administrador->setImagen($_FILES['fotoAdmin'], $administrador->getFilename())
                ) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($_POST['claveAdministrador'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($administrador->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador creado correctamente';
                    $result['fileStatus'] = Validator::changeFile($_FILES['fotoAdmin'], $administrador::RUTA_IMAGEN, $administrador->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el administrador';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $administrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen administradores registrados';
                }
                break;
            case 'readOne':
                if (!$administrador->setId($_POST['idAdministrador'])) {
                    $result['error'] = 'Administrador incorrecto';
                } elseif ($result['dataset'] = $administrador->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Administrador inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administrador->setId($_POST['idAdministrador']) or
                    !$categoria->setFilename() or
                    !$administrador->setEstado($_POST['selectEstado']) or
                    !$administrador->setNivel($_POST['selectNivelAdmin']) or
                    !$administrador->setImagen($_FILES['fotoAdmin'], $administrador->getFilename())
                ) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador modificado correctamente';
                    $result['fileStatus'] = Validator::changeFile($_FILES['fotoAdmin'], $administrador::RUTA_IMAGEN, $administrador->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el administrador';
                }
                break;
            case 'deleteRow':
                if ($_POST['idAdministrador'] == $_SESSION['idAdministrador']) {
                    $result['error'] = 'No se puede eliminar a sí mismo';
                } elseif (!$administrador->setId($_POST['idAdministrador'])) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el administrador';
                }
                break;
            case 'getUser':
                if (isset($_SESSION['aliasAdministrador'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['aliasAdministrador'];
                } else {
                    $result['error'] = 'Alias de administrador indefinido';
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
                if ($result['dataset'] = $administrador->readProfile()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Ocurrió un problema al leer el perfil';
                }
                break;
            case 'editProfile':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$administrador->setId($_SESSION['idAdministrador']) or
                    !$administrador->setFilename() or
                    !$administrador->setNombre($_POST['nombreAdministrador']) or

                    !$administrador->setApellido($_POST['apellidoAdministrador']) or
                    !$administrador->setDUI($_POST['duiAdministrador']) or
                    !$administrador->setCorreo($_POST['correoAdministrador']) or
                    !$administrador->setTelefono($_POST['telefonoAdministrador']) or
                    !$administrador->setAlias($_POST['aliasAdministrador']) or
                    !$administrador->setImagen($_FILES['fotoInput'], $administrador->getFilename())
                ) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->editProfile()) {
                    $result['status'] = 1;
                    $result['message'] = 'Perfil modificado correctamente';
                    $_SESSION['aliasAdministrador'] = $_POST['aliasAdministrador'];
                    $result['fileStatus'] = Validator::changeFile($_FILES['fotoInput'], $administrador::RUTA_IMAGEN, $administrador->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el perfil';
                }
                break;
            case 'changePassword':
                $_POST = Validator::validateForm($_POST);
                if (!$administrador->checkPassword($_POST['claveActual'])) {
                    $result['error'] = 'Contraseña actual incorrecta';
                } elseif ($_POST['claveNueva'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Confirmación de contraseña diferente';
                } elseif (!$administrador->setClave($_POST['claveNueva'])) {
                    $result['error'] = $administrador->getDataError();
                } elseif ($administrador->changePassword()) {
                    $result['status'] = 1;
                    $result['message'] = 'Contraseña cambiada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cambiar la contraseña';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // Se compara la acción a realizar cuando el administrador no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readUsers':
                if ($administrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Debe autenticarse para ingresar';
                } else {
                    $resul7t['error'] = 'Debe crear un administrador para comenzar';
                }
                break;

            case 'signUp':
                $_POST = Validator::validateForm($_POST);

                // Verificar si ya existe un usuario registrado
                if ($administrador->countUsers() > 0) {
                    $result['error'] = 'Ya existe un administrador registrado';
                } else {
                    if (
                        !$administrador->setNombre($_POST['nombreAdministrador']) or
                        !$administrador->setApellido($_POST['apellidoAdministrador']) or
                        !$administrador->setDUI($_POST['duiAdministrador']) or
                        !$administrador->setCorreo($_POST['correoAdministrador']) or
                        !$administrador->setTelefono($_POST['telefonoAdministrador']) or
                        !$administrador->setAlias($_POST['aliasAdministrador']) or
                        !$administrador->setClave($_POST['claveAdministrador']) or
                        !$administrador->setEstado($_POST['selectEstado']) or
                        !$administrador->setNivel($_POST['selectNivelAdmin'])
                    ) {
                        $result['error'] = $administrador->getDataError();
                    } elseif ($_POST['claveAdministrador'] != $_POST['confirmarClave']) {
                        $result['error'] = 'Contraseñas diferentes';
                    } elseif ($administrador->createRow()) {
                        $result['status'] = 1;
                        $result['message'] = 'Administrador registrado correctamente';
                    } else {
                        $result['error'] = 'Ocurrió un problema al registrar el administrador';
                    }
                }
                break;
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if ($administrador->checkUser($_POST['usuarioAdmin'], $_POST['contraseñaAdmin'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'Credenciales incorrectas';
                }
                break;
            case 'checkCorreo':
                    if (!$administrador->setCorreo($_POST['inputCorreo'])) {
                        $result['error'] = $administrador->getDataError();
                    } elseif ($result['dataset'] = $administrador->checkCorreo()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'administrador inexistente';
                    }
                    break;
            case 'updateClave':
                    $_POST = Validator::validateForm($_POST);
                    if (
                                !$administrador->setCorreo($_POST['inputCorreo']) or
                                !$administrador->setClave($_POST['nuevaClave'])
                                ) {
                                $result['error'] = $administrador->getDataError();
                         }elseif ($_POST['nuevaClave'] != $_POST['confirmarClave']) {
                                $result['error'] = 'Contraseñas diferentes';} 
                        elseif ($administrador->updateClave()) {
                                $result['status'] = 1;
                                $result['message'] = 'Contraseña actualizada correctamente';
                        } else {
                                $result['error'] = 'Ocurrió un problema al actualizar la contraseña';
                        }
                        break;
            case 'checkEmail':
                // Verificar si se proporcionó un correo electrónico en la solicitud
                if (isset($_POST['email'])) {
                    // Se verifica si el correo electrónico existe en la base de datos
                    $emailExists = $administrador->checkEmailExists($_POST['inputCorreo']);
                    // Se prepara la respuesta
                    $response = array(
                        'status' => 1,
                        'emailExists' => $emailExists
                    );
                    // Se imprime la respuesta en formato JSON
                    echo json_encode($response);
                } else {
                    // Si no se proporcionó un correo electrónico, se devuelve un error
                    echo json_encode(array('status' => 0, 'message' => 'No se proporcionó un correo electrónico.'));
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
