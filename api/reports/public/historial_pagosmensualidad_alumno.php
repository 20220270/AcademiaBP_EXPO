<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;
// Se verifica si existe un valor para el id, de lo contrario se muestra un mensaje.
if (isset($_GET['id'])) {
    // Se incluyen las clases para la transferencia y acceso a datos.
    require_once('../../models/data/alumnos_data.php');
    // Se instancian las entidades correspondientes.
    $alumno = new AlumnosData;
    // Se establece el valor del id, de lo contrario se muestra un mensaje.
    if ($alumno->setId($_GET['id'])) {
        // Se verifica si el id existe, de lo contrario se muestra un mensaje.
        if ($rowalumno = $alumno->readOne()) {
            // Se inicia el reporte con el encabezado del documento.
            $pdf->startReportClient('Historial de pagos del alumno ' . $rowalumno['Nombre']);

            // Variable para controlar si es la primera página
            $isFirstPage = true;

            // Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
            if ($dataalumno = $alumno->readAllVerPagosReport()) {
                // Tamaño de la tarjeta
                $cardWidth = 90; // Ajusta el ancho de la tarjeta
                $cardHeight = 50;

                // Espaciado entre tarjetas
                $xOffset = 10; // Espaciado horizontal entre tarjetas
                $yOffset = 10; // Espaciado vertical entre tarjetas

                // Posiciones iniciales en la primer página
                $x = 10;
                $y = 50; // Ajusta la posición inicial de las tarjetas después del título

                // Se recorren los registros fila por fila.
                foreach ($dataalumno as $rowAlumnos) {
                    // Verifica si es la primera página y si se necesita imprimir el título
                    if ($isFirstPage) {
                        $pdf->SetY(30); // Ajusta la posición del título en la primera página
                    }

                    // Verifica si el espacio disponible es suficiente para una nueva tarjeta
                    if ($y + $cardHeight > $pdf->GetPageHeight() - 20) {
                        //Volvemos a configurar la distancia entre el 
                        $pdf->AddPage();
                        $x = 10;
                        $y = 40; // Ajusta la posición para una nueva página
                    }

                    // Dibuja el borde de la tarjeta
                    $pdf->Rect($x, $y, $cardWidth, $cardHeight);

                    // Cambia el tamaño y el estilo de la fuente para la fecha
                    $pdf->SetFont('Arial', 'B', 12); // Tamaño 12 y negrita
                    $pdf->SetXY($x + 5, $y + 5);
                    $pdf->MultiCell($cardWidth - 10, 10, $pdf->encodeString($rowAlumnos['fecha_pago']), 0, 'L');

                    // Vuelve a la fuente normal para el resto del contenido
                    $pdf->SetFont('Arial', '', 10); // Tamaño 10, fuente normal
                    $pdf->SetXY($x + 5, $y + 15);
                    $pdf->MultiCell($cardWidth - 10, 10, 'Total cancelado: $' . $pdf->encodeString($rowAlumnos['mensualidad_pagar']), 0, 'L');
                    $pdf->SetXY($x + 5, $y + 25);
                    $pdf->MultiCell($cardWidth - 10, 10, $pdf->encodeString('Descripción del pago: ') . $pdf->encodeString($rowAlumnos['descripcion_pago']), 0, 'L');
                    $pdf->SetXY($x + 5, $y + 35);
                    $pdf->MultiCell($cardWidth - 10, 10, $pdf->encodeString('Categoría del alumno: ') . $pdf->encodeString($rowAlumnos['categoria']), 0, 'L');

                    // Ajusta la posición para la siguiente tarjeta
                    $x += $cardWidth + $xOffset;

                    // Si hay espacio suficiente, coloca dos tarjetas por línea
                    if ($x + $cardWidth > $pdf->GetPageWidth() - 10) {
                        $x = 10;
                        $y += $cardHeight + $yOffset;
                    }
                }
            } else {
                $pdf->cell(0, 10, $pdf->encodeString('No hay pagos registrados del alumno ') . $pdf->encodeString($rowalumno['Nombre']), 1, 1);
            }
            // Se llama implícitamente al método footer() y se envía el documento al navegador web.
            $pdf->output('I', 'historial_pagos.pdf');
        } else {
            print('Alumno inexistente');
        }
    } else {
        print('ID incorrecto');
    }
} else {
    print('Debe seleccionar un ID');
}
