<?php
// Se incluye la clase del modelo.
require_once('../../models/data/pagosmensualidad_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $pagos = new PagosMensualidadData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search2'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $pagos->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;

            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$pagos->setCuotasAnuales($_POST['cuotasApagar']) or
                    !$pagos->setIdAlumnoCliente($_POST['SelectDatosPago']) or
                    !$pagos->setEstado($_POST['selectEstado'])
                ) {
                    $result['error'] = $pagos->getDataError();
                } elseif ($pagos->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Pago registrado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar el pago';
                }
                break;

            case 'readAll':
                if ($result['dataset'] = $pagos->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen pagos registradas';
                }
                break;

            case 'readOne':
                if (!$pagos->setIdPago($_POST['idPagoARealizar'])) {
                    $result['error'] = $pagos->getDataError();
                } elseif ($result['dataset'] = $pagos->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Orden inexistente';
                }
                break;



            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$pagos->setIdPago($_POST['idPagoARealizar']) or
                    !$pagos->setCuotasAnuales($_POST['cuotasApagar']) or
                    !$pagos->setIdAlumnoCliente($_POST['SelectDatosPago']) or
                    !$pagos->setEstado($_POST['selectEstado'])
                ) {
                    $result['error'] = $pagos->getDataError();
                } elseif ($pagos->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Datos actualizados correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar este dato';
                }
                break;

            case 'deleteRow':
                if (
                    !$pagos->setIdPago($_POST['idPagoARealizar'])
                ) {
                    $result['error'] = $pagos->getDataError();
                } elseif ($pagos->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Datos del pago eliminados correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar los datos del pago';
                }
                break;

            case 'readAllAlumnosCliente':
                if ($result['dataset'] = $pagos->readAllAlumnosCliente()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen pagos registradas';
                }
                break;

            case 'readAlumnosTotal':
                if ($result['dataset'] = $pagos->readAlumnosTotal()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen pagos registradas';
                }
                break;
            case 'readAlumnosSolventes':
                if ($result['dataset'] = $pagos->readAlumnosSolventes()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen pagos registradas';
                }
                break;
            case 'readAlumnosSinPagar':
                if ($result['dataset'] = $pagos->readAlumnosSinPagar()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen pagos registradas';
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
