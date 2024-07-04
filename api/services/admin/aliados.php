<?php
// Se incluye la clase del modelo.
require_once('../../models/data/aliados_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $aliados = new AliadosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $aliados->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;

            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$aliados->setNombre($_POST['nombreAliado']) or
                    !$aliados->setLogo($_FILES['imagenAliado'])
                ) {
                    $result['error'] = $aliados->getDataError();
                } else {
                    try {
                        if ($aliados->createRow()) {
                            $result['status'] = 1;
                            $result['message'] = 'Aliado registrado correctamente';
                            // Asigna el estado del archivo después de insertar.
                            $result['fileStatus'] = Validator::saveFile($_FILES['imagenAliado'], $aliados::RUTA_IMAGEN);
                        } else {
                            $result['error'] = 'No se pudo crear el aliado, puede que ya exista un aliado con el mismo nombre';
                        }
                    } catch (Exception $e) {
                        $result['error'] = 'Error al crear el aliado: ' . $e->getMessage();
                    }
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $aliados->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen aliados registrados';
                }
                break;
            case 'readOne':
                if (!$aliados->setId($_POST['idAliado'])) {
                    $result['error'] = $aliados->getDataError();
                } elseif ($result['dataset'] = $aliados->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Aliado inexistente';
                }
                break;

            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$aliados->setId($_POST['idAliado']) or
                    !$aliados->setFilename() or
                    !$aliados->setNombre($_POST['nombreAliado']) or
                    !$aliados->setLogo($_FILES['imagenAliado'], $aliados->getFilename())
                ) {
                    $result['error'] = $aliados->getDataError();
                } else {
                    try {
                        if ($aliados->updateRow()) {
                            $result['status'] = 1;
                            $result['message'] = 'Aliado modificado correctamente';
                            // Se asigna el estado del archivo después de actualizar.
                            $result['fileStatus'] = Validator::changeFile($_FILES['imagenAliado'], $aliados::RUTA_IMAGEN, $aliados->getFilename());
                        } else {
                            $result['error'] = 'No se pudo modificar el aliado, puede que ya exista un registro con el mismo nombre';
                        }
                    } catch (Exception $e) {
                        $result['error'] = 'Error al modificar el aliado: ' . $e->getMessage();
                    }
                }
                break;
            case 'deleteRow':
                if (
                    !$aliados->setId($_POST['idAliado']) or
                    !$aliados->setFilename()
                ) {
                    $result['error'] = $aliados->getDataError();
                } elseif ($aliados->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Aliado eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($aliados::RUTA_IMAGEN, $aliados->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar a este aliado';
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
