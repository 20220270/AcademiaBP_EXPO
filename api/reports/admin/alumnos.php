<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/alumnos_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

$pdf->startReportHorizontal('Alumnos registrados');

// Se instancian las entidades correspondientes.
$alumnos = new AlumnosData;

// Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
if ($dataalumnos = $alumnos->readAll()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(64, 136, 64);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 9);

    $pdf->setTextColor(255, 255, 255);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(95, 10, 'Nombre y foto', 1, 0, 'C', 1);
    $pdf->cell(45, 10, 'Fecha de nacimiento', 1, 0, 'C', 1);
    $pdf->cell(35, 10, 'Edad', 1, 0, 'C', 1);
    $pdf->cell(40, 10, $pdf->encodeString('Categoría'), 1, 0, 'C', 1);
    $pdf->cell(30, 10, $pdf->encodeString('Número de días'), 1, 1, 'C', 1);

    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Arial', '', 8);
    $pdf->setTextColor(0, 0, 0);

    // Se recorren los registros fila por fila.
    foreach ($dataalumnos as $rowAlumnos) {
        // Agrega la imagen desde la ruta especificada.
        $imgPath = "../../images/alumnos/" . $rowAlumnos['foto_alumno'];
        if (file_exists($imgPath)) {
            // Tamaño de la celda y de la imagen.
            $cellWidth = 30;
            $cellHeight = 30;
            $imgWidth = 20;
            $imgHeight = 20;

            // Calcula la posición para centrar la imagen dentro de la celda.
            $xPos = $pdf->GetX() + ($cellWidth - $imgWidth) / 2;
            $yPos = $pdf->GetY() + ($cellHeight - $imgHeight) / 2;

            // Dibuja la celda y luego la imagen centrada dentro de la celda.
            $pdf->cell($cellWidth, $cellHeight, '', 1, 0, 'C'); // Celda vacía con borde.
            $pdf->Image($imgPath, $xPos, $yPos, $imgWidth, $imgHeight); // Imagen centrada dentro de la celda.
        } else {
            $pdf->cell(30, 30, 'Sin foto', 1, 0, 'C');
        }

        // Imprime el nombre del alumno.
        $pdf->cell(65, 30, $pdf->encodeString($rowAlumnos['nombre']), 1, 0, 'C');
        $pdf->cell(45, 30, $rowAlumnos['fecha_nacimiento'], 1, 0, 'C');
        $pdf->cell(35, 30, $pdf->encodeString($rowAlumnos['edad'] . ' años'), 1, 0, 'C');
        $pdf->cell(40, 30, $pdf->encodeString($rowAlumnos['categoria']), 1, 0, 'C');
        $pdf->cell(30, 30, $rowAlumnos['numero_dias'], 1, 1, 'C');
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay administradores para mostrar'), 1, 1);
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'Administradores.pdf');
?>
