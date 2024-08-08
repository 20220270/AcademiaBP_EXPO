<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/administradores_data.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

$pdf->startReport('Administradores Registrados');

// Se instancian las entidades correspondientes.
$administrador = new AdministradorData;
// Se establece el valor de la categoría, de lo contrario se muestra un mensaje.

// Se verifica si la categoría existe, de lo contrario se muestra un mensaje.
if ($dataadministrador = $administrador->readAll2()) {
    // Se inicia el reporte con el encabezado del documento.
    
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(64, 136, 64);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 9);

    $pdf->setTextColor(255, 255, 255);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(55, 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->cell(45, 10, 'Correo', 1, 0, 'C', 1);
    $pdf->cell(35, 10, 'Nivel de usuario', 1, 0, 'C', 1);
    $pdf->cell(20, 10, 'Estado', 1, 0, 'C', 1);
    $pdf->cell(30, 10, 'Fecha de registro', 1, 1, 'C', 1);


    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Arial', '', 8);
    $pdf->setTextColor(0, 0, 0);
    // Se recorren los registros fila por fila.
    foreach ($dataadministrador as $rowadministrador) {
        // Se imprimen las celdas con los datos de los productos.
        $pdf->cell(55, 10, $pdf->encodeString($rowadministrador['Nombre']), 1, 0, 'C');
        $pdf->cell(45, 10, $rowadministrador['correo_administrador'], 1, 0, 'C');
        $pdf->cell(35, 10, $rowadministrador['nivel'], 1, 0, 'C');
        $pdf->cell(20, 10, $rowadministrador['estado_adminstrador'], 1, 0, 'C');
        $pdf->cell(30, 10, $rowadministrador['fecha_registro'], 1, 1, 'C');
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('No hay administradores para mostrar'), 1, 1);
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'Administradores.pdf');
