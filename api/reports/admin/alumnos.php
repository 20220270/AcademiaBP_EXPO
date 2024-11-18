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
if ($dataalumnos = $alumnos->readAllReport()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(64, 136, 64);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 8);
    $pdf->setTextColor(255, 255, 255);

    // Se imprimen las celdas con los encabezados.
    $pdf->cell(78, 10, 'Nombre y foto', 1, 0, 'C', 1);
    $pdf->cell(35, 10, 'Fecha de nacimiento', 1, 0, 'C', 1);
    $pdf->cell(20, 10, 'Edad', 1, 0, 'C', 1);
    $pdf->cell(55, 10, $pdf->encodeString('Categoría'), 1, 0, 'C', 1);
    $pdf->cell(30, 10, $pdf->encodeString('Número de días'), 1, 0, 'C', 1);
    $pdf->cell(30, 10, $pdf->encodeString('Inscrito desde'), 1, 1, 'C', 1);

    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Arial', '', 6.8);
    $pdf->setTextColor(0, 0, 0);

    // Tamaño de la celda y de la imagen.
    $cellWidth = 18;
    $cellHeight = 18;
    $imgWidth = 13;
    $imgHeight = 13;

    // Se recorren los registros fila por fila.
    foreach ($dataalumnos as $rowAlumnos) {
        // Verificamos si es necesario agregar una nueva página.
        //Esto lo hacemos para evitar que las imagenes sobre salgan de sus celdas.
        if ($pdf->GetY() + $cellHeight > $pdf->GetPageHeight() - 20) {
            $pdf->AddPage('L', 'Letter'); //Generamos otra página con la misma orientación que definimos para el reporte en un principio
            $pdf->setFillColor(64, 136, 64);
            $pdf->setFont('Arial', 'B', 7);
            $pdf->setTextColor(255, 255, 255);
            $pdf->setFont('Arial', '', 7);
            $pdf->setTextColor(0, 0, 0);
        }

        // Agregamos la imagen desde la ruta especificada.
        $imgPath = "../../images/alumnos/" . $rowAlumnos['foto_alumno'];
        if (file_exists($imgPath)) {
            // Calculamos la posición para centrar la imagen dentro de la celda.
            $xPos = $pdf->GetX() + ($cellWidth - $imgWidth) / 2;
            $yPos = $pdf->GetY() + ($cellHeight - $imgHeight) / 2;
            $pdf->cell($cellWidth, $cellHeight, '', 1, 0, 'C'); // Celda vacía con borde.
            $pdf->Image($imgPath, $xPos, $yPos, $imgWidth, $imgHeight); // Imagen centrada dentro de la celda.
        } else {
            $pdf->cell($cellWidth, $cellHeight, 'Sin foto', 1, 0, 'C');
        }

        // Imprime los datos del alumno.
        $pdf->cell(60, $cellHeight, $pdf->encodeString($rowAlumnos['nombre']), 1, 0, 'C');
        $pdf->cell(35, $cellHeight, $rowAlumnos['fecha_nacimiento'], 1, 0, 'C');
        $pdf->cell(20, $cellHeight, $pdf->encodeString($rowAlumnos['edad'] . ' años'), 1, 0, 'C');
        $pdf->cell(55, $cellHeight, $pdf->encodeString($rowAlumnos['categoria']), 1, 0, 'C');
        $pdf->cell(30, $cellHeight, $rowAlumnos['numero_dias'], 1, 0, 'C');
        $pdf->cell(30, $cellHeight, $rowAlumnos['fecha_inscripcion'], 1, 1, 'C');
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay administradores para mostrar'), 1, 1);
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'Administradores.pdf');
?>
