<?php
// Se incluye la clase del modelo.
require_once('../../models/data/valores_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $valores = new ValoresData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $valores->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;

            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$valores->setNombre($_POST['nombreValor']) or
                    !$valores->setDescripcion($_POST['descripcionValor']) or
                    !$valores->setImagen($_FILES['imagenValor'])
                ) {
                    $result['error'] = $valores->getDataError();
                } else {
                    try {
                        if ($valores->createRow()) {
                            $result['status'] = 1;
                            $result['message'] = 'Valor registrado correctamente';
                            // Asigna el estado del archivo después de insertar.
                            $result['fileStatus'] = Validator::saveFile($_FILES['imagenValor'], $valores::RUTA_IMAGEN);
                        } else {
                            $result['error'] = 'No se pudo crear el valor, puede que ya exista un valor con el mismo nombre';
                        }
                    } catch (Exception $e) {
                        $result['error'] = 'Error al crear el valor: ' . $e->getMessage();
                    }
                }
                break;

            case 'readAll':
                if ($result['dataset'] = $valores->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen valores registrados';
                }
                break;
            case 'readOne':
                if (!$valores->setId($_POST['idValor'])) {
                    $result['error'] = $valores->getDataError();
                } elseif ($result['dataset'] = $valores->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Valor inexistente';
                }
                break;

            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$valores->setId($_POST['idValor']) or
                    !$valores->setFilename() or
                    !$valores->setNombre($_POST['nombreValor']) or
                    !$valores->setDescripcion($_POST['descripcionValor']) or
                    !$valores->setImagen($_FILES['imagenValor'], $valores->getFilename())
                ) {
                    $result['error'] = $valores->getDataError();
                } else {
                    try {
                        if ($valores->updateRow()) {
                            $result['status'] = 1;
                            $result['message'] = 'Valor modificada correctamente';
                            // Se asigna el estado del archivo después de actualizar.
                            $result['fileStatus'] = Validator::changeFile($_FILES['imagenValor'], $valores::RUTA_IMAGEN, $valores->getFilename());
                        } else {
                            $result['error'] = 'No se pudo modificar el valor, puede que ya exista un registro con el mismo nombre';
                        }
                    } catch (Exception $e) {
                        $result['error'] = 'Error al modificar la categoría: ' . $e->getMessage();
                    }
                }
                break;

            case 'deleteRow':
                if (
                    !$valores->setId($_POST['idValor']) or
                    !$valores->setFilename()
                ) {
                    $result['error'] = $valores->getDataError();
                } elseif ($valores->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Valor eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($valores::RUTA_IMAGEN, $valores->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar este valor';
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
