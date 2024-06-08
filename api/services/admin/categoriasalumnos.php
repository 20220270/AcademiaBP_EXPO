<?php
// Se incluye la clase del modelo.
require_once('../../models/data/categoriasalumnos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $categoriasalumnos = new CategoriasAlunmosData;
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
                } elseif ($result['dataset'] = $categoriasalumnos->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;


                //Categorías de alumnos

            case 'createRowAlumno':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$categoriasalumnos->setNombreCategoria($_POST['nombreCategoriaAlumno']) or
                    !$categoriasalumnos->setEdadMaxima($_POST['edadMaximaAlumno']) or
                    !$categoriasalumnos->setNivel($_POST['selectNivelCompetencia']) or
                    !$categoriasalumnos->setIdHorarios($_POST['selectHorarioEntrenamiento']) or
                    !$categoriasalumnos->setImagenCategoria($_FILES['imagenCategoriaEntrenamiento'], $categoriasalumnos->getFilename())
                ) {
                    $result['error'] = $categoriasalumnos->getDataError();
                } elseif ($categoriasalumnos->createRowAlumno()) {
                    $result['status'] = 1;
                    $result['message'] = 'Categoría agregada correctamente';
                    // Se asigna el estado del archivo después de insertar.
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenCategoriaEntrenamiento'], $categoriasalumnos::RUTA_IMAGEN, $categoriasalumnos->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la categoria';
                }
                break;
            case 'readAllAlumno':
                if ($result['dataset'] = $categoriasalumnos->readAllAlumno()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen categorias registrados';
                }
                break;

            case 'readAllHorariosCombo':
                if ($result['dataset'] = $categoriasalumnos->readAllHorariosCombo()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen categorias registrados';
                }
                break;

            case 'readNivelesAlumnos':
                if ($result['dataset'] = $categoriasalumnos->readNivelesAlumnos()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen categorias registrados';
                }
                break;

            case 'readOneAlumno':
                if (!$categoriasalumnos->setIdCategoria($_POST['idCategoriaAlumno'])) {
                    $result['error'] = $categoriasalumnos->getDataError();
                } elseif ($result['dataset'] = $categoriasalumnos->readOneAlumno()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Categoria inexistente';
                }
                break;

            case 'updateRowAlumno':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$categoriasalumnos->setIdCategoria($_POST['idCategoriaAlumno']) or
                    !$categoriasalumnos->setFilename() or
                    !$categoriasalumnos->setNombreCategoria($_POST['nombreCategoriaAlumno']) or
                    !$categoriasalumnos->setEdadMaxima($_POST['edadMaximaAlumno']) or
                    !$categoriasalumnos->setIdCategoria($_POST['selectNivelCompetencia']) or
                    !$categoriasalumnos->setIdHorarios($_POST['selectHorarioEntrenamiento']) or
                    !$categoriasalumnos->setImagenCategoria($_FILES['imagenCategoriaEntrenamiento'], $categoriasalumnos->getFilename())
                ) {
                    $result['error'] = $categoriasalumnos->getDataError();
                } elseif ($categoriasalumnos->updateRowAlumno()) {
                    $result['status'] = 1;
                    $result['message'] = 'Campo de categoria modificado correctamente';

                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenCategoriaEntrenamiento'], $categoriasalumnos::RUTA_IMAGEN, $categoriasalumnos->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la categoria';
                }
                break;

            case 'deleteRowAlumno':
                if (
                    $categoriasalumnos->setIdCategoria($_POST['idCategoriaAlumno']) or
                    !$categoriasalumnos->setFilename()
                ) {
                    $result['error'] = $categoriasalumnos->getDataError();
                } elseif ($categoriasalumnos->deleteRowAlumno()) {
                    $result['status'] = 1;
                    $result['message'] = 'Nivel eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($categoriasalumnos::RUTA_IMAGEN, $categoriasalumnos->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar esta categoria';
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
