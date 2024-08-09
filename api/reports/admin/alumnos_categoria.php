<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se verifica si existe un valor para la categoría, de lo contrario se muestra un mensaje.
if (isset($_GET['idCategoriaAlumno'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/categoriasalumnos_data.php');
    // Se instancian las entidades correspondientes.
    $categoria = new CategoriasAlunmosData;
    // Se establece el valor de la categoría, de lo contrario se muestra un mensaje.
    if ($categoria->setIdCategoria($_GET['idCategoriaAlumno'])) {
        // Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
        if ($rowcategoria = $categoria->readOneAlumno()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReport('Alumnos de la ' . $rowcategoria['categoria']);
            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($datacategoria = $categoria->reportAlumnosCategoria()) {
                // Se establece un color de relleno para los encabezados.
                $pdf->setFillColor(64, 136, 64);
                // Se establece la fuente para los encabezados.
                $pdf->setFont('Arial', 'B', 9);
                $pdf->setTextColor(255, 255, 255);
                // Se imprimen las celdas con los encabezados.
                $pdf->cell(78, 10, 'Nombre y foto', 1, 0, 'C', 1);
                $pdf->cell(37, 10, 'Fecha de nacimiento', 1, 0, 'C', 1);
                $pdf->cell(20, 10, 'Edad', 1, 0, 'C', 1);
                $pdf->cell(50, 10, $pdf->encodeString('Posición'), 1, 1, 'C', 1);
                // Se establece la fuente para los datos de los productos.
                $pdf->setFont('Arial', '', 9);
                $pdf->setTextColor(0, 0, 0);

                // Tamaño de la celda y de la imagen.
                $cellWidth = 18;
                $cellHeight = 18;
                $imgWidth = 13;
                $imgHeight = 13;
                // Se recorren los registros fila por fila.
                foreach ($datacategoria as $rowAlumnos) {

                    if ($pdf->GetY() + $cellHeight > $pdf->GetPageHeight() - 20) {
                        $pdf->AddPage('L', 'Letter'); //Generamos otra página con la misma orientación que definimos para el reporte en un principio
                        $pdf->setFillColor(64, 136, 64);
                        $pdf->setFont('Arial', 'B', 9);
                        $pdf->setTextColor(255, 255, 255);
                        $pdf->setFont('Arial', '', 8);
                        $pdf->setTextColor(0, 0, 0);
                    }

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

                    // Se imprimen las celdas con los datos de los productos.
                    $pdf->cell(60, $cellHeight, $pdf->encodeString($rowAlumnos['Nombre']), 1, 0, 'C');
                    $pdf->cell(37, $cellHeight, $pdf->encodeString($rowAlumnos['fecha_nacimiento']), 1, 0, 'C');
                    $pdf->cell(20, $cellHeight, $pdf->encodeString($rowAlumnos['edad'] . ' años'), 1, 0, 'C');
                    $pdf->cell(50, $cellHeight, $pdf->encodeString($rowAlumnos['posicion_alumno']), 1, 1, 'C');
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay alumnos en la categoría ') . $pdf->encodeString($rowcategoria['categoria']), 1, 1);
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
