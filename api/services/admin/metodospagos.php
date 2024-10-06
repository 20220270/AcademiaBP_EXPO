<?php
// Se incluye la clase del modelo.
require_once('../../models/data/metodospagos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $metodospagos = new MetodosPagosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $metodospagos->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;

            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$metodospagos->setNombre($_POST['nombreMetodo']) or
                    !$metodospagos->setImagen($_FILES['imagenMetodo'])
                ) {
                    $result['error'] = $metodospagos->getDataError();
                } else {
                    try {
                        if ($metodospagos->createRow()) {
                            $result['status'] = 1;
                            $result['message'] = 'Método de pago registrado correctamente';
                            // Asigna el estado del archivo después de insertar.
                            $result['fileStatus'] = Validator::saveFile($_FILES['imagenMetodo'], $metodospagos::RUTA_IMAGEN);
                        } else {
                            $result['error'] = 'No se pudo crear el método de pago, puede que ya exista un método de pago con el mismo nombre';
                        }
                    } catch (Exception $e) {
                        $result['error'] = 'Error al crear el aliado: ' . $e->getMessage();
                    }
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $metodospagos->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen métodos de pago registrados';
                }
                break;
            case 'readOne':
                if (!$metodospagos->setId($_POST['idMetodoPago'])) {
                    $result['error'] = $metodospagos->getDataError();
                } elseif ($result['dataset'] = $metodospagos->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Método de pago inexistente';
                }
                break;

            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$metodospagos->setId($_POST['idMetodoPago']) or
                    !$metodospagos->setFilename() or
                    !$metodospagos->setNombre($_POST['nombreMetodo']) or
                    !$metodospagos->setImagen($_FILES['imagenMetodo'], $metodospagos->getFilename())
                ) {
                    $result['error'] = $metodospagos->getDataError();
                } else {
                    try {
                        if ($metodospagos->updateRow()) {
                            $result['status'] = 1;
                            $result['message'] = 'Método de pago modificado correctamente';
                            // Se asigna el estado del archivo después de actualizar.
                            $result['fileStatus'] = Validator::changeFile($_FILES['imagenMetodo'], $metodospagos::RUTA_IMAGEN, $metodospagos->getFilename());
                        } else {
                            $result['error'] = 'No se pudo modificar el método de pago, puede que ya exista un registro con el mismo nombre';
                        }
                    } catch (Exception $e) {
                        $result['error'] = 'Error al modificar el método de pago: ' . $e->getMessage();
                    }
                }
                break;
            case 'deleteRow':
                if (
                    !$metodospagos->setId($_POST['idMetodoPago']) or
                    !$metodospagos->setFilename()
                ) {
                    $result['error'] = $metodospagos->getDataError();
                } elseif ($metodospagos->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Método de pago eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($metodospagos::RUTA_IMAGEN, $metodospagos->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el método de pago';
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
