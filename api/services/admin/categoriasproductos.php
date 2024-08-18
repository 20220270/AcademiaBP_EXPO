<?php
// Se incluye la clase del modelo.
require_once('../../models/data/categoriasproductos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $categoria = new CategoriaProductosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $categoria->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$categoria->setNombre($_POST['nombreCategoriaProducto']) ||
                    !$categoria->setImagen($_FILES['imagenCategoriaProducto'])
                ) {
                    $result['error'] = $categoria->getDataError();
                } else {
                    try {
                        if ($categoria->createRow()) {
                            $result['status'] = 1;
                            $result['message'] = 'Categoría creada correctamente';
                            // Se asigna el estado del archivo después de insertar.
                            $result['fileStatus'] = Validator::saveFile($_FILES['imagenCategoriaProducto'], $categoria::RUTA_IMAGEN);
                        } else {
                            $result['error'] = 'No se pudo crear la categoría, puede que ya exista un registro con el mismo nombre';
                        }
                    } catch (Exception $e) {
                        $result['error'] = 'Error al crear la categoría: ' . $e->getMessage();
                    }
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $categoria->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen categorías registradas';
                }
                break;
            case 'readOne':
                if (!$categoria->setId($_POST['idCategoriaProducto'])) {
                    $result['error'] = $categoria->getDataError();
                } elseif ($result['dataset'] = $categoria->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Categoría inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$categoria->setId($_POST['idCategoriaProducto']) ||
                    !$categoria->setFilename() ||
                    !$categoria->setNombre($_POST['nombreCategoriaProducto']) ||
                    !$categoria->setImagen($_FILES['imagenCategoriaProducto'], $categoria->getFilename())
                ) {
                    $result['error'] = $categoria->getDataError();
                } else {
                    try {
                        if ($categoria->updateRow()) {
                            $result['status'] = 1;
                            $result['message'] = 'Categoría modificada correctamente';
                            // Se asigna el estado del archivo después de actualizar.
                            $result['fileStatus'] = Validator::changeFile($_FILES['imagenCategoriaProducto'], $categoria::RUTA_IMAGEN, $categoria->getFilename());
                        } else {
                            $result['error'] = 'No se pudo modificar la categoría, puede que ya exista un registro con el mismo nombre';
                        }
                    } catch (Exception $e) {
                        $result['error'] = 'Error al modificar la categoría: ' . $e->getMessage();
                    }
                }
                break;
            case 'deleteRow':
                if (
                    !$categoria->setId($_POST['idCategoriaProducto']) or
                    !$categoria->setFilename()
                ) {
                    $result['error'] = $categoria->getDataError();
                } elseif ($categoria->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoría eliminada correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($categoria::RUTA_IMAGEN, $categoria->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la categoría';
                }
                break;

            case 'readTopproductosCategoria':
                // Lee el JSON del cuerpo de la solicitud
                $data = json_decode(file_get_contents('php://input'), true);

                // Verifica si se ha recibido 'idCategoriaAlumno'
                if (!isset($data['idCategoriaProducto']) || !$categoria->setId($data['idCategoriaProducto'])) {
                    $result['error'] = 'El identificador de la categoría es incorrecto';
                } elseif ($result['dataset'] = $categoria->readTopproductosCategoria()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Categoría inexistente';
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
