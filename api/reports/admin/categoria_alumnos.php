<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se verifica si existe un valor para la categoría, de lo contrario se muestra un mensaje.
if (isset($_GET['idCategoriaAlumno'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/categoriasalumnos_data.php');
    require_once('../../models/data/alumnos_data.php');
    // Se instancian las entidades correspondientes.
    $categoriaalumno = new CategoriasAlunmosData;
    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($categoriaalumno->setIdCategoria($_GET['idCategoriaAlumno'])) {
        // Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
        if ($rowcategoriaalumno = $categoriaalumno->readOneAlumno()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Alumnos de la categoría ' . $rowcategoriaalumno['categoria']);
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($datacategoriaalumno = $categoriaalumno->readAllCategoriasAlumnosReport()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(64, 136, 64);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 9);
                $pdf->setTextColor(255, 255, 255);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(90, 10, 'Nombre del alumno', 1, 0, 'C', 1);
                $pdf->cell(35, 10, 'Edad', 1, 0, 'C', 1);
                $pdf->cell(55, 10, 'Nivel de competencia', 1, 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 10);
                $pdf->setTextColor(0, 0, 0);
                // Se recorren los registros fila por fila.
                foreach ($datacategoriaalumno as $rowAlumnos) {
                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(90, 10, $pdf->encodeString($rowAlumnos['Nombre']), 1, 0, 'C');
                    $pdf->cell(35, 10, $pdf->encodeString($rowAlumnos['edad'] . ' años'), 1, 0, 'C');
                    $pdf->cell(55, 10, $pdf->encodeString($rowAlumnos['nivel_entrenamiento']), 1, 1, 'C');
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay alumnos dentro de esta categoría'), 1, 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'alumnos_categoria.pdf');
        } else {
            print('Categoría inexistente');
        }
    } else {
        print('Categoría incorrecto');
    }
} else {
    print('Debe seleccionar una categoría');
}
?>
