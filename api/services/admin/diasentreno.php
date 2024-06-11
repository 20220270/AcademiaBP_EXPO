<?php
// Se incluye la clase del modelo.
require_once('../../models/data/diasentreno_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $diasentreno = new DiasPagoData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $diasentreno->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$diasentreno->setNumeroDias($_POST['numeroDias']) or
                    !$diasentreno->setPago($_POST['precioDia'])
                ) {
                    $result['error'] = $diasentreno->getDataError();
                } elseif ($diasentreno->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Dia y pago registrados correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar el día y el pago';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $diasentreno->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen días y pagos registrados';
                }
                break;
            case 'readOne':
                if (!$diasentreno->setId($_POST['idDiasPago'])) {
                    $result['error'] = $diasentreno->getDataError();
                } elseif ($result['dataset'] = $diasentreno->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Día y pago inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$diasentreno->setId($_POST['idDiasPago']) or
                    !$diasentreno->setNumeroDias($_POST['numeroDias']) or
                    !$diasentreno->setPago($_POST['precioDia'])
                ) {
                    $result['error'] = $diasentreno->getDataError();
                } elseif ($diasentreno->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Día y pago modificados correctamente';
                    
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el día y pago';
                }
                break;
            case 'deleteRow':
                if (
                    !$diasentreno->setId($_POST['idDiasPago'])
                ) {
                    $result['error'] = $diasentreno->getDataError();
                } elseif ($diasentreno->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Día y pago eliminados correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el día y pago';
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