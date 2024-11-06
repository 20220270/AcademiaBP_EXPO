<?php
// Se incluye la clase del modelo.
require_once('../../models/data/soportetecnico_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $soporte = new SoporteTecnicoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $soporte->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;

            case 'readAll':
                if ($result['dataset'] = $soporte->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen datos registrados';
                }
                break;

            case 'readAllRecientes':
                if ($result['dataset'] = $soporte->readAllRecientes()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen datos registrados';
                }
                break;
            case 'readAllVistos':
                if ($result['dataset'] = $soporte->readAllVistos()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen datos registrados';
                }
                break;
            case 'readAllAtendidos':
                if ($result['dataset'] = $soporte->readAllAtendidos()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen datos registrados';
                }
                break;
            case 'readAllPendientes':
                if ($result['dataset'] = $soporte->readAllPendientes()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen datos registrados';
                }
                break;

            case 'readOne':
                if (!$soporte->setIdSoporte($_POST['idSoporte'])) {
                    $result['error'] = $soporte->getDataError();
                } elseif ($result['dataset'] = $soporte->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Dato inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$soporte->setIdSoporte($_POST['idSoporte']) or
                    !$soporte->setEstado($_POST['selectEstadoMensaje'])
                ) {
                    $result['error'] = $soporte->getDataError();
                } elseif ($soporte->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Estado del comentario modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el dato';
                }
                break;
            case 'deleteRow':
                if (
                    !$soporte->setIdSoporte($_POST['idSoporte'])
                ) {
                    $result['error'] = $soporte->getDataError();
                } elseif ($soporte->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Dato eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar este dato';
                }
                break;

                /*case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$valores->setNombre($_POST['nombreValor']) or
                    !$valores->setDescripcion($_POST['descripcionValor']) or
                    !$valores->setImagen($_FILES['imagenValor'])
                ) {
                    $result['error'] = $valores->getDataError();
                } elseif ($valores->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Valor agregado correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenValor'], $valores::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la categoría';
                }
                break;*/
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
