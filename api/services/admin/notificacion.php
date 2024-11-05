<?php
// Se incluye la clase del modelo.
require_once('../../models/data/notificaciones_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $notificacion = new NotificacionesData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $notificacion->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;

                
            case 'readAll':
                if (!$notificacion->setIdNivel($_POST['idAdmin'])) {
                    $result['error'] = $notificacion->getDataError();
                } elseif ($result['dataset'] = $notificacion->readAll()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Notificaciones inexistentes';
                }
                break;

            case 'readAll2':
                if ($result['dataset'] = $notificacion->readAll2()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen notificaciones registradas';
                }
                break;


            case 'readOne':
                if (!$notificacion->setId($_POST['idNotificacion'])) {
                    $result['error'] = $notificacion->getDataError();
                } elseif ($result['dataset'] = $notificacion->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Notificación inexistente';
                }
                break;
            case 'deleteRow':
                if (
                    !$notificacion->setId($_POST['idNotificacion'])
                ) {
                    $result['error'] = $notificacion->getDataError();
                } elseif ($notificacion->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Notificación eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la notificación';
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
