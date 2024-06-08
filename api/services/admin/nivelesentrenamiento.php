<?php
// Se incluye la clase del modelo.
require_once('../../models/data/nivelesentrenamiento_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $nivelesentrenamiento = new NivelesEntrenamientoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {

                //Niveles de competencia
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $nivelesentrenamiento->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$nivelesentrenamiento->setNombre($_POST['nombreNivelEntrenamiento']) or
                    !$nivelesentrenamiento->setDescripcion($_POST['descripcionNivelEntrenamiento']) or
                    !$nivelesentrenamiento->setImagen($_FILES['imagenNivelEntrenamiento'])
                ) {
                    $result['error'] = $nivelesentrenamiento->getDataError();
                } elseif ($nivelesentrenamiento->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Nivel agregado correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenNivelEntrenamiento'], $nivelesentrenamiento::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el nivel';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $nivelesentrenamiento->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen nivelesentrenamiento registrados';
                }
                break;
            case 'readOne':
                if (!$nivelesentrenamiento->setId($_POST['idNivelEntrenamiento'])) {
                    $result['error'] = $nivelesentrenamiento->getDataError();
                } elseif ($result['dataset'] = $nivelesentrenamiento->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Nivel inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$nivelesentrenamiento->setId($_POST['idNivelEntrenamiento']) or
                    !$nivelesentrenamiento->setFilename() or
                    !$nivelesentrenamiento->setNombre($_POST['nombreNivelEntrenamiento']) or
                    !$nivelesentrenamiento->setDescripcion($_POST['descripcionNivelEntrenamiento']) or
                    !$nivelesentrenamiento->setImagen($_FILES['imagenNivelEntrenamiento'], $nivelesentrenamiento->getFilename())
                ) {
                    $result['error'] = $nivelesentrenamiento->getDataError();
                } elseif ($nivelesentrenamiento->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Campo del nivel modificado correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenNivelEntrenamiento'], $nivelesentrenamiento::RUTA_IMAGEN, $nivelesentrenamiento->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el nivel';
                }
                break;
            case 'deleteRow':
                if (
                    !$nivelesentrenamiento->setId($_POST['idNivelEntrenamiento']) or
                    !$nivelesentrenamiento->setFilename()
                ) {
                    $result['error'] = $nivelesentrenamiento->getDataError();
                } elseif ($nivelesentrenamiento->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Nivel eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($nivelesentrenamiento::RUTA_IMAGEN, $nivelesentrenamiento->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar este nivel';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
