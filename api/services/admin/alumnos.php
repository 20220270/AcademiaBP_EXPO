<?php
// Se incluye la clase del modelo.
require_once('../../models/data/alumnos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $alumno = new AlumnosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $alumno->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$alumno->setNombre($_POST['nombreAlumno']) or
                    !$alumno->setApellido($_POST['apellidoAlumno']) or
                    !$alumno->setNacimiento($_POST['fechaNacimiento']) or
                    !$alumno->setPosicion($_POST['selectPosicion']) or
                    !$alumno->setIdStaffCategoria($_POST['selectCategoriaEncargado']) or
                    !$alumno->setIdDiasPago($_POST['selectDias']) or
                    !$alumno->setEstado($_POST['selectEstado']) or
                    !$alumno->setIdCliente($_POST['selectEncargado'])
                ) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($alumno->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Alumno registrada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar el alumno';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $alumno->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen alumnos registrados';
                }
                break;
            case 'readOne':
                if (!$alumno->setId($_POST['idAlumno'])) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($result['dataset'] = $alumno->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Alumno inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$alumno->setId($_POST['idAlumno']) or
                    !$alumno->setNombre($_POST['nombreAlumno']) or
                    !$alumno->setApellido($_POST['apellidoAlumno']) or
                    !$alumno->setNacimiento($_POST['fechaNacimiento']) or
                    !$alumno->setPosicion($_POST['selectPosicion']) or
                    !$alumno->setIdStaffCategoria($_POST['selectCategoriaEncargado']) or
                    !$alumno->setIdDiasPago($_POST['selectDias']) or
                    !$alumno->setEstado($_POST['selectEstado']) or
                    !$alumno->setIdCliente($_POST['selectEncargado'])
                ) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($alumno->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Alumno modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar datos del alumno';
                }
                break;
            case 'deleteRow':
                if (
                    !$alumno->setId($_POST['idAlumno'])
                ) {
                    $result['error'] = $alumno->getDataError();
                } elseif ($alumno->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Alumno eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el alumno';
                }
                break;

            case 'readAllStaffCategorias':
                if ($result['dataset'] = $alumno->readAllStaffCategorias()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen categorias y staff registrados';
                }
                break;

            case 'readAllDiasPago':
                if ($result['dataset'] = $alumno->readAllDiasPago()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen días y pagos registrados';
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
